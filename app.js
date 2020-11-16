//load our app server using express
const express = require('express')
const app= express()
const morgan= require ('morgan')
const mysql= require("mysql")

app.use(morgan('short'))

//json request
app.get("/user/:id", (req, res)=>{
  console.log("Fetching user with id:" + req.params.id)

  //db connection
  const connection= mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejstest"
  })
  //query
  const userId = req.params.id
  const queryString= "SELECT * FROM users WHERE id= ?"
  connection.query(queryString, [userId],(err, rows, fields)=>{
    //error handler
    if(err){
      console.log("Failed users query" + err)
      res.sendStatus(500)
      return
    }
    else{
      console.log("user success")
      //res.json(rows)
    }

    const users =rows.map((row)=>{
      return {firstName: row.first_name, lastName: row.last_name}
    })
    res.json(users)
 
  })
})

app.get("/", (req, res)=>{
  console.log("responding to root")
  res.send("hello from root")
})

app.get("/users", (req, res)=>{
  var user1={firstName:"edgar", lastName:"gonçalves"}
  const user2={firstName:"leroy", lastName:"jenkins"}
  res.json ([user1,user2])

})


//localhost:3003
app.listen(3002,() => {
  console.log("server is up on 3002")
})
