//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js"
import axios from "axios";

//config
const app=express();
const port=process.env.PORT || 9000

// middlewares

app.use(express.json())

// dbconfig
const connection_url= 'mongodb+srv://admin:EzY7OT9bfJxyGYYh@cluster0.6mv9wz7.mongodb.net/whatsappDb?retryWrites=true&w=majority'
mongoose.connect(connection_url)



// api routes

app.get('/',(req,res)=>{
    res.status(200).send("hello world")
})

// axios.post('/messages/new')
//     .then(function (data) {
//         console.log(data);
//     }, (error) => {
//         console.log(error);
//     })

app.post('/messages/new',async(res,req)=>{
    const dbMessage=req.body;

    await Messages.create(dbMessage)
        .then((data)=>{
            res.status(500).send(data)
        })
        .catch((err)=>{
            res.status(201).send(err)
        })          
})
    






//listening

app.listen(port,()=>
    console.log(`listening at port http:${port}`)
)