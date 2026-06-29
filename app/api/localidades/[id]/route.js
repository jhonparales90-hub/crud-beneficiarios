import { NextResponse } from 'next/server';
import { getLocalidadById, updateLocalidad, deleteLocalidad } from '../../../../models/localidadModel';
// GET /api/localidades/[id] → obtener una localidad específica
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const localidad = await getLocalidadById(id);
    if (!localidad) {
      return NextResponse.json({ error: 'Localidad no encontrada' }, { status: 404 });
    }
    return NextResponse.json(localidad);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la localidad', detalle: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/localidades/[id] → actualizar una localidad
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await updateLocalidad(id, data);
    return NextResponse.json({ mensaje: 'Localidad actualizada exitosamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la localidad', detalle: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/localidades/[id] → eliminar una localidad
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deleteLocalidad(id);
    return NextResponse.json({ mensaje: 'Localidad eliminada exitosamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la localidad', detalle: error.message },
      { status: 500 }
    );
  }
}