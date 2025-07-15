<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\RefreshToken; // Asegúrate de importar el modelo RefreshToken
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str; // Para generar el token aleatorio
use Carbon\Carbon; // Para manejar fechas

class AuthController extends Controller
{
    // Duración del Refresh Token en días (puedes ajustarlo)
    private $refreshTokenValidityDays = 7;

    /**
     * Helper para crear Refresh Token.
     * Este método ahora también invalida los tokens de refresco anteriores del mismo usuario.
     */
    private function createRefreshToken(Usuario $usuario): RefreshToken
    {
        // Invalidar (revocar) tokens de refresco activos anteriores del mismo usuario
        $usuario->refreshTokens()->where('revoked', false)->update(['revoked' => true]);

        return RefreshToken::create([
            'usuario_id' => $usuario->id,
            'token' => Str::random(80), // Genera un token aleatorio seguro
            'expires_at' => Carbon::now()->addDays($this->refreshTokenValidityDays),
            'revoked' => false, // Asegurarse que el nuevo token no esté revocado
        ]);
    }

    /**
     * Registra un nuevo usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_usuario' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios,email',
            'contrasena' => 'required|string|min:8|confirmed',
            'rol_usuario' => ['required', 'string', Rule::in(['paciente', 'medico', 'administrador'])],
            'paciente_id' => 'nullable|integer|exists:pacientes,id',
            'medico_id' => 'nullable|integer|exists:medicos,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 400);
        }

        $usuario = Usuario::create([
            'nombre_usuario' => $request->nombre_usuario,
            'email' => $request->email,
            'contrasena' => Hash::make($request->contrasena),
            'rol_usuario' => $request->rol_usuario,
            'paciente_id' => $request->paciente_id,
            'medico_id' => $request->medico_id,
        ]);

        $accessToken = $usuario->createToken('auth_token')->plainTextToken;
        $refreshToken = $this->createRefreshToken($usuario); // Crear y obtener el refresh token

        return response()->json([
            'status' => true,
            'data' => new UsuarioResource($usuario),
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken->token, // Devolver el refresh token
            'token_type' => 'Bearer',
            'message' => 'Usuario registrado exitosamente.'
        ], 201);
    }

    /**
     * Inicia sesión para un usuario existente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'contrasena' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 400);
        }

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->contrasena])) {
            return response()->json([
                'status' => false,
                'message' => 'Credenciales incorrectas.'
            ], 401);
        }

        $usuario = Usuario::where('email', $request->email)->firstOrFail();

        // Opcional: Revocar todos los tokens de acceso anteriores del usuario para este 'tipo' de token
        // $usuario->tokens()->where('name', 'auth_token')->delete();

        $accessToken = $usuario->createToken('auth_token')->plainTextToken;
        $refreshToken = $this->createRefreshToken($usuario); // Crear y obtener el refresh token

        return response()->json([
            'status' => true,
            'data' => new UsuarioResource($usuario),
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken->token, // Devolver el refresh token
            'token_type' => 'Bearer',
            'message' => 'Inicio de sesión exitoso.'
        ], 200);
    }

    /**
     * Refresca el token de acceso utilizando un refresh token válido.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refreshToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'refresh_token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 400);
        }

        $refreshToken = RefreshToken::where('token', $request->refresh_token)->first();

        if (!$refreshToken) {
            return response()->json(['status' => false, 'message' => 'Refresh token no encontrado.'], 401);
        }

        if ($refreshToken->revoked) {
            // Medida de seguridad adicional: si se intenta usar un refresh token ya revocado,
            // podríamos invalidar todos los refresh tokens activos de ese usuario.
            // $refreshToken->usuario->refreshTokens()->where('revoked', false)->update(['revoked' => true]);
            return response()->json(['status' => false, 'message' => 'Refresh token revocado.'], 401);
        }

        if (Carbon::parse($refreshToken->expires_at)->isPast()) {
            $refreshToken->update(['revoked' => true]); // Marcar como revocado si ha expirado
            return response()->json(['status' => false, 'message' => 'Refresh token expirado.'], 401);
        }

        $usuario = $refreshToken->usuario;

        // Revocar el refresh token antiguo (ya que vamos a emitir uno nuevo - rotación)
        $refreshToken->update(['revoked' => true]);

        // Generar nuevo access token
        // Opcional: Revocar tokens de acceso anteriores del usuario
        // $usuario->tokens()->where('name', 'auth_token')->delete();
        $newAccessToken = $usuario->createToken('auth_token')->plainTextToken;

        // Generar nuevo refresh token (rotación)
        $newRefreshToken = $this->createRefreshToken($usuario);

        return response()->json([
            'status' => true,
            'access_token' => $newAccessToken,
            'refresh_token' => $newRefreshToken->token,
            'token_type' => 'Bearer',
            'message' => 'Token refrescado exitosamente.'
        ], 200);
    }

    /**
     * Cierra la sesión del usuario (revoca el token actual y el refresh token si se provee).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $user = $request->user(); // Esto requiere que la ruta de logout esté protegida por auth:sanctum

        // Revocar el token de acceso actual
        if ($user) {
            $user->currentAccessToken()->delete();

            // Obtener el refresh token de la solicitud (el cliente debería enviarlo)
            $refreshTokenValue = $request->input('refresh_token');
            if ($refreshTokenValue) {
                $refreshToken = RefreshToken::where('token', $refreshTokenValue)
                    ->where('usuario_id', $user->id) // Asegurarse que es del usuario
                    ->where('revoked', false)
                    ->first();
                if ($refreshToken) {
                    $refreshToken->update(['revoked' => true]);
                }
            } else {
                // Opcionalmente, si el cliente no envía el refresh_token específico,
                // podrías revocar todos los refresh_tokens no revocados del usuario.
                // Esto es más agresivo y podría cerrar sesiones en otros dispositivos.
                // $user->refreshTokens()->where('revoked', false)->update(['revoked' => true]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Sesión cerrada exitosamente.'
        ], 200);
    }

    /**
     * Obtiene los datos del usuario autenticado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => new UsuarioResource($request->user()),
            'message' => 'Datos del perfil del usuario obtenidos.'
        ], 200);
    }
}
