class Metodo{
    constructor(nombre, listaParametros, instrucciones, linea, columna){
        this.id = nombre
        this.parametros = listaParametros
        this.instrucciones = instrucciones
        this.linea = linea
        this.columna = columna
    }
}

module.exports = Metodo