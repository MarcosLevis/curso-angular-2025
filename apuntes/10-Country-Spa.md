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



**121. Nombre del país en español**

No me interesa. Simplemente es corregir el mapper para que mapee el nombre en de otro lado donde esta en espaniol.


