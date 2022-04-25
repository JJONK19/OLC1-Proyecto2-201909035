const TIPO_DATO = require("../enum/TipoDato")
const Entorno = require("../datos/Entorno")
const Operacion = require("../operacion/Operaciones")

function Si(instruccion, entorno, errores, simbolo){
    var salida = ""
    let c = instruccion.condicion
    let v = instruccion.true
    let f = instruccion.false
    let condicion  = Operacion(c, entorno, errores, simbolo)
    if(condicion.tipo === TIPO_DATO.BOOLEAN){
        if(condicion.valor){
            //Es verdadera la condicion
            let Local = require('./Local')
            var entornoLocal = new Entorno(entorno)
            var consola = Local(v, entornoLocal, errores, simbolo)
            if(consola != null){
                if(typeof(consola) == 'object'){
                    salida += consola.salida
                    return{
                        resultado: consola.resultado,
                        salida: salida
                    }
                }else{
                    salida += consola +'\n'
                    return salida
                }
            }
        }else{
            if(f != null){
                //Revisar si viene otro If o vienen las instrucciones
                if(Array.isArray(f)){
                    //Es verdadera la condicion
                    let Local = require('./Local')
                    var entornoLocal = new Entorno(entorno)
                    var consola = Local(f, entornoLocal, errores, simbolo)
                    if(consola != null){
                        if(typeof(consola) == 'object'){
                            salida += consola.salida
                            return{
                                resultado: consola.resultado,
                                salida: salida
                            }
                        }else{
                            salida += consola +'\n'
                            return salida
                        }
                    }
                }else{
                    let consola = Si(f, entorno, errores, simbolo)
                    if(consola != null){
                        if(typeof(consola) == 'object'){
                            salida += consola.salida
                            return{
                                resultado: consola.resultado,
                                salida: salida
                            }
                        }else{
                            salida += consola +'\n'
                            return salida
                        }
                    }
                }
            }
        }
    }
    else{
        errores.add("Semántico", 'La condición debe ser d tipo booleana para ser valida.' , instruccion.linea, instruccion.columna);
        return 'La condición debe ser d tipo booleana para ser valida.'
    }
}

module.exports = Si