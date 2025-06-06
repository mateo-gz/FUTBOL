import { useEffect, useState } from 'react';

const ListaEquipos = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    fetch('https://backendsn.onrender.com/equipos')
      .then(res => res.json())
      .then(data => setEquipos(data))
      .catch(err => console.error('Error trayendo equipos:', err));
  }, []);

  return (
    <div className='equipos'>
      <h2>Lista de Equipos</h2>
      <ul className='lista-equipos'>
        {equipos.map(equipo => (
          <li className='equipo' key={equipo.id}>{equipo.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEquipos;
