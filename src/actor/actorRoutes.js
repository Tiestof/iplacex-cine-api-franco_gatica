import express, { Router } from 'express'
import actorController from './actorController.js'


const actorRoutes = express.Router()

actorRoutes.post('/actor', actorController.handleInsertActorRequest)
actorRoutes.get('/actores', actorController.handleGetActoresRequest)
actorRoutes.get('/actor/:id', actorController.handleGetActorByIdRequest)
actorRoutes.get('/actor/pelicula/:pelicula', actorController.handleGetActoresByPeliculaIdRequest) // cambie la ruta de este ultimo para que no topara con el del /actor/:id

export default actorRoutes