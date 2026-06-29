import pool from '../db/connection';

// Obtener todas las modalidades
export async function getAllModalidades() {
  const [rows] = await pool.query('SELECT * FROM modalidades ORDER BY id_modalidad');
  return rows;
}

// Crear una nueva modalidad
export async function createModalidad(data) {
  const { id_modalidad, modalidad } = data;
  const [result] = await pool.query(
    'INSERT INTO modalidades (id_modalidad, modalidad) VALUES (?, ?)',
    [id_modalidad, modalidad]
  );
  return result;
}

// Eliminar una modalidad
export async function deleteModalidad(id) {
  const [result] = await pool.query(
    'DELETE FROM modalidades WHERE id_modalidad = ?',
    [id]
  );
  return result;
}