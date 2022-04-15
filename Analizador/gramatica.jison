/* Análisis Léxico */
%lex

%options case-insensitive         
%x string
%%

/*Ignorar*/
\s+                                                  //Espacios en blanco
\/\/.*                                               //Comentario unilinea
\/\*([^"!>"]|[\r|\f|\s|\t|\n])*\*\/                  //Comentario multilinea

/*Declaración de Palabras Reservadas*/

"int"                       return 'int';
"double"                    return 'double';
"boolean"                   return 'boolean';
"char"                      return 'char';
"string"                    return 'string';
"true"                      return 'true';
"false"                     return 'false';

/*Caraácteres básicos*/        
"+"                         return 'mas';
"-"                         return 'menos';
"*"                         return 'mul';
"/"                         return 'div';
"^"                         return 'exp';
"%"                         return 'mod';
"=="                        return 'igual';
"!="                        return 'desigual';
"<="                        return 'menorIgual';
"=>"                        return 'mayorIgual';
"<"                         return 'menor';
">"                         return 'mayor';
"="                         return 'asignar';
":"                         return 'dospuntos';
"?"                         return 'ternario';
"||"                        return 'or';
"&&"                        return 'and';
"!"                         return 'not';
"("                         return 'parA';
")"                         return 'parC';
"{"                         return 'corA';
"}"                         return 'corC';
";"                         return 'puntocoma';
","                         return 'coma';

//Basado en https://gerhobbelt.github.io/jison/docs/#lexical-analysis
//Separación de Cadenas
["]                             {cadena= "";        this.pushState("string");}
<string>[^"\\]+                 {cadena += yytext;}
<string>"\\\""                  {cadena += "\"";}
<string>"\\n"                   {cadena += "\n";}
<string>\s                      {cadena += " ";}
<string>"\\t"                   {cadena += "\t";}
<string>"\\\\"                  {cadena += "\\";}
<string>"\\\'"                  {cadena += "\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'texto';}

//Separación de Caracteres
\'("\n"|"\\\\"|"\t"|"\r"|\\\'|\\\"|.)\'   return 'caracter';

//Regex
[0-9]+("."[0-9]+)?\b        return 'numero';               
([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador';  

/*Fin de la cadena*/
<<EOF>>                     return 'EOF';

/*Manejo de Errores*/
.                           {
                                lista.add("Léxico", "Caracter Inesperado: " + yytext, yylloc.first_line, yylloc.first_column  + 1);

                            };

/lex

%{
        //Importes
        var ListaErrores = require("./recursos/errores/ListaErrores");

        //Instrucciones
        var lista = new ListaErrores();

%}

%right 'or'
%right 'and'
%right 'not'
%left 'igual' 'desigual' 'menor' 'menorIgual' 'mayor' 'mayorIgual'
%left 'mas' 'menos'
%left 'mul' 'div' 'mod'
%nonassoc 'exp'
%left UMENOS

%start INICIO

%%

INICIO: SENTENCIA EOF
        {       
                var salida = {
                        lerrores: lista
                }
                //Reiniciar la lista de Errores
                lista = new ListaErrores();
                
                return salida;
        }
;         

SENTENCIAS: SENTENCIAS SENTENCIA
            | SENTENCIA
;

SENTENCIA: VARIABLES
;

VARIABLES: TIPO LISTAID asignar EXPRESION puntocoma
        | TIPO LISTAID puntocoma
;

LISTAID:  identificador coma LISTAID
        | identificador

;

TIPO: int   
    | double
    | boolean
    | char
    | string
;

EXPRESION: EXPRESION mas EXPRESION
         | EXPRESION menos EXPRESION
         | EXPRESION mul EXPRESION
         | EXPRESION div EXPRESION
         | EXPRESION mod EXPRESION
         | EXPRESION exp EXPRESION
         | menos EXPRESION %prec umenos
         | EXPRESION igual EXPRESION
         | EXPRESION desigual EXPRESION
         | EXPRESION menor EXPRESION
         | EXPRESION menorIgual EXPRESION
         | EXPRESION mayor EXPRESION
         | EXPRESION mayorIgual EXPRESION
         | EXPRESION or EXPRESION
         | EXPRESION and EXPRESION
         | not EXPRESION
         | parA EXPRESION parC
         | numero
         | true
         | false
         | texto
         | caracter
         | identificador
;

