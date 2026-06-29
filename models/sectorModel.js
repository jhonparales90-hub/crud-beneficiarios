import pool from '../db/connection';

// Obtener todos los sectores
export async function getAllSectores() {
  const [rows] = await pool.query('SELECT * FROM sectores ORDER BY id_sector');
  return rows;
}

// Actualizar un sector existente
export async function updateSector(id, data) {
  const { sector_colegio } = data;
  const [result] = await pool.query(
    'UPDATE sectores SET sector_colegio = ? WHERE id_sector = ?',
    [sector_colegio, id]
  );
  return result;
}

// Eliminar un sector
export async function deleteSector(id) {
  const [result] = await pool.query(
    'DELETE FROM sectores WHERE id_sector = ?',
    [id]
  );
  return result;
}