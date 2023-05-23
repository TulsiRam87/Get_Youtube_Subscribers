const express = require('express');
const path = require("path");
const Subscriber = require("./src/models/subscribers");
const app = express();

app.use(express.json());



//Routing all api's here
//When the server is loaded, an informatory page is shown to understand about the projet
//GET req to get the html file.
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});


//This api is getting all the data from mongodb by subscribers routes .
//GET METHOD
app.get("/subscribers",async(req,res)=>{
  try{
    let subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  }catch(error){
    res.status(500);
  }
})


// This api is only getting the subscribers name and Channel
// GET METHOD
app.get("/subscribers/names",async(req,res)=>{
  try{
    let subscribers = await Subscriber.find({}).select("name subscribedChannel");
    res.status(200).send(subscribers);
  }catch(error){
    res.status(500);
  }
})



//This api is getting subscribers based on id provided in params
//GET METHOD
app.get("/subscribers/:id",async(req,res)=>{
  try{
    let subscribers = await Subscriber.findById(req.params.id);
    res.status(200).send(subscribers);
  }catch(error){
    res.status(400).send({message : error.message});
  }
})



module.exports = app;
