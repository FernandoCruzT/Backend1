const express = require("express")
const users = require("./users.json")
const fs = require("fs")
const app = express()
const PORT = 3000

//añade el body como parte del request request.body
app.use(express.json)

app.post('/users', (request, response)=>{
    const body = request.body

    if(body){
        body.id=users.length+1
        users.push(body)
        fs.writeFileSync(
            "./users.json",
            JSON.stringify(users,null,2)
        )
        response.status(201).json(body)
    }
    console.log(body)
})

app.get('/',(request, response)=>{
    response.json({"mensaje":"hello world"})
    console.log("Si sirve")
    console.log(users)
})


app.get('/users', (request, response)=>{
    response.json(users)
    console.log("Pidiendo información de los usuarios")
})

app.get('/users/:id', (request, response)=>{
    let id = request.params.id
    if(id > 0 && id < users.length){
        response.json(users[request.params.id])    
    }else{
        response.json.status(404).json({"mensaje":"error en id"})
    }
    console.log("Pidiendo información de los usuarios")

})



app.listen(PORT, ()=>{console.log("Escuchando en localhost: " + PORT)})