import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditarResultados = () => {
  const [partidos, setPartidos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ golesLocal: '', golesVisitante: '' });

  useEffect(() => {
    axios.get('https://backendsn.onrender.com/partidos').then(res => setPartidos(res.data));
  }, []);

  const handleEdit = (partido) => {
    setEditandoId(partido.id);
    setForm({
      golesLocal: partido.goles_local || '',
      golesVisitante: partido.goles_visitante || ''
    });
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (id) => {
    await axios.put(`https://backendsn.onrender.com/partidos/${id}`, {
      goles_local: parseInt(form.golesLocal),
      goles_visitante: parseInt(form.golesVisitante)
    });

    // Actualizar lista
    const res = await axios.get('https://backendsn.onrender.com/partidos');
    setPartidos(res.data);
    setEditandoId(null);
  };

  return (
    <div className='edit-partido'>
      <h2>Editar Resultados</h2>
      <ul className='edit-lista'>
        {partidos.map(partido => (
          <li className='jornada-edit' key={partido.id}>
            Jornada {partido.jornada}: {partido.equipo_local} vs {partido.equipo_visitante} — 
            {editandoId === partido.id ? (
              <>
                <input
                  className='edit-input'
                  type="number"
                  name="golesLocal"
                  value={form.golesLocal}
                  onChange={handleChange}
                />
                <input
                  className='edit-input'
                  type="number"
                  name="golesVisitante"
                  value={form.golesVisitante}
                  onChange={handleChange}
                />
                <button
                  className='edit-input'
                  onClick={() => guardarCambios(partido.id)}>Guardar</button>
              </>
            ) : (
              <>
                {' '}
                {partido.goles_local ?? '-'} : {partido.goles_visitante ?? '-'}
                <button 
                className='edit-input'  
                onClick={() => handleEdit(partido)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditarResultados;
