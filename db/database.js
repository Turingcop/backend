
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = `mongodb+srv://
${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}
@cluster0.czazvrf.mongodb.net/?retryWrites=true&w=majority`;

const database = {
    getDb: async function getDb() {
        const db = process.env.NODE_ENV === "test" ? "test" : "editor";
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });

        client.connect();
        const collection = client.db(db).collection("docs");

        return {
            collection: collection,
            client: client,
        };
    }
};

export default database;
