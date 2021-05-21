const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://codeiUser:codeiuser@cluster0.vx9y5.mongodb.net/code_i?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// App used dep...
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


client.connect(err => {
    // Data collection...
    const collection = client.db("code_i").collection("info");
    console.log("database conected successfully");
    // Sending data to database...
    app.post("/add", (req, res) => {
        const info = req.body;
        console.log(info);
        collection.insertOne(info)
            .then(result => {
                console.log(result);
            })
    })
});

// Root...
app.get('/', (req, res) => {
    res.send("Server Working Perfectly");
})

// Port...
app.listen(process.env.PORT || 5000, () => console.log("Listening to port 5000"));