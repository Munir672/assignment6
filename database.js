import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.CONNECTION, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Close db connection
process.on('SIGINT', ()=>{
  client.close();
  console.log("closed database connection");
  process.exit(1);
})

const connection = client.connect();
const database = client.db('a6-tv-shows'); 

export { connection, database };