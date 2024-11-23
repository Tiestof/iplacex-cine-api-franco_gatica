import { MongoClient, ServerApiVersion } from 'mongodb'; 

const uri = 'mongodb+srv://eva3_express:ieiooIDIqDFukNSG@cluster-express.hdiv2.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, 
        strict: true,
        deprecationErrors: true,
    },
});

export default client;