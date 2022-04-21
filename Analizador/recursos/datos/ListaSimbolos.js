//Imports
var RSimbolo = require("./RSimbolo");

//Constructor
class ListaSimbolo {
    constructor() {
        this.lista = new Array();
     }

    add(nombre, contenido, tipo, entorno, linea, columna){
        var nuevo = new RSimbolo(nombre, contenido, tipo, entorno, linea, columna);
        this.lista.push(nuevo);
    }
}

module.exports = ListaSimbolo;