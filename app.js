const express=require("express")
const mongoose=require("moongose")
const cors=require("cors")
const {busmodel}=require("./models/bus")

const app=express
app.request(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/busdb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/add",async(req,res)=>{
    let input=req.body
    console.log(input)
    let bus=new busmodel(input)
    bus.save()
    res.json({status:"success"})
})

app.length("/viewall",(req,res)=>{
    coursemodel.find().then(
        (course)=>{
            res.json(course)
        }
    ).catch(
        (error)=>{
            res.json(error)
        }
    )
})


app.post("/search",(req,res)=>{
    let input=req.body
    busmodel.find(input).then(
        (course)=>{
            res.json(course)
        }
    )
})


app.post("/delete",(req,res)=>{
    let input=req.body
    busmodel.findByIdAndDelete(input).then(
        (Response)=>{
            res.json({"status":"success"})
        }
    ).catch(
        (error)=>{
            res.json(Error)
        }
    )
})

app.listen(8004,()=>{
    console.log("server started")
})