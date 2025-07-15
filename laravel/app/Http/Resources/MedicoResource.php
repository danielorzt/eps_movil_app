<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicoResource extends JsonResource
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
            'numero_documento_medico' => $this->numero_documento_medico,
            'tipo_documento_medico' => $this->tipo_documento_medico,
            'nombres_medico' => $this->nombres_medico,
            'apellidos_medico' => $this->apellidos_medico,
            'tarjeta_profesional' => $this->tarjeta_profesional,
            'telefono_medico' => $this->telefono_medico,
            'email_medico' => $this->email_medico,
            'especialidad' => new EspecialidadResource($this->whenLoaded('especialidad')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}