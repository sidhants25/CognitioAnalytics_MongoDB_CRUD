const createListing = require('./crud');
const createMultipleListings = require('./crud');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sidhantks:Test123@catestcluster.v89tfbi.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    // await listDatabases(client);


    // await createListing(client, {
    //   name: "Test house",
    //   summary: "Big house with lots of space",
    //   bedrooms: 4,
    //   bathrooms: 1
    // });

    await createMultipleListings(client, [
        {
            name: "Test house",
            summary: "Big house with lots of space",
            bedrooms: 4,
            bathrooms: 4,
            property_type: "flat",
        },
        {
            name: "Test house 2",
            summary: "Small house",
            bedrooms: 1,
            bathrooms: 1,
        }
    ]);

    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

run().catch(console.dir);
