'use strict'
const express = require('express')
const bodParser = require('body-parser')
let cors = require('cors')

const app = express()

app.use(bodParser.json({limit:'50mb', extended:true}))
app.use(bodParser.urlencoded({limit:'50mb', extended:true}))
app.use(cors())


app.get('/',(req,res)=>{
    var respuesta={
        message:"Servidor en línea"
    }
    res.send(respuesta)
})

app.post('/analizar',(req,res)=>{
    let parser = require('./gramatica');
    var entrada = req.body.entrada;
    console.log(entrada)
    var analisis = parser.parse(entrada)
    console.log(analisis)
    var respuesta={
        message:"Resultado correcto",
        errores:analisis.lerrores
    }
    res.send(respuesta)
})

app.listen('3000', ()=>{
    console.log("Servidor en puerto 3000")
}) 