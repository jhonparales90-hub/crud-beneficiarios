import { NextResponse } from 'next/server';
import { getAllSectores } from '../../../models/sectorModel';

// GET /api/sectores → obtener todos los sectores
export async function GET() {
  try {
    const sectores = await getAllSectores();
    return NextResponse.json(sectores);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los sectores', detalle: error.message },
      { status: 500 }
    );
  }
}