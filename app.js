const express = require("express")
const mongoose = require("moongose")
const bcrypt = require("bcryptjs") //import encryption package
const jwt = require("jsonwebtoken")//importing token library
const cors = require("cors")


const app = express
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/busdb?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedpswd = async (pswd) => {
    const salt = await bcrypt.genSalt(10)//salt is a cost factor
    return bcrypt.hash(pswd, salt)
}

const { busmodel } = require("./models/bus")

//login api - here we need async as the password is encrypted
app.post("/login", (req, res) => {
    let input = req.body
    //we are checking with mail id
    busmodel.find({ "emailid": req.body.emailid }).then(
        (response) => {
            if (response.length > 0) {
                let dbpass = response[0].pass
                console.log(dbpass)
                bcrypt.compare(input.pass, dbpass, (error, isMatch) => {
                    if (isMatch) {
                        //if login success generate token
                        jwt.sign({ email: input.emailid }, "bus-app", { expiresIn: "1d" },
                            (error, token) => {
                                if (error) {
                                    res.json({ "status": "unable to create token" })
                                } else {
                                    res.json({ "status": "success", "userid": response[0]._id, "token": token })
                                }
                            })//bus-app is the name of the token
                    } else {
                        res.json({ "status": "incorrect password" })
                    }
                })
            }
            else {
                res.json({ "status": "user not found" })
            }
        }
    )
})



app.post("/add", async (req, res) => {
    let input = req.body
    console.log(input)
    let bus = new busmodel(input)
    bus.save()
    res.json({ status: "success" })
})

app.length("/viewall", (req, res) => {
    busmodel.find().then(
        (bus) => {
            res.json(bus)
        }
    ).catch(
        (error) => {
            res.json(error)
        }
    )
})


app.post("/search", (req, res) => {
    let input = req.body
    busmodel.find(input).then(
        (bus) => {
            res.json(bus)
        }
    )
})


app.post("/delete", (req, res) => {
    let input = req.body
    busmodel.findByIdAndDelete(input).then(
        (Response) => {
            res.json({ "status": "success" })
        }
    ).catch(
        (error) => {
            res.json(Error)
        }
    )
})

app.post("/viewusers", (req, res) => {
    let token = req.headers["token"]
    jwt.verify(token, "blog-app", (error, decoded) => {
        if (error) {
            res.json({ "status": "unauthorized access" })
        } else {
            if (decoded) {
                busmodel.find().then(
                    (response) => {
                        res.json(response)
                    }
                ).catch()
            }
        }
    })

})


app.listen(8004, () => {
    console.log("server started")
})