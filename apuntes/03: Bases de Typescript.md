9. Introduccion

    Va a asumir que ya sabemos js. Vamos a usar typescript mediante VITE (god). 

10. Temas puntuales

    Un listado de lo que vamos a ver: Tipos basicos, objetos, arrelos, interfaces, funciones, destructuracion de arreglos y obketos, importaciones, exportaciones, clasees, contstructores, tipos genericos, decoradores, encadenamiento opciona.

11. Inicio de proyecto - Bases de TypeScript

    VITE: en pocas palabras es un "empaquetador", una tecnologia que permite a las aplicaciones poder crearse. Nos permite poder hacer lo que se conoce como "remplazo de modulos en caliente". Es decir, que esos cambios se ajustan sin tener que hacer un full reload de la aplicacioon.

    npm create vite@latest


    este comando nos crea un proyecto sobre vite y nos deja elegir la tecnologia que queramos de fron, se ve lindo habria que investigarlo mas y dejar de usar webpack jeje

    Vite al crear la app crea un proyecto sobre Node.js, tiene package.json ya levanta directamente godd.

12. Tipos basicos y conceptos generales

    archivo: /topics/01-basic-types.ts

    Tipado estricto, el editor nos va decir una especie de documentacion de los objetos.

    Cuando creamos un archivo, la app piensa que vamos a trabajar sobre un archivo solo. Cuando a ese codigo ts le ponemos "export {}" vite comienza a entenderlo como un MODULO

    Al ser tipado vamos a tener mensajes de error a la hora de escribir no de compilar

    vamos a usar 'const', es un estandar altamente soportado

13. Objetos, arreglos e interfaces.

    archivo: topics/02-object-interface.ts

    Basicamente explica como funcionan los objetos y las interfaces xd en typescript


    console.table(objeto) no lo conocia, me gusta

14. Funciones basicas

    archivo: topics/03-functions

    Basicamente explica como funcionan los tipos en las funciones, los tipos implicitos y explicitos en comparacion con js. Nada nuevo.
    
    Las funciones de flecha o lamda functions vienen de js.

15. Funciones como Objetos

    archivo: topics/03-functions

    interface Character {
        name: string;
        hp: number;
        showHp: () => void;
    }

16. Tarea sobre objetos e interfaces

    


