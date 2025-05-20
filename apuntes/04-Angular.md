30. Introduccion

    Vamos a ver los conceptos basicos. Vamos a crear un proyectito pequeño. Lo mas dificil de Angular es que tiene muchas formas de hacer las cosas. Fernando dice que la gente de Angular esta empujando por hacerlas de una forma especifica y eso es lo que vamos a ver, por eso regraba todo el curso, por ejemplo usando signals. La version 17 de Angular es considerada un antes y despues. Este curso es con las nuevas versiones, no con Legacy.
    
31. Tempas puntuales
    
    Vamos a ver: signals, estados, propiedades, rutas, metodos, eventos, cambios en el DOM, cada archivo de un proyecto etc.

32. Intruccion a Angular

    Framework multi-plataforma creado por Google.
    Web: SPA, SSR, SSG
    Movil: ionic, NativeScrip
    Desktop: Electron 

    Framwork: cuando lo abris tenes todo lo que necesitas y se mantienen las versiones
    -   Gestor de estado
    -   Enrutamiento
    -   Reactividad
    -   Peticiones HTTP
    -   Directivas
    -   etc

    Bloques fundamentales de Angular:
    -   Componentes: Una pieza que representa una parte de la interfaz del usuario.
        - Logica(ts)
        - Estilo - (SAS,CSS, etc) - opcional
        - Plantilla HTML
    -   Rutas: Permiten cambiar paginas (componentes que usualmente cubren todo el punto de vista)
        - Separar logica
        - Control de acceso y autorizacion
        - Estrategias de renderizado
    -   Directivas: Modifican el comportamiento de un elemento HTML
        - Atributo - ngClass, NgStyle...
        - Estructurales - ngIf, ngFor...
        - Componente - Personalizadas

33. Primer proyecto en Angular

    ng install -g @angular/cli para instalarlo globalmente
    ng new 'nombreproyecto' para crear la aplicacion

34. Explicacion de archivos y directorios. 

    - tsconfig.json:
        Archivo de configuracion de typescript. Tiene la version a la cual vamos a generar nuestro codigo de js despues de compilar, que tipos de modulos. Que haga saltos de chekeos, etc. 
    - tsconfig.spec.json y tsconfig.app.json:
        Extienden de tsconfi, entonces lo que hacen es agregar configuracion. En app es cuando esta corriendo la app y spec es cuando esta testiando.
    - package.json:
        Toda aplicacion de node lo tiene.  Declara varias cosas. Los scripts que queres configurar para ejecutar y que la aplicacion corra, o testee, o buildee o lo que necesites. Dependencias de Angular que van a ser parte del empaquetado final. devDependencias son dependencias que solo son usadas en desarrollo, no se aplican al bundle final. Bundle entendido como el producto final buildeada.
    - package-lock.json
        Se utiliza para reconstruir los modulos de node. Se actualiza y sabe como trabajar solo, no tocamos nada. 
    - angular.json
        Le dice a angular como queremos que sea la aplicacion en cada uno de los environments, se configura por estado, testing, dev etc
    - editorconfig
        Son las configuracion recomendadas por angular para nuestro editor de codigo.
    - /public
        Ahi van los recursos estaticos de la aplicacion 
    - /node_modules
        Tiene todos los paquetes que estan referenciados en el package.json y como paquetes que dependen de otros paquetes. No van en el bundle final. 
    - /dist
        Es la version de produccion que se va publiucada y se crea despues de hacer el build
    - /.angular
        Se usa para manejar algun tipo de cache entonces cada vez que buildeamos se hace mas rapido creo.

35. Explicacion del directorio src

    app.component.ts:

    Todo en angular es una clase. Los componentes para definir esa clase como componente tiene un decorador:

        @Component({
        selector: 'app-root',
        imports: [RouterOutlet],
        templateUrl: './app.component.html',
        styleUrl: './app.component.css'
        })
        
    El selector le da la el nombre de la etiqueta html para invocar al componente:      
        
        <app-root></app-root>
    
    index.html:

    Es el que va a envolver toda la aplicacion.

    main.ts:

    Le decimos a angular como va a crear la aplicacion. /platfor-browser es porque va a correr web. En este archivo comienza la aplicacion, es el punto de entrada.
            
        bootstrapApplication(AppComponent, appConfig)
        .catch((err) => console.error(err));

    bootrap levanta la aplicacion, le decimos que apartir de AppComponente, es el root, y con e importamos el appConfig que decide como corre la app. 

    app.config.ts:

    Se usa para modificar configuracion de typescript o javascript de forma global. ProvideRouter provee routes, que vienen de app.routes que es el que definimos las rutas de la aplicacion, donde dependiendo la ruta levanta ciertos component. Ademas esta provideZoneChangeDetection que nos va a permitir cambiar en como queremos que angular trabaje en cuanto al manejo de estado. 

    Apartir de angular 17 hay dos formas de trabajar. Una forma tradicional de declarar las properties y usarlas y a traves de signals que es a lo que esta queriendo llevar la tendencia angular.

36. Counter page - Componente

    app/pages

37. Tarea - Separar template de la logica

    app/pages

38. Señales - Signals

    Se llega a la conclusion que la manera de cambiar el estado en la aplicacion no deberia estar dado ni por renders del componente ni basado en librerias externas que esten pendientes de los cambios y se aseguren de la sincronizacion de los mismos. El concepto de las seniales es algo que le dice al framework que parte especifica cambio de la aplicacion y solo hay que actualizar lo que fue modifica si renderizar nada mas. Los signals, nos permiten actualizar el cambio especifico y particular sin renderizar todo o ejecutar un ciclo pesado de deteccion de cambios. 
        
        //WitableSignal<number>
        counterSignal = signal(10);
        
        //va con () porque alfinal no deja de ser mas que una funcion accedemo al valor del signal
        <h1>Counter Signal: {{ counterSignal() }}</h1>

        //Con set le seteamos un valor, pero con esto se olvida de todo lo anterior
        this.counterSignal.set(10)

        //Cuando tenemos una actualizacion del valor que depende del anterior usamos .update que nos va a dejar pasar por parametro un callback function que devuelve un valor
        this.counterSignal.update( (current) => current + 2)

39. Zoneless Angular

    En este momento estamos en una transicion de ZoneJS a Zoneless. ZoneJS es una libreria externa que se encarga del ciclo de deteccion de cambios de Angular. Si estamos trabajando con properties comun y corrtientes, con el Angular comun y corriente de toda la vida trabaja con ZoneJs al parecer no es del todo eficiente con el trabajo asincronico  (async / await) y es una libreria relativamente pesada. Decidieron pasar a Zoneless, aps que no dependan de zone.js ya que vieron que todo lo de los signals funciona bien, es veloz y mejora la performance en general.
    Comentario: Si dentro de la definicion del decorator del @Component ponemos 'changeDetection: ChangeDetectionStrategy.OnPush' le estamos indicando directamente que no queremos usar ZoneJS en este componente.
    Basicamente la gente de Angular esta pujando para que el framework sea mas rapida, para eso hay que deshacerse de ZoneJs y para eso hay que trabajar con signals.

40. Tarea - Reforzar lo aprendido hasta el momento

        https://gist.github.com/Klerith/b07bfb16b4d6aa27b8ccdbb991d316b2

41. Solucion de la tarea

42. Señales computadas - Readonly Signals



    
