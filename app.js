const express=require("express")
const mongoose=require("moongose")
const cors=require("cors")
const {busmodel}=require("./models/bus")

const app=express
app.request(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/busdb?retryWrites=true&w=majority&appName=Cluster0")

