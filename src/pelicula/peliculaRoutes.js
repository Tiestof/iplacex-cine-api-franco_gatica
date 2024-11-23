import express, { Router } from 'express'
import peliculaController from './peliculaController.js'


const peliculaRoute = express.Router()

peliculaRoute.post('/pelicula', peliculaController.handleInsertPeliculaRequest)

peliculaRoute.get('/peliculas', peliculaController.handleGetPeliculasRequest)

peliculaRoute.get('/pelicula/:id', peliculaController.handleGetPeliculaByIdRequest)

peliculaRoute.put('/pelicula/:id', peliculaController.handleUpdatePeliculaByIdRequest)

peliculaRoute.delete('/pelicula/:id', peliculaController.handleDeletePeliculaByIdRequest)


export default peliculaRoute;