const Ambito = require("../controller/Ambito/Ambito");
const Bloque = require("../controller/Instruccion/Bloque");
const Global = require("../controller/Instruccion/Global");
module.exports =(parser,app)=> {
    app.post('/analizar',(req,res)=>{
        var entrada = req.body.entrada;
        var ast = parser.parse(entrada);
        const AmbitoGlobal = new Ambito(null)
        var ejec = Global(ast,AmbitoGlobal)
        var resultado = {
            arbol: ast,
            consola: ejec
        }
        res.send(resultado)
    })
} 