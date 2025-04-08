const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASSWORD}@cluster0.xpotf.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


const upcomming_Collection= client.db("game").collection("upcomming")
const blog_Collection= client.db("game").collection("blog")
const Player_Collection= client.db("game").collection("Player")

app.get("/tournaments",async(req,res)=>{
  const result= await upcomming_Collection.find().sort({ rating: -1 }).limit(3).toArray();
  res.send(result)
})

app.get("/tournament", async (req, res) => {
  const result = await upcomming_Collection.find().toArray();
  res.send(result);
});


// blog
app.get("/blog",async(req,res)=>{
    const result= await blog_Collection.find().toArray();
    res.send(result)
})
app.get('/blog/:id',async(req,res)=>{
  const id=req.params.id;;
  const query={_id: new ObjectId(id)};
  const result = await blog_Collection.findOne(query);
  res.send(result)
})

// Player_Collection

app.get('/player',async(req,res)=>{
  const result = await Player_Collection.find().toArray();
  res.send(result)
})


app.get('/player/:id',async(req,res)=>{
  const id=req.params.id;;
  const query={_id: new ObjectId(id)};
  const result = await Player_Collection.findOne(query);
  res.send(result)
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})