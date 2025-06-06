import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TablaPosiciones = () => {
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    axios.get('https://backendsn.onrender.com/tabla-posiciones')
      .then(res => setTabla(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="tabla">
      <h2>TABLA DE POSICIONES SAN LUCAS</h2>
      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>GF</th>
            <th>GC</th>
            <th>DG</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map(eq => (
            <tr key={eq.equipo_id}>
              <td>{eq.equipo}</td>
              <td>{eq.pj}</td>
              <td>{eq.g}</td>
              <td>{eq.e}</td>
              <td>{eq.p}</td>
              <td>{eq.gf}</td>
              <td>{eq.gc}</td>
              <td>{eq.dg}</td>
              <td>{eq.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPosiciones;
