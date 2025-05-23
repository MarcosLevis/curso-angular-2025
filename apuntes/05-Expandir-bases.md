**45. Introduccion**

Avanzar y extender las bases. Disenio condicional, directivas, control flow, local storage, desplegar la app etc. 

**46. Temas puntuales**

    • RouterLink
    • RouterLink Active
    • Nuevo control flow
    • @for
    • @if
    • ngClass - ngStyle - Alternativas
    • Comunicación entre componentes
    • Inputs / outputs (Como señales)
    • Servicios en Angular
    • Efectos y LocalStorage
    • LinkedSignal
    • HashRouter
    • Despliegues

**47. Continuacion de proyecto**

ejercicios/02-bases

Solo agregamos la ruta vacia.

**48. Router Link**

Creamos una barra de navegacion

    ng g component 'nombre'

Apartir de las nuevas versiones puedo mover la carpeta de un componente de un lugar a otro y no ocurre mayor problema.

Cuando hacemos un navbar con sus botones para navegar, no es recomendado hacer el <a href=""></a> si no que se recomienda utilizar el RouterLink

RouterLink es la primer Directiva que vamos a usar de angular.

**49. RouterLink Active**

RouterLink Active es una directiva para activar determinada cosa cuando lo "clickeamos", en este ejemplo al clickear un elemento html cuando lo clikeamos le agregamos dinamicamente una clase cuando estamos en el path que indica RouterLink.
    <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Contador</a>
        <a [routerLink]="['/hero']" [routerLinkActive]="'active'">Hero</a>
    </nav>

**50. Tarea - Preparacion de pagina**

Hacemos un nuevo componente boludo y lo agregamos al navbar. Preparamos esta nueva pagina para lo que sigue.

**51. @for - Realizar iteraciones de elementos**

Desde la version 17 de Angular existe un nuevo Control Flow ahora usamos @for en vez de ngFor y es muy parecido cualquier for en los lenguajes

    @for (character of characters(); track character.id) {
        <li>
            <span>{{character.name}}</span>
            <strong class="text-danger"> ({{character.power}})</strong>
        </li>
    }

**52. ngClass - Clases de CSS de forma condicional**

Har varias formas de poner condicionales en el html para que cambie su clase de css.

- [class.nombreDeLaClase]="condicionnn"
- [ngClasss]=

**53. @if - Mostrar elementos de forma condicional**

ngIf nos permite mostrar algo si una condicion se cumple. Apartir del nuevo control flow aparece el @if. Antes no se podian utilizar dos directivas juntas por ejemplo ngFor y ngIf y ademas complicado para trabajar con else. 

**54. Inputs - agregar personajes**

Hay varias formas de manejar imputs. Mas adelante veremos formulario. Ahora vamos a manejar los imputs con signals.

Usamos [value]= cuando nos manejamos con variables o signals. Tambien existen los eventos que van entre (). Este caso vamos a usar (change) que nos permite disparar el evento cuando cambia el texto, osea terminamos de escribir y sacamos el puntero de ahi. Si queremos que cada vez que escribe un caracter se actualice el signal usamis (input)="signal.set()"

**55. Solucion a la tarea**

Para agregar un personaje nuevo yo habia hecho:

    this.characters().push(character)

Pero Fernando dice que para manejar un signal no use push y esas cosas. Hay que usar .update, porque con push actualizamos el valor interno del signal y no el valor del signal en si.

    this.characters.update((list) => [...list, character]);

Alfinal reflexiona de que tenemos un solo componente con un monton de partes y habria que modularizarlo para que esas partes sean componentes y se puedan reutilizar. 

**56. Preparacion de una nueva pagina**

Solo dejamos listo para el resto de las clases.

**57. Funcion input - Comunicacion entre componentes**

Signals como imputs. Reutilizar componentes y no tener toda la logica dentro de uno solo. Si yo en el html de un componente invoco otro:

    <dragonball-super-list></dragonball-super-list>

Estoy diciendo que este es el hijo y va a traer su template. Hay una nueva forma de hacer un input del padre al hijo. Se hace con una funcion llamda input() de angular/core. Puede ser requerida con .required

    <dragonball-character-list [characters]="characters()" /> // el de la izquierda es el nombre del signal del hijo que recibe, el de la derecha es el signal padre

**58. Tarea - Singal Inputs y creacion de componentes**

Modularizar el componente de inputs y agregar los inputs de signals.

**59. Output - emitir valores**

Para emitir outputs ya no se usa mas el @Output sino output() directamente. 

    newCharacter = output<Character>()
    //...//
    this.newCharacter.emit(character)

    //Para recibirlo en el html del padre
    //(newCharacter)="$event"
    (newCharacter)="addCharacter($event)"

() emiten eventos, [] asignar atributos

**60. Servicios en Angular**

Si escribimos en un archivo .service.ts vacio 'aservice' + tab, crea el servicio automaticamente. 

Un service en Angular, es una clase como cualquier otra, pero con un dedcorador que le asigna el valor de Service. Trabaja con Dependency Injection. Esto hace que trabaje el servicio como un Singleton, es decir, que cuando trabajes con este servicio siempre va a ser la misma instancia. Creas la instancia y es siempre la misma, cada que vez que haces un llamado es la misma ubicacion en memoria. Patron singleton de toda lavida. 
Sirve para ser un lugar centralizado de toda la aplicacion no importa si yo me muevo entre toda la app, creo y mato componentes, la data queda en el service.
    
    //Esta linea transforma la clase en un servicio permitiendo que sea un singleton injectable 
    //'root' define el alcance, osea que podemos usarlo en toda la aplicacion
    @Injectable({providedIn: 'root'})


La inyeccion de dependencia basicamente se basa en importar una instancia ya creada del service o si no existe se crea por primera vez. Ya no se inyecta como se hacia antes, ahora se hace de una forma nueva:

    //vieja, sigue funcionando
    constructor(
        public dragonballService: DragonBallService
    ){}

    //nueva como una property
    public dragonballService = inject(DragonBallService)

La nueva forma ademas permite tomar la instancia de la clase service incluso en funciones. Aparte te ahorras el constructor si no es una clase


Entonces lo que vamos a hacer ahora es mover toda la data de la lista de la lista del personaje al service.

**61. Efectos y LocalStorage**

LocalStorage es un espacio en tu navegador web de forma local por cada sitio web.



