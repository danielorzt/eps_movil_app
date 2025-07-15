<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EspecialidadResource extends JsonResource
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
            'nombre_especialidad' => $this->nombre_especialidad,
            'descripcion_especialidad' => $this->descripcion_especialidad,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}