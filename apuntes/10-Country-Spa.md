**115. Introduccion**

Vamos a profundizar en la aplicacion de Paises. Vamos a hacer las peticiones http de una forma moderna, no tradicional. Utilizando reasource y rxreasource.

**116. Temas puntuales**

En esta sección aprenderemos a trabajar con:

Recursos como:

- Resources

- rxResources

- Señales

- Servicios

- Reutilización de componentes

- Peticiones http

- Operadores de RXJS

Mucho más

La idea es hacer funcionar nuestra aplicación

**117. Demostraciones**

Muestra lo que vamos a hacer.

**118. Continuacion de aplicacion**

api de los paises que vamos a usar:

    https://restcountries.com/

**119. CountryService - Interfaces**

Siempre que queramos hacer peticiones http en nuestro service vamos a tener que inyectar el HttpClient

    private http = inject(HttpClient)

Pero para esto vamos a tener que traerlo a la configuracion de nuestra aplicacion.

    //app.config.ts
    export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideHttpClient(withFetch())
    ]
    };

Como la api trae demasiado datos de los paises creamos una interface que mapea los datos a un objeto mas simple que solo tiene los datos que vamos a utilizar. 

**120. Country interface y mapeo de datos**

Primero hacemos que la pagina de countries por capital llame al service con el filtro que corresponde, en un signal y eso se lo enviamos a traves de input al componente list que es una tabla para mostrar la informacion. Luego creamos esa clase intermedia que mapee solo los datos que vamos a usar.

**121. Country interface y mapeo de datos**


Hacemos una classe CountryMapper que va a tener dos metodos staticos. Uno que recibe un Objeto rest y que devuelve el objeto del tipo que nosotros queremos. Y otro metodo estatico que hace lo mismo pero con un array pasando cada elemento pro el objeto anterior. Luego es llamado este mapper en el service. 

    export class CountryMapper {
        static mapRestCountryToCountry(rest: RESTCountry): Country {
            return {
            cca2: rest.cca2,
            flag: rest.flag,
            flagSvg: rest.flags.svg,
            name: rest.name.common,
            capital: rest.capital.join(','),
            population: rest.population,
            };
        }

        static mapRestCountryArrayToCountryArray(restCountrys: RESTCountry[]) {
            return restCountrys.map(this.mapRestCountryToCountry);
        }
    }

    export class CountryService {
        
        private http = inject(HttpClient)

        searchByCapital(query:string): Observable<Country[]>{
            query = query.toLowerCase()
            return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
            .pipe(map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)))
        }
    }

**122. Nombre del país en español**

No me interesa. Simplemente es corregir el mapper para que mapee el nombre en de otro lado donde esta en espaniol.


**123. Decimal pipe**

Basicamente modificamos visualmente los numeros para que se lean mejor. Angular utiliza Pipes que son una especie de objeto que modifican visualmente algo, depende del pipe. DecimalPipe, JsonPipe, TitleCasePipe, etc. Al pasar algo por esta funcion se ve modificado visualmente. Mas adelante en el curso tenemos una seccion especifica de esto. 

**124. Manejo de excepciones**

(Esto a partir de la 19 cambia a menos lineas de codigo con Resources todavia experimental)

Vemos el manejo de excepciones en Angular. Hay varias formas de hacerlo. En nuestro componente podemos manejarlo usando next y error, pero creo que esto despues se va a refactorizar.

    this.countryService.searchByCapital(query)
        .subscribe({
            next: (countries) => {
                this.isLoading.set(false)
                this.countries.set(countries)
                console.log(countries)
            },
            error: (err) => {
                console.log(err) //este err es el que enviamos desde el service
                this.isLoading.set(false)
                this.countries.set([])
                this.isError.set(`No se encontró un país con esa capital: ${query}`)
            }
        })

Tambien puede ser que si algo da error querramos regresaar algo con exito desde el service, entonces lo manejemos desde el service. Y aca tambien hay varias formas, pero vamos a usar los operadores de rxjs osea catchError, que va a retornar una funcion throwErro() que lo que haces es retornar Observable para que luego tambien pueda ser manejada desde el componente.

    searchByCapital(query:string): Observable<Country[]>{
        query = query.toLowerCase()
        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
        .pipe(
            map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
            catchError(error => {
                console.log('Error fetching', error)
                return throwError(() => new Error('No se pudo obtener paises con ese query'))
            })
        )
    }

**125. Reactividad con Resources**

Reducimos la logica del componente utilizando Resources. 

    https://angular.dev/guide/signals/resource

Todavia es experimental, puede cambiar. El Resource es una funcion que se define mandandole un objeto de configuracion. El objeto de configuracion tiene una request. Esta request es una funcion basicamente que nos va a permitir mandar la serie de argumentos que nosotros queremos en la otra funcion, la funcion loader. La funcion loader es la realiza el trabajo asincrono, cada vez que cambiemos el valor de la signal que vaya como argumento en el request, va a volver a disparar el 'loader' con los valores que cambiaron. Esto es muy poderoso. !importante

    countryResource = resource({
        request: () => ({ query: this.query() }),
        loader: async({ request}) => {
            if ( !request.query ) return []

            return await firstValueFrom(
            this.countryService.searchByCapital(request.query)
            )
        }
    })