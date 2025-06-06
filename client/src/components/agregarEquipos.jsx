import { useState } from 'react';
import axios from 'axios';

const AgregarEquipo = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backendsn.onrender.com/equipos', {
        nombre: nombre
      });
      setMensaje('Equipo agregado con éxito 💪');
      setNombre('');
    } catch (error) {
      setMensaje('Error al agregar equipo 😢');
      console.error(error);
    }
  };

  const eliminarEquipo = async (id) => {
    try {
      const response = await axios.delete(`https://backendsn.onrender.com/equipos/${id}`);
      alert(response.data.mensaje);
    } catch (error) {
      console.error('Error al eliminar equipo:', error);
      alert('Ocurrió un error al eliminar el equipo');
    }
  };
  

  return (
    <div className='add-equipo'>
      <h2>Agregar equipo nuevo 📝</h2>
      <form className='add-form' onSubmit={manejarSubmit}>
          <input
          placeholder='Nombre'
            className='add-input'
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        <button className='add-input' type="submit">Agregar equipo</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AgregarEquipo;
