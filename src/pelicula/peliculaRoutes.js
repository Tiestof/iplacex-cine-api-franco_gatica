import express, { Router } from 'express'
import peliculaController from './peliculaController.js'


const peliculaRoutes = express.Router()

peliculaRoutes.post('/pelicula', peliculaController.handleInsertPeliculaRequest)

peliculaRoutes.get('/peliculas', peliculaController.handleGetPeliculasRequest)

peliculaRoutes.get('/pelicula/:id', peliculaController.handleGetPeliculaByIdRequest)

peliculaRoutes.put('/pelicula/:id', peliculaController.handleUpdatePeliculaByIdRequest)

peliculaRoutes.delete('/pelicula/:id', peliculaController.handleDeletePeliculaByIdRequest)


export default peliculaRoutes;