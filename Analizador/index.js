'use strict'
const express = require('express')
const bodParser = require('body-parser')
const Entorno = require("./recursos/datos/Entorno");
const Iniciar = require("./recursos/instruccion/Iniciar");
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
    var arbol = parser.parse(entrada)
    const global = new Entorno(null)
    let recorrido = Iniciar(arbol , global)
    var respuesta={
        message:"Resultado correcto",
        ast: arbol,
        salida: recorrido,
        errores:analisis.lerrores
    }
    res.send(respuesta)
})

app.listen('3000', ()=>{
    console.log("Servidor en puerto 3000")
}) 