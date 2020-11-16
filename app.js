//load our app server using express
const express = require('express')
const app= express()
const morgan= require ('morgan')
const mysql= require("mysql")

const bodyParser= require("body-parser")

//db connection
function getConnection(){
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejstest"
  })
}

//looking request
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('short'))
//allow public folder
app.use(express.static("./public"))

//insert values from user create url
app.post("/user_create",(req, res)=>{
  console.log("First Name: "+ req.body.create_first_name)
  const firstName= req.body.create_first_name
  const lastName= req.body.create_last_name

  //query to insert user
  const queryString= "INSERT INTO users (first_name, last_name) VALUES (?,?)"
  getConnection().query(queryString,[firstName,lastName], (err, results, fields)=>{
    if(err){
      console.log("failed to insert new user " + err)
      res.sendStatus(500)
      return
    }
    console.log("Inserted a new user")
    res.end()
  })
  
})

//json all users request
app.get("/users", (req, res)=>{
  //query to all users
  const queryString= "SELECT * FROM users"
  getConnection().query(queryString,(err, rows, fields)=>{
    //error handler
    if(err){
      console.log("Failed all users query" + err)
      res.sendStatus(500)
      return
    }

    const users =rows.map((row)=>{
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
  })
})

//json user by id request
app.get("/user/:id", (req, res)=>{
  //save param id
  const userId = req.params.id
  //query to specific user
  const queryString= "SELECT * FROM users WHERE id= ?"
  getConnection().query(queryString, [userId],(err, rows, fields)=>{
    //error handler
    if(err){
      console.log("Failed specific user query" + err)
      res.sendStatus(500)
      return
    }

    const user =rows.map((row)=>{
      return {firstName: row.first_name, lastName: row.last_name}
    })
    res.json(user)
 
  })
})

//root 
app.get("/", (req, res)=>{
  console.log("responding to root")
  res.send("hello from root")
})


//localhost:3003
app.listen(3002,() => {
  console.log("server is up on 3002")
})
