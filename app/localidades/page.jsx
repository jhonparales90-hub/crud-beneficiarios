'use client';

import { useState, useEffect } from 'react';

export default function LocalidadesPage() {
  const [localidades, setLocalidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nuevoCod, setNuevoCod] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');

  const [editandoId, setEditandoId] = useState(null);
  const [editCod, setEditCod] = useState('');
  const [editNombre, setEditNombre] = useState('');

  useEffect(() => {
    cargarLocalidades();
  }, []);

  async function cargarLocalidades() {
    try {
      setCargando(true);
      const res = await fetch('/api/localidades');
      if (!res.ok) throw new Error('Error al cargar localidades');
      const data = await res.json();
      setLocalidades(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function handleCrear(e) {
    e.preventDefault();
    try {
      const nuevoId = Math.max(...localidades.map(l => l.id_localidad), 0) + 1;
      const res = await fetch('/api/localidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_localidad: nuevoId,
          cod_localidad: nuevoCod,
          localidad: nuevoNombre,
        }),
      });
      if (!res.ok) throw new Error('Error al crear localidad');
      setNuevoCod('');
      setNuevoNombre('');
      cargarLocalidades();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleEliminar(id) {
    if (!confirm('¿Seguro que quieres eliminar esta localidad?')) return;
    try {
      const res = await fetch(`/api/localidades/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar localidad');
      cargarLocalidades();
    } catch (err) {
      alert(err.message);
    }
  }

  function iniciarEdicion(loc) {
    setEditandoId(loc.id_localidad);
    setEditCod(loc.cod_localidad);
    setEditNombre(loc.localidad);
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setEditCod('');
    setEditNombre('');
  }

  async function handleActualizar(id) {
    try {
      const res = await fetch(`/api/localidades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cod_localidad: editCod,
          localidad: editNombre,
        }),
      });
      if (!res.ok) throw new Error('Error al actualizar localidad');
      cancelarEdicion();
      cargarLocalidades();
    } catch (err) {
      alert(err.message);
    }
  }

  if (cargando) return <p className="state-message">Cargando localidades...</p>;
  if (error) return <p className="state-message state-error">Error: {error}</p>;

  return (
    <div className="page">
      <h1 className="page-title">Localidades</h1>
      <p className="page-subtitle">Localidades de Bogotá registradas en el programa</p>

      <div className="card">
        <form onSubmit={handleCrear} className="form-row">
          <input
            className="input"
            type="text"
            placeholder="Código"
            value={nuevoCod}
            onChange={(e) => setNuevoCod(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Nombre de la localidad"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            required
            style={{ flex: 2 }}
          />
          <button type="submit" className="btn btn-success">Agregar</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Localidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {localidades.map((loc) => (
              <tr key={loc.id_localidad}>
                <td>{loc.id_localidad}</td>

                {editandoId === loc.id_localidad ? (
                  <>
                    <td>
                      <input
                        className="input"
                        value={editCod}
                        onChange={(e) => setEditCod(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        value={editNombre}
                        onChange={(e) => setEditNombre(e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-success btn-sm" onClick={() => handleActualizar(loc.id_localidad)}>
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
                    <td>{loc.cod_localidad}</td>
                    <td>{loc.localidad}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-primary btn-sm" onClick={() => iniciarEdicion(loc)}>
                          Editar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(loc.id_localidad)}>
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