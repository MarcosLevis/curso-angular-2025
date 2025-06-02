**92. Introduccion**

Vamos a ver un poco mas como depurar las aplicaciones de Angular.

**93. Temas puntuales**

Puntualmente veremos:

. Preservar estado del scroll

. Hacer scroll infinito

. Diseño masonry

. Técnicas y herramientas para depurar

**94. Demostracion**

Demuestra un poquito como se ve finalmente la app.

**95. Continuacion de aplicacion**

No explica nada nuevo.

**96. Diseño Masonry**


Basicamente usamos una estructura prediseñada de tailwind para dejar mas linda la vista de los gifs.

**97. viewChild - Tomar referencias del template**

Utilizamos el evento (scroll). Ademas en el div le ponemos overlflow-y-scroll

    <div class=" h-[400px] bg-red-500 overflow-y-scroll grid grid-cols-2 md:grid-cols-4 gap-4 pt-5" (scroll)="onScroll($event)" #groupDiv>

Ademas le agregamos una referencia local al div '#groupDiv', gracias a esta etiqueta podemos tener acceso a todo el objeto div.

Luego vamos a usar el viewChild. Es un signal que sirve para tomar informacion o referencias a piezas del html. El viewChild es solo para uno, si hay mas de uno con esa etiqueta, va a retornar el primero que encuentre y el viewChildren es para varios y los recibimos como un arreglo.


    scrollDivRef = viewChild<ElementRef>('groupDiv')

    onScroll(event: Event){
        const scrollDiv = this.scrollDivRef()?.nativeElement
        console.log(scrollDiv)
    }

Luego imprimimos y nos permite ver aquello por lo que scrolleamos en consola. 

**98. Determinar fin del scroll**

Ahora vamos a determinar cuando es necesario hacer una llamada para agregar mas gifs una vez que llegamos al final de la pantalla. El viewpoint o viewport es exactamente el tamanio de la pantalla visible en si, es lo que el usuario puede ver. Cuando queremos scrollear es porque el contenido que queremos ver es mas grande en altura que el viewpoint, osea mas grande que la ventana. Ambos tienen su medida de altura en px. Tambien hay otro dato importante que es el scrollHeit, que es el tamanio de la porcion del contenido que ya ha salido de la ventan por arriba porque ya ha sido vista. Basicamente es la medida de lo que ya se scrolleo. 


Cada vez que scrolleo esto me va a imprimir en consola exactamente cuanto scrollie en pixeles, cual es el alto de la pantalla del cliente y cuanto es el maximo posible del scroll segun el contenido que tengamos que mostrar:

    onScroll(event: Event){
        const scrollDiv = this.scrollDivRef()?.nativeElement
        if(!scrollDiv) return 
        const scrollTop = scrollDiv.scrollTop;
        const clientHeight = scrollDiv.clientHeight
        const scrollHeight = scrollDiv.scrollHeight
        console.log(scrollTop,clientHeight,scrollHeight)
    }

Entonces cuando sumemos el scrollTop con el clientHeight y esto nos de cerca o supere el scrollHeight eso significa que debemos pedir mas contenido para hacer el scroll infinito.

**99. Cargar siguiente pagina de Gifs**

Modificamos el service para que sete o dessete en true el signal de si esta cargando o no gifs. Ademas en los parametros de llamada a la api, le pedimos el offset que seria algo asi como la "pagina" calculamos la pagina en la que estamos y le pedimos los siguiente 20 gifs en este caso. Luego en la Page preguntamos si ya llegamos al final del scroll y si es asi cargamos nuevos gifs llamando al service. 

**100. Preservar posicion del scroll**

Necesitamos saber cuanta porcion de scroll hemos hecho, ya eso es facil de calcular porque lo tenemos. Ahora hay que guardarlo. Creamos un nuevo service que tenga un signal que guarde en memoria el estado actual del tamanio del scroll.

Vamos a usar 'AfterViewInit', es una intefaz que puede implementar nuestro componente. Es uno de los pasos del ciclo de vida de los componentes en angular que nos permite por ejemplo llamar a un metodo una vez que la vista ya esta inicializada, los componentes fueron renderizados. Mas adelante veremos el ciclo de vida de los componentes en angular.

    ngAfterViewInit(): void {
        const scrollDiv = this.scrollDivRef()?.nativeElement
        if(!scrollDiv) return
        scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
    }

**101. Depuracion de aplicacion**

Vemos un poco las Angular Devtools. Y un poco de como funciona relacionado con los break points.

**102. Codigo Fuente**

    https://github.com/DevTalles-corp/angular-gif-app/tree/fin-seccion-08