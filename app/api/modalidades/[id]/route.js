import { NextResponse } from 'next/server';
import { deleteModalidad } from '../../../../models/modalidadModel';

// DELETE /api/modalidades/[id] → eliminar una modalidad
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteModalidad(id);
    return NextResponse.json({ mensaje: 'Modalidad eliminada exitosamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la modalidad', detalle: error.message },
      { status: 500 }
    );
  }
}