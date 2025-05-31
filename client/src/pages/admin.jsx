import React from 'react'
import AgregarEquipo from '../components/agregarEquipos'
import Registro from '../components/registrarPartidos'
import EditarResultados from '../components/editarResultados'
import TablaPosiciones from '../components/tablaPosiciones'
import ListaEquipos from '../components/equipos'

const Admin = () => {
  return (
    <div id="adminPanel">
        <TablaPosiciones />
        <Registro />
        <ListaEquipos />
        <AgregarEquipo />
        <EditarResultados />
    </div>
  )
}

export default Admin