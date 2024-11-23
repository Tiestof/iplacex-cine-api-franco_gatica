import { ObjectId, ReturnDocument } from 'mongodb'
import { Pelicula } from './pelicula.js'
import client from '../common/db.js'


// desarrollo de punto crear una constante global que acceda al nombre de la base de datos y colección. La constante debe tener el nombre “peliculaCollection”
const peliculaCollection = client.db('cine-db').collection('peliculas')



// funcion insert 
async function handleInsertPeliculaRequest(req, res) {

    let data = req.body
    let pelicula = Pelicula

    pelicula.nombre = data.nombre
    pelicula.generos = data.generos
    pelicula.anioEstreno = data.anioEstreno

    await peliculaCollection.insertOne(pelicula)

    .then((data) => {
        if(data === null) return res.status(400).send('Error al intentar guardar el registro')
        
        return res.status(201).send(data)
    })

    .catch((e) => { return res.status(500).send({error: e}) })

}
// funcion Get todas la peliculas
async function handleGetPeliculasRequest(req, res) {

    await peliculaCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => {return res.status(500).send({ error: e })})
}
// funcion Get x ID pelicula
async function handleGetPeliculaByIdRequest(req, res) {

    
    let id = req.params.id
    
    try {

        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.findOne({ _id: oid })

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
// funcion Update pelicula x Id
async function handleUpdatePeliculaByIdRequest(req, res) {

    
    let id = req.params.id
    let pelicula = req.body

    try {

        let oid = ObjectId.createFromHexString(id)
        
        // tube que reemplazar la forma de hacer el update con let query = { $set: { pelicula } };,  ya que anidaba la actualizacion al final del registro.

        let query = {
            $set: {
                nombre: pelicula.nombre,
                generos: pelicula.generos,
                anioEstreno: pelicula.anioEstreno
            }
        };

        await peliculaCollection.updateOne({ _id: oid }, query)
        
        .then((data) => { return res.status(200).send(data) })
        .catch((e) => { return  res.status(500).send({ code: e.code }) })
        
    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}
// funcion Delete pelicula x Id
async function handleDeletePeliculaByIdRequest(req, res) {
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id)

        await peliculaCollection.deleteOne({ _id: oid })

            .then((data) => {
                return res.status(200).send({ message: 'Película eliminada' })
            })
            .catch((e) => {
                return res.status(500).send({ error: e.message })
            });

    } catch (e) {
        return res.status(400).send('Id mal formado')
    }
}


// exportamos las funciones.
export default {

    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
    
}