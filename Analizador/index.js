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
    //Extraer Valores
    var errores = arbol.lerrores
    var simbolo = arbol.lsimbolos;
    //Ejecucuon de Instrucciones
    const global = new Entorno(null)
    let recorrido = Iniciar(arbol.instrucciones , global, errores, simbolo)
    //Salida
    var respuesta={
        message:"Resultado correcto",
        //ast: arbol,        //Retorna el arbol. Debe de graficarse.
        salida: recorrido,  //Retorna el texto de la consola
        errores: errores,    //Retorna la lista de errores
        simbolos: simbolo,   //Retorna la tabla de simbolos a mostrar
        //metodos: global.tablaMetodos    //Retorna los metodos de la ejecucion
    }
    res.send(respuesta)
})

app.listen('3000', ()=>{
    console.log("Servidor en puerto 3000")
}) 