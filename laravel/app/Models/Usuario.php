<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// Asegúrate de que esta línea esté presente para la relación
use Illuminate\Database\Eloquent\Relations\HasMany;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre_usuario',
        'email',
        'contrasena',
        'rol_usuario',
        'paciente_id',
        'medico_id',
        'email_verificado_en',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verificado_en' => 'datetime',
            'contrasena' => 'hashed',
        ];
    }

    // Relación: Un usuario puede ser un paciente
    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'paciente_id');
    }

    // Relación: Un usuario puede ser un médico
    public function medico()
    {
        return $this->belongsTo(Medico::class, 'medico_id');
    }

    // Configurar el nombre del campo de contraseña
    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    // Sobrescribir el nombre del campo de contraseña para Laravel Auth
    public function getAuthPasswordName()
    {
        return 'contrasena';
    }

    /**
     * Obtener los refresh tokens asociados con el usuario.
     */
    public function refreshTokens(): HasMany
    {
        return $this->hasMany(RefreshToken::class, 'usuario_id');
    }
}
