import express, { Router, urlencoded } from 'express'
import cors from 'cors'
import pelicularoutes from './pelicula/peliculaRoutes.js';
import actorRoutes from './actor/actorRoutes.js';
import client from './common/db.js';

const PORTS = 3000 || 4000;
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

// desarrollo del punto, Debe existir una ruta por defecto que daba solo ser ejecutada por medio de método GET y que devuelva el mensaje
app.get('/', (req, res) => {return res.status(200).send('Bienvenido al cine Iplacex')})


app.use('/api', pelicularoutes, actorRoutes)


await client.connect()
.then(() => {

    console.log('Conectado al cluster')
    app.listen(PORTS, () => { console.log(`servidor corriendo en http://localhost:${PORTS}`) })

})
.catch(() => {

    console.log('Error al conectar al cluster de Atlas')

})