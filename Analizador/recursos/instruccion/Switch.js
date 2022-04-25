const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const Entorno = require("../datos/Entorno")
const Operacion = require("../operacion/Operaciones")

function Switch(instruccion, entorno, errores, simbolo){
    var salida = ""
    let expresion = instruccion.valor
    let casos = instruccion.casos
    let def = instruccion.default
    let valor  = Operacion(expresion, entorno, errores, simbolo)
    if(valor.tipo != "ERROR"){
        let ban = 0;

        for(let i = 0; i < casos.length; i++){
            if(ban == 1){
                break;
            }

            let val = Operacion(casos[i].valor, entorno, errores, simbolo)
            if(val.valor == valor.valor){
                //Revisar si viene un break
                for(let j = 0; j < casos[i].instrucciones.length; j++){
                    if(casos[i].instrucciones[j].tipo === TIPO_INSTRUCCION.BREAK){
                        ban = 1;
                        break;
                    }
                }
                //Ejecutar Instrucciones
                let Local = require('./Local')
                var entornoLocal = new Entorno(entorno)
                var consola = Local(casos[i].instrucciones, entornoLocal, errores, simbolo)
                if(consola != null){
                    if(typeof(consola) == 'object'){
                        ban = 1
                        salida += consola.salida +'\n'
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
        }

        //Correr Default
        if(ban != 1){
            //Ejecutar Instrucciones
            let Local = require('./Local')
            var entornoLocal = new Entorno(entorno)
            var consola = Local(def.instrucciones, entornoLocal, errores, simbolo)
            if(consola != null){
                if(typeof(consola) == 'object'){
                    ban = 1
                    salida += consola.salida +'\n'
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
        return salida
    }
    else{
        errores.add("Semántico", 'Hay un error en el valor a comparar.' , instruccion.linea, instruccion.columna);
        return 'Hay un error en el valor a comparar.'
    }
}

module.exports = Switch