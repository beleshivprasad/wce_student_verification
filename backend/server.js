const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//creating app
const app = express();

//importing temp student data
const students = require('./student')


//creating routes

app.get('/',(req,res)=>{
    res.send({msg:"api is running"})
})

app.get('/student/:id',(req,res)=>{
    const id = req.params.id
    const student = students.find((n)=> n._id == req.params.id)
    res.json(student)
})


const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`Server started running on PORT ${PORT}`)
})



