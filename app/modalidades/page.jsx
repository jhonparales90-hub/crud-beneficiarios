'use client';

import { useState, useEffect } from 'react';

export default function ModalidadesPage() {
  const [modalidades, setModalidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nuevoNombre, setNuevoNombre] = useState('');

  useEffect(() => {
    cargarModalidades();
  }, []);

  async function cargarModalidades() {
    try {
      setCargando(true);
      const res = await fetch('/api/modalidades');
      if (!res.ok) throw new Error('Error al cargar modalidades');
      const data = await res.json();
      setModalidades(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function handleCrear(e) {
    e.preventDefault();
    try {
      const nuevoId = Math.max(...modalidades.map(m => m.id_modalidad), 0) + 1;
      const res = await fetch('/api/modalidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_modalidad: nuevoId,
          modalidad: nuevoNombre,
        }),
      });
      if (!res.ok) throw new Error('Error al crear modalidad');
      setNuevoNombre('');
      cargarModalidades();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleEliminar(id) {
    if (!confirm('¿Seguro que quieres eliminar esta modalidad?')) return;
    try {
      const res = await fetch(`/api/modalidades/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar modalidad');
      cargarModalidades();
    } catch (err) {
      alert(err.message);
    }
  }

  if (cargando) return <p className="state-message">Cargando modalidades...</p>;
  if (error) return <p className="state-message state-error">Error: {error}</p>;

  return (
    <div className="page">
      <h1 className="page-title">Modalidades</h1>
      <p className="page-subtitle">Modalidades de corte del programa</p>

      <div className="card">
        <form onSubmit={handleCrear} className="form-row">
          <input
            className="input"
            type="text"
            placeholder="Nombre de la modalidad"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">Agregar</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Modalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {modalidades.map((m) => (
              <tr key={m.id_modalidad}>
                <td>{m.id_modalidad}</td>
                <td>{m.modalidad}</td>
                <td>
                  <div className="table-actions">
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(m.id_modalidad)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}