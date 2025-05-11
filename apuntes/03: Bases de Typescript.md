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

    topics/04-homework-typescript

17. Desestructuracion de Objetos

    topics/05-basic-desestructuring

    Se puede aplicar en objetos, en importaciones y exportaciones de Modulos, argumentos de funciones, en un archivo, en una estructura de datos. Consiste en poder tomar ciertas piesas que a mi me interesan. Basicamente es acceder al valor del atributo sin acceder apartir del '.'. Se le puede poner nombre o usar el nombre del atributo del objeto.

    const { song: nombreVariable } = audioPlayer;
    console.log('Song: ', nombreVariable)

18. Desestructuracion de arreglos.

    topics/05-basic-desestructuring

    Es basicamente lo mismo que en los objetos pero en vez de usarlo con llaves se usa con corchetes.

        const [p1, p2 , trunks]: string [] = ['Goku', 'Vegeta', 'Trunk']
        console.log ('Personaje: ', trunks)

19. Desestructuracion de Argumentos

    archivo: topic/06-function-destructuring.ts

    Segun el Clean Code se recomienda tener un maximo de 3 parametros en una funcion, si tenemos mas de tres, hay que crear un objeto y pasarle el objeto como argumento a la funcion. 

    En ECS6 cuando tenemos una propiedad que apunta a una variable cuyo nombre es identico, podemos obviar escribirlo ya que asumo que se llama igual.

        const result = taxCalculation({
            products: shoppingCart,
            tax,
        })

    tax en este caso es el nombre del tatributo pero tambien de la variable que va a ser asignada, entonces no se le pone tax: tax; sino se deja tax directamente.

20. Resolucion de tarea - Desestructuracion

        function taxCalculation( options:TaxCalculationOptions ): [number,number]{
            //function taxCalculation( { products, tax}:TaxCalculationOptions ): [number,number]{

            let total = 0;

            let { products , tax} = options
            products.forEach( ({ price })=> {
                total += price;
            });
            return [total, total * tax]
        }

21. Importaciones y Exportaciones

    archivo: topics/08-classes

    Se resume en tener una funcion encapsulada. La idea de exportar es transformar los archivos en modulos, es decir que esos modulos estan encapsulados y solo lo que se exporta es lo que se expone a que pueda ser utilizado por otra parte de la app

    Clave: cuando importamos algo de un archivo, lo esta trayendo y ejecutando COMPLETO. Por eso hay que tener cuidado de que es lo que hay en el codigo que se exporta.

22. Clases Basicas

    Las Clases en typescript no son como las de javasript que son mas bien prototipos. Son clases del paradigma orientado a objetos que ya se. Nada nuevo.

        public name?: string;
        public name: string | undefined; 
        //son cosas distintas, en ? no existe la presencia del valor
    
    Como typescript despues de compila js cuando queremos acceder a un atributo privado, nos va a tirar error, pero va a compilar igual y nos va a dejar acceder ya que es js, pero te lo deja marcadito. Esto siempre puede configurarse en el tsconfig igual. 

23. Constructor de una Clase

    Funciona igual que en cualquier lenguaje objetoso. Tambien hay sintaxis locas, como resumir toda la clase en el constructor:

        constructor(
            public name: string, 
            private addres: string = 'No Address'
        ) {}
    
    Esto sienta las bases de una las ventajas que tiene Angular por sobre otras herramientas que es la Inyeccion de Dependencias. Que basicamente se va a realizar en el constructor... despues lo veremos mas a profundidad. 

24. Extender una Clase

    Herencia de toda la vida.

25. Priorizar compososicion sobre la herencia

    Para no extender inifinitamente y hacer una herencia muy extendida, priorizamos la composicion. Basicamente es que un atributo sea una instancia de otra clase. Un objeto esta compuesto por uno o varios objetos. Composicion de toda la vida.

26. Genericos

    archivo: /09-generics

    Tratar de evitar lo mas posible el tipo de datos 'any', ya que quita todo tipo de restriccion que ts aplica. Si en toda la aplicacion usamos 'any' basicamente es lo mismo que trabajar en js. 
    Los Genericos se indican <>. El inicial es <T>. Ahora va a inferir el tipo de dato en base al dato que le pasemos. Nuestro editor de texto nos va a ayudar con nuevas cosillas en base al tipo de dato que estamos trabajando.

    export function whatsMyType<T>( argument: T): T {    
        return argument;
    }

    const amIString = whatsMyType<string>('Hola gordo')
    const amINumber = whatsMyType<number>(100)
    const amIArray = whatsMyType<number[]>([1,2,3,4,5])

27. Decoradores

    archivo: topics/10-decorators
    Los decoradores son algo medio complicado segun el profe, como para usar a su completa totalidad. Es raro que lleguemos a necesitarlos. A menos que creemos nuestro propio framework o bla bla bla. Nosotros vamos a usar los que ya estan creados.
    Los decoradores no son mas que funciones especiales que se adjuntan a diferentes objetos. Muy parecido a los decorators en java @decorator.
    En Angular todo van a ser clases, lo unico que cambia es el decorator que la decora para que se transforme en algo en particular, un componente, un modulo, un servicio etc.

        @classDecorator
        export class SuperClass{            
            public myProperty: string = 'Abc1234'
            print(){
                console.log('Hola mundo')
            }
        }

    https://www.typescriptlang.org/docs/handbook/decorators.html

28. Encadenamiento opcional

    El opcional chaining es cuando estamos referenciando a un valor que puede ser opcional.. 

        const printChildren = ( passenger: Passenger) => {
            const howManyChildren = passenger.children?.length || 0;
            // con ! le digo que siempre confie en mi (not null assertion operator)
            const howManyChildren = passenger.children!.length;
            console.log(howManyChildren)
        }

29. Codigo fuente

    https://github.com/Klerith/angular-introduccion-typescript