const Entorno = require("../datos/Entorno")
const Local = require("./Local")
const DeclararParametro = require("./DeclararParametro")
const Instruccion = require("./Instruccion")

function Run(instruccion, entorno){
    var salida = ""
    var buscar = entorno.getMetodo(instruccion.nombre)
    if(buscar != null){
        var entornoLocal = new Entorno(entorno)
        if(buscar.parametros != null){
            if(instruccion.valores != null && buscar.parametros.length == instruccion.valores.length){
                var error = false;
                //Declarar Parametros
                for(let i = 0 ; i < buscar.parametros.length ; i++){
                    var declarar = Instruccion.declaracionv(buscar.parametros[i].id, instruccion.valores[i], buscar.parametros[i].tipodato, instruccion.linea, instruccion.columna)
                    var consola = DeclararParametro(declarar, entornoLocal)
                    if(consola != null){
                        error = true;
                        salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
                    }
                }
                if(error){
                    return salida
                }
                var ejecutar = Local(buscar.instrucciones, entornoLocal)
                return ejecutar
            }
            else{
                return {
                    tipo: 'Semántico',
                    descripcion: `La cantidad de parámetros no coinciden.`,
                    linea: instruccion.linea,
                    columna: instruccion.columna
                }
            }
        }
        else {
            var ejecutar = Local(buscar.instrucciones, entornoLocal)
            return ejecutar
        }
    }
    else{
        return {
            tipo: 'Semántico',
            descripcion: `El metodo '${instruccion.nombre}' no existe`,
            linea: instruccion.linea,
            columna: instruccion.columna
        }
    }
}

module.exports = Run