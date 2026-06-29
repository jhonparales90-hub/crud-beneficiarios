import pool from '../db/connection';

// Obtener todas las localidades
export async function getAllLocalidades() {
  const [rows] = await pool.query('SELECT * FROM localidades ORDER BY id_localidad');
  return rows;
}

// Obtener una localidad por su ID
export async function getLocalidadById(id) {
  const [rows] = await pool.query(
    'SELECT * FROM localidades WHERE id_localidad = ?',
    [id]
  );
  return rows[0];
}

// Crear una nueva localidad
export async function createLocalidad(data) {
  const { id_localidad, cod_localidad, localidad } = data;
  const [result] = await pool.query(
    'INSERT INTO localidades (id_localidad, cod_localidad, localidad) VALUES (?, ?, ?)',
    [id_localidad, cod_localidad, localidad]
  );
  return result;
}

// Actualizar una localidad existente
export async function updateLocalidad(id, data) {
  const { cod_localidad, localidad } = data;
  const [result] = await pool.query(
    'UPDATE localidades SET cod_localidad = ?, localidad = ? WHERE id_localidad = ?',
    [cod_localidad, localidad, id]
  );
  return result;
}

// Eliminar una localidad
export async function deleteLocalidad(id) {
  const [result] = await pool.query(
    'DELETE FROM localidades WHERE id_localidad = ?',
    [id]
  );
  return result;
}