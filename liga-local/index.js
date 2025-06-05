const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const app = express(); // <--- ESTA LÍNEA ES CLAVE

app.use(cors());
app.use(express.json());

const path = require("path");



const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

function generarToken(user) {
  if (!user || !user.id || !user.username) {
    throw new Error('Usuario inválido');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}


client.connect()
  .then(() => console.log('Conexión a BD exitosa, bro'))
  .catch(e => console.error('Error conectando a BD:', e));

// ENDPOINT POST
// index.js
app.post('/equipos', async (req, res) => {
  const { nombre } = req.body; // acá agarras el nombre del equipo
  try {
    const query = 'INSERT INTO equipos (nombre) VALUES ($1) RETURNING *';
    const values = [nombre];  // ¡ojo! aquí usas "nombre", no "nombreEquipo"
    const result = await client.query(query, values); 
    
    res.json(result.rows[0]); // te devuelve el equipo recién creado con id
  } catch (error) {
    console.error('Error al agregar equipo:', error);
    res.status(500).send('Error al agregar equipo');
  }
});



// ENDPOINT GET
app.get('/equipos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM equipos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});

app.get('/partidos', async (req, res) => {
  try {
    const result = await client.query(`
      SELECT 
        p.id, 
        el.nombre AS equipo_local, 
        ev.nombre AS equipo_visitante, 
        p.jornada, 
        p.goles_local, 
        p.goles_visitante
      FROM partidos p
      JOIN equipos el ON p.equipo_local = el.id
      JOIN equipos ev ON p.equipo_visitante = ev.id
      ORDER BY p.jornada ASC;
    `);

    res.status(200).json(result.rows); // Devolvemos los partidos en formato JSON
  } catch (error) {
    console.error('Error al obtener partidos:', error); // Log para saber qué petó
    res.status(500).json({ message: 'Error al obtener partidos' });
  }
});


app.post('/registrar-resultado', async (req, res) => {
  const { partidoId, golesLocal, golesVisitante } = req.body;

  try {
    // 1. Actualizar el partido con el resultado
    await client.query(
      'UPDATE partidos SET goles_local = $1, goles_visitante = $2 WHERE id = $3',
      [golesLocal, golesVisitante, partidoId]
    );

    // 2. Obtener los IDs de los equipos
    const partido = await client.query(
      'SELECT equipo_local, equipo_visitante FROM partidos WHERE id = $1',
      [partidoId]
    );
    const { equipo_local, equipo_visitante } = partido.rows[0];

    // 3. Calcular puntos
    let puntosLocal = 0, puntosVisitante = 0;
    if (golesLocal > golesVisitante) {
      puntosLocal = 3;
    } else if (golesLocal < golesVisitante) {
      puntosVisitante = 3;
    } else {
      puntosLocal = 1;
      puntosVisitante = 1;
    }

    // 4. Actualizar stats de ambos equipos
    await client.query(`
      UPDATE equipos
      SET puntos = puntos + $1,
          goles_a_favor = goles_a_favor + $2,
          goles_en_contra = goles_en_contra + $3,
          diferencia_goles = diferencia_goles + ($2 - $3),
          partidos_jugados = partidos_jugados + 1
      WHERE id = $4
    `, [puntosLocal, golesLocal, golesVisitante, equipo_local]);

    await client.query(`
      UPDATE equipos
      SET puntos = puntos + $1,
          goles_a_favor = goles_a_favor + $2,
          goles_en_contra = goles_en_contra + $3,
          diferencia_goles = diferencia_goles + ($2 - $3),
          partidos_jugados = partidos_jugados + 1
      WHERE id = $4
    `, [puntosVisitante, golesVisitante, golesLocal, equipo_visitante]);

    res.status(200).send('Resultado registrado y tabla actualizada 🔥');
  } catch (err) {
    console.error('Error al registrar resultado:', err);
    res.status(500).send('Hubo un fallo en Matrix al guardar el resultado');
  }
});

app.put('/partidos/:id', async (req, res) => {
  const { id } = req.params;
  const { goles_local, goles_visitante } = req.body;

  try {
    await client.query(
      'UPDATE partidos SET goles_local = $1, goles_visitante = $2 WHERE id = $3',
      [goles_local, goles_visitante, id]
    );
    res.send({ message: 'Resultado actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error actualizando resultado');
  }
});

app.get('/tabla-posiciones', async (req, res) => {
  const actualizarEquipo = async (id, puntos, gf, gc) => {
    await client.query(`
      UPDATE equipos
      SET puntos = puntos + $1,
          goles_a_favor = goles_a_favor + $2,
          goles_en_contra = goles_en_contra + $3,
          diferencia_goles = diferencia_goles + ($2 - $3),
          partidos_jugados = partidos_jugados + 1
      WHERE id = $4
    `, [puntos, gf, gc, id]);
  };
  await actualizarEquipo(equipo_local, puntosLocal, golesLocal, golesVisitante);
  await actualizarEquipo(equipo_visitante, puntosVisitante, golesVisitante, golesLocal);  
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Intentando login...'); // <-- esto
  try {
    const result = await client.query('SELECT * FROM admins WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      'tu_clave_secreta_ultra_segura', // ¡Cámbiala! No seas noob 😅
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor, bro' });
  }
});



// const encryptPasswords = async () => {
//   try {

//     // Traer todos los usuarios
//     const res = await client.query('SELECT * FROM admins');

//     for (let admin of res.rows) {
//       const hashed = await bcrypt.hash(admin.password, 10);
//       await client.query(
//         'UPDATE admins SET password = $1 WHERE id = $2',
//         [hashed, admin.id]
//       );
//       console.log(`Contraseña encriptada para ${admin.username} ✅`);
//     }

//     console.log('Listo bro, todo cifrado como Dios manda 🔐');
//   } catch (err) {
//     console.error('Error al encriptar contraseñas 💥', err);
//   }
// };

// encryptPasswords();

// Middleware para servir frontend compilado
app.use(express.static(path.join(__dirname, "../client/dist")));

const fs = require("fs");

app.use((req, res, next) => {
  const indexPath = path.resolve(__dirname, "../client/dist/index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Página no encontrada (build no hecho)");
  }
});

const express = require('express');

// 👇 Servir archivos estáticos del build de React
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// 👇 Cualquier ruta que no sea API, mandala a React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});


// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

