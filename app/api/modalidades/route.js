import { NextResponse } from 'next/server';
import { getAllModalidades, createModalidad } from '../../../models/modalidadModel';

// GET /api/modalidades → obtener todas las modalidades
export async function GET() {
  try {
    const modalidades = await getAllModalidades();
    return NextResponse.json(modalidades);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las modalidades', detalle: error.message },
      { status: 500 }
    );
  }
}

// POST /api/modalidades → crear una nueva modalidad
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await createModalidad(data);
    return NextResponse.json(
      { mensaje: 'Modalidad creada exitosamente', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la modalidad', detalle: error.message },
      { status: 500 }
    );
  }
}