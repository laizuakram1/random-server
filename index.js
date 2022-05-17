const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//use middle ware
app.use(cors());
app.use(express.json());

//server connect to mongodb

const uri = "mongodb+srv://userDb1:AA4f9hFI6MZC6QCd@cluster0.mq9ya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const equipmentCollection = client.db("equipments").collection('equipment')


        //get api to read all data to mongodb
        app.get('/products', async(req, res) => {
            const query = req.query;
            const cursor =equipmentCollection.find(query);
            const result = await cursor.toArray();

            res.send(result);
        })

        //create and send data to mongodb
        app.post('/product', async(req, res) =>{
            const data = req.body;
            // const data = {name:'sabina', age:24};
            const result = await equipmentCollection.insertOne(data);
            console.log(`send data to _id: ${result.insertedId}`);

            res.send(result);
        })
        
        //udate data to mongodb
        
        

    }finally{
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) =>{

    res.send('hello from random server');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })