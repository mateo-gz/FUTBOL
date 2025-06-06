import React, { useState, useEffect } from 'react';

const Registro = () => {
  const [formData, setFormData] = useState({
    partidoId: '',
    golesLocal: '',
    golesVisitante: '',
  });

  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar los partidos desde el backend
    const fetchPartidos = async () => {
      try {
        const response = await fetch('https://backendsn.onrender.com/partidos');
        const data = await response.json();
        setPartidos(data);
      } catch (error) {
        console.error('Error cargando partidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backendsn.onrender.com/registrar-resultado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al guardar resultado');

      alert('✅ Resultado guardado con éxito');
      setFormData({ partidoId: '', golesLocal: '', golesVisitante: '' });
    } catch (error) {
      console.error(error);
      alert('❌ Falló el guardado');
    }
  };

  if (loading) return <p>Cargando partidos... 🌀</p>;

  return (
    <form className='registro' onSubmit={handleSubmit}>
      <h2>Registro de partidos</h2>
      <select
        className='select-registro'
        name="partidoId"
        value={formData.partidoId}
        onChange={handleChange}
        required
      >
        <option className='registro-option' value="">Selecciona un partido</option>
        {partidos.map(partido => (
          <option className='jornada-option' key={partido.id} value={partido.id}>
            Jornada {partido.jornada}: {partido.equipo_local} 🆚 {partido.equipo_visitante}
          </option>
        ))}
      </select>

      <input
        className='registro-input'
        type="number"
        name="golesLocal"
        placeholder="Goles local"
        value={formData.golesLocal}
        onChange={handleChange}
        required
      />
      <input
        className='registro-input'
        type="number"
        name="golesVisitante"
        placeholder="Goles visitante"
        value={formData.golesVisitante}
        onChange={handleChange}
        required
      />
      <button className='registro-input' type="submit">Guardar resultado</button>
    </form>
  );
};

export default Registro;
