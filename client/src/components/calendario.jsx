import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calendario = () => {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const traerPartidos = async () => {
      try {
        const response = await axios.get('https://backendsn.onrender.com/partidos');
        setPartidos(response.data);
      } catch (error) {
        console.error('Error cargando los partidos:', error);
      } finally {
        setLoading(false);
      }
    };

    traerPartidos();
  }, []);

  if (loading) return <p>Cargando partidos... 🌀</p>;

  return (
    <div className='calendario'>
      <h2>📅 Partidos Programados</h2>
      <ul className='calendario-lista'>
        {partidos.map(partido => (
          <li className='jornada' key={partido.id}>
            <strong>Jornada {partido.jornada}:</strong> {partido.equipo_local} 🆚 {partido.equipo_visitante}
            {partido.goles_local !== null && partido.goles_visitante !== null ? (
              <span>🧮 Resultado: {partido.goles_local} - {partido.goles_visitante}</span>
            ) : (
              <span>⌛ Resultado pendiente</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendario;
