//Prepara y carga la informacion relevante
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const AsignacionVariable = require("./AsignacionVariable")
const DeclararVariable = require("./DeclararVariable")
const DeclararMetodo = require("./DeclararMetodo")
const ListaErrores = require("../errores/ListaErrores");
const ListaSimbolos = require("../datos/ListaSimbolos");
const Run = require("./Run")

function Iniciar(instrucciones, entorno, errores, simbolo){
    var salida = ""
    //Buscar Método Run-----------------------------------------------------------
    var contador=0;
    for(let i = 0; i < instrucciones.length; i++){
        if(instrucciones[i].tipo===TIPO_INSTRUCCION.RUN){
            contador++;
        }
    }
    if(contador > 1){
        errores.add("Semántico", "Existe más de un instacia de run." , 0, 0);
        return 'Error: Existe más de una instancia de run.'
    }

    //Declaracion, asignacion y creacion de metodos y variables
    for(let i = 0; i< instrucciones.length; i++){
        if (instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONV){
            var consola = DeclararVariable(instrucciones[i], entorno, errores, simbolo, "GLOBAL")
            if(consola != null){
                salida += consola + "\n"
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACIONV){
            var consola = AsignacionVariable(instruccion, entorno)
            if(consola != null){
                salida += consola +'\n'
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
    for(let i = 0; i < instrucciones.length; i++){
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