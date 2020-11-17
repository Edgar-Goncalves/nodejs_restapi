//load our app server using express
const express = require('express')
const app= express()
const morgan= require ('morgan')
const mysql= require("mysql")
const bodyParser= require("body-parser")

//display errors
app.use(morgan('short'))

//used to read values from user
app.use(bodyParser.urlencoded({extended: false}))

//allow public folder (front-end)
app.use(express.static("./public"))

//routing to user file where all user querys are stored
const router = require("./routes/user.js")
app.use(router)

//root 
app.get("/", (req, res)=>{
  res.send("The root, the root, the root is on fireeeee")
})

const PROC = process.env.PORT || 3002
//listening to localhost:PORT
app.listen(PORT,() => {
  console.log("server is up on" + PORT)
})

