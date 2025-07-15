<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PacienteResource extends JsonResource
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
            'numero_documento_paciente' => $this->numero_documento_paciente,
            'tipo_documento_paciente' => $this->tipo_documento_paciente,
            'nombres_paciente' => $this->nombres_paciente,
            'apellidos_paciente' => $this->apellidos_paciente,
            'fecha_nacimiento_paciente' => $this->fecha_nacimiento_paciente,
            'genero_paciente' => $this->genero_paciente,
            'direccion_paciente' => $this->direccion_paciente,
            'telefono_paciente' => $this->telefono_paciente,
            'email_paciente' => $this->email_paciente,
            'eps_paciente' => $this->eps_paciente,
            'total_citas' => $this->when(isset($this->total_citas), $this->total_citas),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}