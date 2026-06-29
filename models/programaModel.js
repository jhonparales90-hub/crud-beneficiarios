import pool from '../db/connection';

// Obtener todos los programas
export async function getAllProgramas() {
  const [rows] = await pool.query('SELECT * FROM programas ORDER BY id_programa');
  return rows;
}

// Crear un nuevo programa
export async function createPrograma(data) {
  const { id_programa, nucleo_basico } = data;
  const [result] = await pool.query(
    'INSERT INTO programas (id_programa, nucleo_basico) VALUES (?, ?)',
    [id_programa, nucleo_basico]
  );
  return result;
}