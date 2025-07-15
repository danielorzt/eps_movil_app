<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CitaResource extends JsonResource
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
            'id_paciente' => $this->id_paciente,
            'id_medico' => $this->id_medico,
            'id_especialidad_cita' => $this->id_especialidad_cita,
            'fecha_hora_cita' => $this->fecha_hora_cita,
            'estado_cita' => $this->estado_cita,
            'motivo_cita' => $this->motivo_cita,
            'observaciones_cita' => $this->observaciones_cita,
            'paciente' => new PacienteResource($this->whenLoaded('paciente')),
            'medico' => new MedicoResource($this->whenLoaded('medico')),
            'especialidad' => new EspecialidadResource($this->whenLoaded('especialidad')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}