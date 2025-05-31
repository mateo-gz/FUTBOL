import React from 'react'
import TablaPosiciones from '../components/tablaPosiciones'
import Calendario from '../components/calendario'
import ListaEquipos from '../components/equipos'
import Login from '../components/login'

const Home = () => {
  return (
    <div className="home">
        <TablaPosiciones />
        <Calendario />
        <ListaEquipos />
        <Login />
    </div>
  )
}

export default Home