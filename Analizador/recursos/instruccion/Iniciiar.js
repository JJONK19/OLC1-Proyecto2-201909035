//Prepara y carga la informacion relevante
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const AsignacionVariable = require("./AsignacionVariable")
const DeclaracionVariable = require("./DeclaracionVariable")
const DeclararMetodo = require("./DeclararMetodo")
const Run = require("./Run")

function Iniciar(instrucciones, entorno){
    var salida = ""
    //Buscar Método Run
    var contador=0;
    for(let i = 0; i < instrucciones.length; i++){
        if(instrucciones[i].tipo===TIPO_INSTRUCCION.RUN){
            contador++;
        }
    }
    if(contador == 0){
        //No se ejecuta nada de codigo
    }
    else if(contador > 1){
        return  {
            tipo: 'Semántico',
            descripcion: "Existe más de un archivo run",
            linea: 0,
            columna: 0
        }
    }
    //Declaracion, asignacion y creacion de metodos y variables
    for(let i = 0; i<_instrucciones.length; i++){
        if (instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONV){
            var consola = DeclaracionVariable(instruccion, entorno)
            if(mensaje != null){
                salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACIONV){
            var consola = AsignacionVariable(instruccion, entorno)
            if(consola != null){
                salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.DMETODO){
            var consola = DeclararMetodo(instruccion, entorno)
            if(consola != null){
                salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
            }
        }
    }

    //Ejecutar la funcion con Run
    for(let i=0; i<_instrucciones.length;i++){
        if (instrucciones[i].tipo === TIPO_INSTRUCCION.RUN){
            var consola = Run(instrucciones[i], entorno)
            if(consola != null){
                if(typeof consola === 'object'){
                    salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
                }
                salida += consola +'\n'
            }
            break
        }
    }
    return salida
}

module.exports = Iniciar