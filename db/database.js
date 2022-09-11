
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.czazvrf.mongodb.net/?retryWrites=true&w=majority`;
const collectionName = "docs";

const database = {
    getDb: async function getDb () {
        let dsn = uri;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client = new MongoClient(dsn, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect();
        const collection = client.db("editor").collection("docs");
        return {
            collection: collection,
            client: client,
        };
    }
};

export default database;
