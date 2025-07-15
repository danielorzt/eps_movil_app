<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre_usuario' => $this->nombre_usuario,
            'email' => $this->email,
            'rol_usuario' => $this->rol_usuario,
            'email_verificado_en' => $this->email_verificado_en,
            'paciente' => new PacienteResource($this->whenLoaded('paciente')),
            'medico' => new MedicoResource($this->whenLoaded('medico')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}