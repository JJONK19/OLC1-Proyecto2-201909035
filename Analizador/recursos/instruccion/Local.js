//Manejo de datos encapsulados entren llaves
const TIPO_INSTRUCCION = require("../enume/TipoInstruccion")
const AsignacionVariable = require("./AsignacionVariable")
const DeclaracionVariable = require("./DeclaracionVariable")
const While = require("./While")
const Print = require("./Print")

function Local(instrucciones, entorno){
    var salida = ""
    instrucciones.forEach(instruccion=>{
        if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACIONV){
            var consola = DeclaracionVariable(instruccion, entorno)
            if(mensaje != null){
                salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACIONV){
            var consola = AsignacionVariable(instruccion, entorno)
            if(consola != null){
                salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            const Run = require('./Run')
            var consola = Run(instruccion, entorno)
            if(consola != null){
                if(typeof consola === 'object'){
                    salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
                }
                salida += consola +'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var consola = While(instruccion, entorno)
            if(consola != null){
                if(typeof consola === 'object'){
                    salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
                }
                salida += consola +'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            var consola = Print(instruccion, entorno)
            if(consola != null){
                salida += consola +'\n'
            }
        }
    })
    return salida
}

module.exports = Local