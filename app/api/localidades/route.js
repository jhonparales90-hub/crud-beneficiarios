import { NextResponse } from 'next/server';
import { getAllLocalidades, createLocalidad } from '../../../models/localidadModel';
// GET /api/localidades → obtener todas las localidades
export async function GET() {
  try {
    const localidades = await getAllLocalidades();
    return NextResponse.json(localidades);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las localidades', detalle: error.message },
      { status: 500 }
    );
  }
}

// POST /api/localidades → crear una nueva localidad
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await createLocalidad(data);
    return NextResponse.json(
      { mensaje: 'Localidad creada exitosamente', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la localidad', detalle: error.message },
      { status: 500 }
    );
  }
}