import express, { Router } from 'express'
import peliculaController from './peliculaController.js'


const pelicularoutes = express.Router()

pelicularoutes.post('/pelicula', peliculaController.handleInsertPeliculaRequest)

pelicularoutes.get('/peliculas', peliculaController.handleGetPeliculasRequest)

pelicularoutes.get('/pelicula/:id', peliculaController.handleGetPeliculaByIdRequest)

pelicularoutes.put('/pelicula/:id', peliculaController.handleUpdatePeliculaByIdRequest)

pelicularoutes.delete('/pelicula/:id', peliculaController.handleDeletePeliculaByIdRequest)


export default pelicularoutes