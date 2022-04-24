//Manejo de datos encapsulados entren llaves
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const AsignacionVariable = require("./AsignacionVariable")
const AsignacionArreglos = require("./AsignacionArreglo")
const DeclararVariable = require("./DeclararVariable")
const DeclararArreglos = require("./DeclararArreglos")
const While = require("./While")
const Print = require("./Print")
const Return = require("./Return")

function Local(instrucciones, entorno, errores, simbolo){
    var salida = ""
    let ban = 0;
    for(let i = 0; i < instrucciones.length; i++){
        if(ban == 1){
            break;
        }

        if (instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONV){
            var consola = DeclararVariable(instrucciones[i], entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola + "\n"
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACIONV){
            var consola = AsignacionVariable(instrucciones[i], entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONA1 || instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONA2||
            instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONA3){
            var consola = DeclararArreglos(instrucciones[i], entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACIONA){
            var consola = AsignacionArreglos(instrucciones[i], entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola +'\n'
            }
        }

        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.LLAMADA){
            const Run = require('./Run')
            var consola = Run(instrucciones[i], entorno, errores, simbolo)
            if(consola != null){
                if(typeof(consola) == 'object'){
                    salida += consola.salida +'\n'
                }else{
                    salida += consola +'\n'
                }
            }
        }

        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.LLAMADAA){
            const Run = require('./Run')
            var consola = Run(instrucciones[i], entorno, errores, simbolo)
            if(consola != null){
                if(typeof(consola) === 'object'){
                    let objeto = {
                        resultado: consola,
                        salida: salida
                    }
                    salida = objeto;
                    return salida
                }else{
                    salida += consola +'\n'
                }
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.RETURN){
            var consola = Return(instrucciones[i], entorno, errores, simbolo)
            ban = 1;
            if(consola != null){
                if(typeof(consola) === 'object'){
                    let objeto = {
                        resultado: consola,
                        salida: salida
                    }
                    salida = objeto;
                    return salida
                }else{
                    salida += consola +'\n'
                    return salida
                }
            }
        }
        else if(instrucciones[i].tipo === TIPO_INSTRUCCION.WHILE){
            var consola = While(instrucciones[i], entorno, errores, simbolo)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if(instrucciones[i].tipo === TIPO_INSTRUCCION.PRINT){
            var consola = Print(instrucciones[i], entorno, errores, simbolo)
            if(consola != null){
                salida += consola
            }
        }
        else if(instrucciones[i].tipo === TIPO_INSTRUCCION.PRINTLN){
            var consola = Print(instrucciones[i], entorno, errores, simbolo)
            if(consola != null){
                salida += consola +'\n'
            }
        }
    }
    
    return salida
}

module.exports = Local