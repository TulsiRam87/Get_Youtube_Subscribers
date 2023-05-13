const express = require('express');
const path = require("path");
const Subscriber = require("./src/models/subscribers");
const app = express();
//Schema import
// const susbcriberSchema = require('../Youtube_Capstone/src/models/subscribers')

app.use(express.json());
//routes
//api to render html file. || GET
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});


//api to get all data || METHOD GET
app.get("/subscribers",async(req,res)=>{
  try{
    let subscribers = await Subscriber.find();
    res.status(200).send(subscribers);
  }catch(error){
    res.status(500);
  }
})


//api to get all subscribers by name and subscribed channel || METHIOD GET
app.get("/subscribers/names",async(req,res)=>{
  try{
    let subscribers = await Subscriber.find({}).select("name subscribedChannel");
    res.status(200).send(subscribers);
  }catch(error){
    res.status(500);
  }
})


//api to get subscribers by id || METHOD GET
app.get("/subscribers/:id",async(req,res)=>{
  try{
    let subscribers = await Subscriber.findById(req.params.id);
    res.status(200).send(subscribers);
  }catch(error){
    res.status(400).send({message : error.message});
  }
})

// post
// app.post("/subscribers",async(req,res)=>{
//   try{
//     // req.body['subscribedDate'] = new Date(req.body.subscribedDate);
//     let subscribers = req.body;
//     const data = new susbcriberSchema(subscribers);
//     console.log(data)
//     // let s = await data.save();
//     let s = await data.insertMany(data);
    
//     res.status(200).send(s);
//   }catch(error){
//     res.status(500);
//   }
// })


module.exports = app;
