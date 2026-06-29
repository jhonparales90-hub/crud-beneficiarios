'use client';

import { useState, useEffect } from 'react';

export default function SectoresPage() {
  const [sectores, setSectores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState('');

  useEffect(() => {
    cargarSectores();
  }, []);

  async function cargarSectores() {
    try {
      setCargando(true);
      const res = await fetch('/api/sectores');
      if (!res.ok) throw new Error('Error al cargar sectores');
      const data = await res.json();
      setSectores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function handleEliminar(id) {
    if (!confirm('¿Seguro que quieres eliminar este sector?')) return;
    try {
      const res = await fetch(`/api/sectores/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar sector');
      cargarSectores();
    } catch (err) {
      alert(err.message);
    }
  }

  function iniciarEdicion(s) {
    setEditandoId(s.id_sector);
    setEditNombre(s.sector_colegio);
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setEditNombre('');
  }

  async function handleActualizar(id) {
    try {
      const res = await fetch(`/api/sectores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector_colegio: editNombre }),
      });
      if (!res.ok) throw new Error('Error al actualizar sector');
      cancelarEdicion();
      cargarSectores();
    } catch (err) {
      alert(err.message);
    }
  }

  if (cargando) return <p className="state-message">Cargando sectores...</p>;
  if (error) return <p className="state-message state-error">Error: {error}</p>;

  return (
    <div className="page">
      <h1 className="page-title">Sectores del Colegio</h1>
      <p className="page-subtitle">Clasificación del sector del colegio de graduación</p>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sector</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sectores.map((s) => (
              <tr key={s.id_sector}>
                <td>{s.id_sector}</td>

                {editandoId === s.id_sector ? (
                  <>
                    <td>
                      <input
                        className="input"
                        value={editNombre}
                        onChange={(e) => setEditNombre(e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-success btn-sm" onClick={() => handleActualizar(s.id_sector)}>
                          Guardar
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={cancelarEdicion}>
                          Cancelar
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{s.sector_colegio}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-primary btn-sm" onClick={() => iniciarEdicion(s)}>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(s.id_sector)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}