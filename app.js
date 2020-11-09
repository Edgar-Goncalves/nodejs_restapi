//load our app server using express
const express = require('express')
const app= express()
const morgan= require ('morgan')

app.use(morgan('short'))

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
