**77. Introduccion**

La idea de esta etapa es hacer funcionar la app con peticiones http, rxjs, lazyload, rutas dinamicas. Para hacer http usamos la fetch api, pero ofrecepocas funcionalidades y a veces se pone tedioso. El HttoClient es un objeto que viene en Angular y nos permite manejar mucho mas en profundidad las peticiones http. Ademas trabaja con observables, quiere decir que cuando haces una peticion, nuestro observable va a emitir un valor de respuesta. Ademas podemos encadenarle varios operadores rxjs que nos va a permitir transoformarlo, disparar efectos secundarios, crear logs, etc. Es poderoso lo que podemos hacer con Observables. Angular trabaja tanto con estos como con signals. 

**78. Temas Puntuales**

Esta sección es muy interesante porque aprenderemos:

1. Manejo de rutas dinámicas

2. Manejo de LocalStorage

3. Observables a Señales

4. Reutilización de componentes

5. Peticiones HTTP

6. Manejo de caché

7. Mapeo de información

Y más

Esta sección nos encaminará a prepararnos fuertemente en el manejo de estado de nuestra aplicación.

**79. Demostracion**

Una demostracion de como va a quedar la app despues de esta seccion. 

**80. Continuacion de aplicacion**

Chekea que todos estemos en la misma pagina

**81. Giphy API - Servicio de Gifs**

Usamos la api de GIPHY, que es gratis hasta cierta cantidad de peticiones. 

    https://developers.giphy.com/


Creamos una cuenta. Creamos una apikey, la colocamos en el environment.

**82. GifService - interfaces**

Creamos una Interface del gif en si. Con extension que me dijo zeke 'ctrl + shift + p' abrimos la paleta de comandos y hay uno que se llama json to ts from clipboard. Pega todo el json en formato interfaces.

El service funciona como un singleton que va a hacer las peticiones http. Hoy vamos a usar el objeto que proviene de Angular llamado HttpClient, muy poderoso, permite hacer peticiones get, put, etc. Hoy en dia las dependencias ya no se ponen en el constructor sino que se injectan

    
    private http = inject(HttpClient)

    loadTrenfingGifs(){
        this.http.get(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.apiKey,
                limit: 20,
            }
        })
    }

Si nos paramos con el cursor sobre 'get' vamos a ver que el tooltip nos dice que esta consulta devuelve un Observable  que resuelve un objeto. El Observable no es mas que un patron de disenio que nos dice que un objeto puede estar emitiendo valores. Vamos a querer estar pendientes de lo que nuestra peticion http resuelva y con esa resolucion vamos atener el objeto producto de la solicitud http. El observable es porque, el HttpClient es tan poderoso, gracias a que se puede conectar con rxjs. (no explica nada alfinal puro bla bla)


Hay algo muy importante y es que en Angular nosotros definimos como es que queremos que trabaje el HttpClient, ocupamos proveer ese servicio de manera global. Por eso hay que declararlo en el providers de app.config.ts.

    
    //si lo dejamos asi vacio los parentesis. Angular en el fondo va a estar usando las peticiones xhr que son las peticiones tradicionales 
    provideHttpClient(),

    //El nuevo estandar es el fetch, por eso dejamos la siguiente linea. Asi siempre pasa por los observables, pero en el fondo es una peticion fetch.
    provideHttpClient(withFetch()),

Entonces nosotros proveemos el cliente, el cual luego es injectado en el service. 


**83. Peticion HTTP GET**

Hay que saber que en una peticion http nunca se va a realizar hasta nosotros no nos subscribamos. Con .subscribe() hacemos que se dispare. Lo que vamos a mandar dentro del parentesis es un callback donde le primer argumento es la data o la respuesta de la peticion del paso anterior.

Si bien anteriormente creamos una serie de interfaces con toda la data que trae la api, es medio al pedo tener tanto dato si alfinal solo vamos a manejar 3. Aca el profe propone tener una interfaz con solo los datos que vamos a utilizar en la aplicacion, por eso creamos una interfaz mas pequenia con los unicos 3 datos de cada gif que vamos a utilizar. Ahora... la api nos responde un objeto enorme, por eso va a haber que mapear los datos de la respuesta http con nuestro pequenio objeto. Para esto creamos un mapper. El cual recibe el objeto grande entero de la api y tedevuelvo el pequenio gif con solo los datos que necesitamos.

**84. Mostrar Gifs en pantalla**

Basicamente dejamos de usar el mock de los gifs y hacemos un "llamado" al service. Que en realidad es inyectar el service en el componente y despues acceder al signal de este.  

**85. Diseño de pantalla - Buscador de Gifs**

El buscador de gifs es casi la misma pagina que el Trending page, pero con un input de buscador con cosillas de tailwind. Para manejar el input, como todo, hay varias opciones. Una es (keyup)="$event" toma todo el evento que ha sucedido en una accion. Pero tambien existen modificadores de enveto. Uno de esos es enter.

    //vamos a el evento una vez apretado la tecla 'enter'. Usando el input puramente de js.
    (keyup.enter)="txtSearch.value"
    #txtSearch


**86. Mostrar resultados de busqueda**

Esta clase esta BUENA. Me muestra que el service debe retornarme la data ya procesada. Entonces deberia subscribirme al http dentro del service, sin embargo, no puedo retornar la data de esta forma. Asi entran en juego los operadores de rxjs (pipe,foreach, map etc). Pipe nos permite encadenar funcionamientos especiales de los Observables. Tap es uno que sirve para lanzar efectos secundarios. Tambien es ta 'map' que es uno que me permite barrer elementos de mi respuesta y hace una transformacion sobre el objeto.
La magia de los operadores de rxjs nos permiten transformar las emisiones de los observables y que toda la logica quede en el servicio y que los componentes reciban la data lo mas procesada posible. 

    //GifService
    getSearchGifs(query: string){
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key: environment.apiKey,
                q: query,
                limit: 20
            }
        })
        .pipe(
            map(({ data })=> GifMapper.mapGiphyItemsToGifArray(items))
        );     
    }

    //SearchPageComponent
    onSearch(query:string){
        this.gifService.getSearchGifs(query).subscribe( (resp) => 
      this.gifList.set(resp) 
    )}



