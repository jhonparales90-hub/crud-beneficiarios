import { NextResponse } from 'next/server';
import { updateSector, deleteSector } from '../../../../models/sectorModel';

// PUT /api/sectores/[id] → actualizar un sector
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await updateSector(id, data);
    return NextResponse.json({ mensaje: 'Sector actualizado exitosamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar el sector', detalle: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/sectores/[id] → eliminar un sector
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteSector(id);
    return NextResponse.json({ mensaje: 'Sector eliminado exitosamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar el sector', detalle: error.message },
      { status: 500 }
    );
  }
}