'use client';

import { useState, useEffect } from 'react';

export default function ProgramasPage() {
  const [programas, setProgramas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nuevoNombre, setNuevoNombre] = useState('');

  useEffect(() => {
    cargarProgramas();
  }, []);

  async function cargarProgramas() {
    try {
      setCargando(true);
      const res = await fetch('/api/programas');
      if (!res.ok) throw new Error('Error al cargar programas');
      const data = await res.json();
      setProgramas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function handleCrear(e) {
    e.preventDefault();
    try {
      const nuevoId = Math.max(...programas.map(p => p.id_programa), 0) + 1;
      const res = await fetch('/api/programas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_programa: nuevoId,
          nucleo_basico: nuevoNombre,
        }),
      });
      if (!res.ok) throw new Error('Error al crear programa');
      setNuevoNombre('');
      cargarProgramas();
    } catch (err) {
      alert(err.message);
    }
  }

  if (cargando) return <p className="state-message">Cargando programas...</p>;
  if (error) return <p className="state-message state-error">Error: {error}</p>;

  return (
    <div className="page">
      <h1 className="page-title">Programas</h1>
      <p className="page-subtitle">Núcleos básicos del conocimiento</p>

      <div className="card">
        <form onSubmit={handleCrear} className="form-row">
          <input
            className="input"
            type="text"
            placeholder="Nombre del núcleo básico"
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
              <th>Núcleo Básico</th>
            </tr>
          </thead>
          <tbody>
            {programas.map((p) => (
              <tr key={p.id_programa}>
                <td>{p.id_programa}</td>
                <td>{p.nucleo_basico}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}