import { ObjectId, ReturnDocument } from 'mongodb'
import { Actor } from './actor.js'
import client from '../common/db.js'

const actorCollection = client.db('cine-db').collection('artistas')
const peliculaCollection = client.db('cine-db').collection('peliculas');

// funcion insert
async function handleInsertActorRequest(req, res) {
    let data = req.body
    let actor = Actor

        // Validamos que el nombre de la película esté presente en el req
        const peliculaNombre = data.nombrePelicula
        if (!peliculaNombre) {
            return res.status(400).send({ message: "El nombre de la película es obligatorio" })
        }

        // Buscamos el _id de la película que coincida con el nombre
        const pelicula = await peliculaCollection.findOne({ nombre: peliculaNombre })
        if (!pelicula) {
            return res.status(404).send({ message: "No se encontró ninguna película con el nombre proporcionado" })
        }

        // Asignamos los datos a usando el Schema de Actor en la variable actor.
        
            
            actor.idPelicula = pelicula._id.toString() // Asignamos el _id de la película encontrada en base al nombre.
            actor.nombre = data.nombre
            actor.edad = data.edad
            actor.estaRetirado = data.estaRetirado
            actor.premios = data.premios || [] 
        

        // Insertamos el actor despues de hacer las validaciones correspondientes.
        await actorCollection.insertOne(actor)

        .then((data) => {
            if(data === null) return res.status(400).send('Error al intentar guardar el registro')
            
            return res.status(201).send(data)
        })
    
        .catch((e) => { return res.status(500).send({error: e}) })
}

// funcion Get todos los Actores}
async function handleGetActoresRequest(req, res) {

    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => {return res.status(500).send({ error: e })})
}

// funcion Get x ID actor
async function handleGetActorByIdRequest(req, res) {

    let id = req.params.id
    
    try {

        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({ _id: oid })

        .then((data) => {
            if(data === null) return res.status(404).send(data)

            return res.status(200).send(data)

        })
        .catch((e) => {
            return  res.status(500).send({ error: e.code })
        })
        
    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}

// Función Get actores por nombre de la película y validando el ID

// ******************************************************************************************************************************************************************************************************************

// Esto es que de acuerdo con lo entendido es que el parametro solcitado es nombre del la pelicula y no el ID, pero de seben traer los actores en base al ID de la pelicula. (Un poco tramposa la instruccion jajaja)
// handleGetActoresByPeliculaIdRequest	{ }	debe obtener todos los actores de una película en base al _id de la película 
// GET	“/actor/:pelicula”	handleGetActoresByPeliculaRequest =====> aca se pide que el llamado sea entregando el nombre de la pelicula, no el ID.
// cambie la ruta de llamado ya que la instruccion GET	“/actor/:pelicula” a  “/actor/pelicula/:pelicula”  
// Ya que handleGetActorByIdRequest y handleGetActoresByPeliculaRequest, estan en la misma ruta y el metodo handleGetActorByIdRequest asume que es un ID de actor y no un mombre de pelicula o un id de pelicula.

// ******************************************************************************************************************************************************************************************************************

async function handleGetActoresByPeliculaIdRequest(req, res) {

    try {

        const nombrePelicula = req.params.pelicula

        if (!nombrePelicula) {
            return res.status(400).send({ message: "El nombre de la película es obligatorio" })
        }

        // Buscamos el _id de la película basada en su nombre
        const pelicula = await peliculaCollection.findOne({ nombre: nombrePelicula })
        if (!pelicula) {
            return res.status(404).send({ message: "No se encontró ninguna película con el nombre proporcionado" })
        }

        // Buscar los actores que tienen este idPelicula
        const actores = await actorCollection.find({ idPelicula: pelicula._id.toString() }).toArray()

        if (!actores.length) {
            return res.status(404).send({ message: "No se encontraron actores para esta película" })
        }

        return res.status(200).send(actores)
    } catch (e) {
        return res.status(500).send({ error: e.message })
    }

}
// exportamos las funciones
export default {

 handleInsertActorRequest, 
 handleGetActoresRequest,
 handleGetActorByIdRequest,
 handleGetActoresByPeliculaIdRequest
 
}