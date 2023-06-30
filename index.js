const express = require("express")
const app = express()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

app.use(express.json())
//get users
app.get("/",async(req,res)=>{
    const getUser = await prisma.user.findMany()
    res.json(getUser)
})
//add users
app.post("/",async(req,res)=>{
    const newUser = await prisma.user.create({data:req.body})
    res.json(newUser)
})
//update age of users using id 
app.put("/:id",async(req,res)=>{
    const id = req.params.id
    const newAge = req.body.age
    const updateUser = await prisma.user.update({
        where: {id:parseInt(id)},
        data: {age:newAge}
    })
    res.json(updateUser)
})
//delete user using id
app.delete("/:id",async(req,res)=>{
    const id = req.params.id
    const deleteUser = await prisma.user.delete({
        where: {id: parseInt(id)}
    })
    res.json(deleteUser)
})
//get the owner and builder details along with house details(for that use include), otherwise u just get ownerId and builderId
app.post("/house",async(req,res)=>{
    const createHouse = await prisma.house.create({
        data: req.body
    })
    res.json(createHouse)
})
app.get("/house",async(req,res)=>{
    const getHouse = await prisma.house.findMany({
        include:{
            owner:true,
            builder:true
        }
    })
    res.json(getHouse)
})
//also try using findUnique with where argument
//initial server status
app.listen(3001,()=>{
    console.log("Server Started at 3001")
})