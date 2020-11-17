//contains all user related routes
const express=require("express")
const mysql= require("mysql")
const router = express.Router()

//db connection with a pool 
const poolConnection= mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "nodejstest"
})


router.get("/messages", (req, res) =>{
  console.log("show message")
  res.end()
})
//json all users request
router.get("/users", (req, res)=>{
    //query to all users
    const queryString= "SELECT * FROM users"
    poolConnection().query(queryString,(err, rows, fields)=>{
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
router.get("/user/:id", (req, res)=>{
    //save param id
    const userId = req.params.id
    //query to specific user
    const queryString= "SELECT * FROM users WHERE id= ?"
    poolConnection().query(queryString, [userId],(err, rows, fields)=>{
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

//insert values from user create url
router.post("/user_create",(req, res)=>{
    //request from user create file a tag with that name
    const firstName= req.body.create_first_name
    const lastName= req.body.create_last_name
  
    //query to insert user
    const queryString= "INSERT INTO users (first_name, last_name) VALUES (?,?)"
    poolConnection().query(queryString,[firstName,lastName], (err, results, fields)=>{
      if(err){
        console.log("failed to insert new user " + err)
        res.sendStatus(500)
        return
      }
      console.log("Inserted a new user")
      res.end()
    })   
})

module.exports=router