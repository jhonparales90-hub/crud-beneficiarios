import { NextResponse } from 'next/server';
import { getAllProgramas, createPrograma } from '../../../models/programaModel';

// GET /api/programas → obtener todos los programas
export async function GET() {
  try {
    const programas = await getAllProgramas();
    return NextResponse.json(programas);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los programas', detalle: error.message },
      { status: 500 }
    );
  }
}

// POST /api/programas → crear un nuevo programa
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await createPrograma(data);
    return NextResponse.json(
      { mensaje: 'Programa creado exitosamente', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear el programa', detalle: error.message },
      { status: 500 }
    );
  }
}