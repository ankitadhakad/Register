const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


//register user data
router.post("/create",(req,res)=>{
    // console.log(req.body);


    const {name,email,age,mobile,work,add, desc} = req.body;//object destructuring
    if(!name || !email || !age || !mobile || !work || !add)
    {
        res.status(422).json("please fill the all data");
    }


    try{
        conn.query("SELECT * FROM users  WHERE email = ?",email,(err,result)=>{
           if(result.length){
            res.status(422).json("The data already exist");
           }
           else{
            conn.query("INSERT INTO USERS SET ?", 
            {name,email,age,mobile,work,add, desc},
              (err,result)=>{
                      if(err){
                           console.log("err"+ err);
                        }
                      else{
                           res.status(201).json(req.body);
                       }
            })
           }
        })
    }
    catch(error){
         res.status(422).json(error);
    }

})

//get user data
router.get("/getusers",(req,res)=>{
    conn.query("SELECT * FROM users",(err,result) =>{
        if(err){
            res.status(422).json("no data available");
        }
        else{
            res.status(201).json(result);
        }
    })
})



//delete use api
router.delete("/deleteuser/:id",(req,res)=>{

    const {id} = req.params;
    conn.query("DELETE FROM USERS WHERE id = ? ",id,(err,result) =>{
        if(err){
            res.status(422).json("error");
        }
        else{
            res.status(201).json(result);
        }
    })
})

//get single user
router.get("/induser/:id",(req,res)=>{

    const {id} = req.params;
    conn.query("SELECT * FROM USERS WHERE id = ? ",id,(err,result) =>{
        if(err){
            res.status(422).json("error");
        }
        else{
            res.status(201).json(result);
        }
    })
})

//update user api

router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;
    conn.query("UPDATE USERS SET ? WHERE id = ?",[data,id],(err,result) =>{
        if(err){
            res.status(422).json({message:"error"});
        }
        else{
            res.status(201).json(result);
        }
    })
})
module.exports = router;
