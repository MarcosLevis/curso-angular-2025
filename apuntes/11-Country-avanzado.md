**133. Introduccion**

Vamos a aprender conceptos un poco mas avanzados, de optimizacion, estado del navegador, linkedSignal.

**134. Temas puntuales**

Esta es una sección recomendada intermedia, aquí aprenderemos a manejar el caché manual de los resultados, hacer filtros y preservar la información basado en query parameters que vienen desde el URL

Puntualmente veremos:

- Caché

- Router

- QueryParameters

- Configuraciones

- Debounce

**135. Demostracion**

Demuestra como va a quedar lo que hagamos. Se guardan las busquedas aunque naveguemos entre paginas. 

**136. Continuacion**

Repasamos en que estado estabamos.

**137. Debounce - Busquedas automaticas**

El Debounce es basicamente que cuando yo dejo de escribir por la cantidad de segundos que vos quieras, en un input, hace la peticion http, en vez de hacerlo por cada una de las teclas. No es conveniente hacer este manejo en el service porque el objetivo del service es solo hacer el pedido http. Entonces el Debounce lo vamos a poner en el componentente de input. 

**138. Cache de resultado**

Cuando hacemos una busqueda y cambiamos de pagina pero luego volvemos y hacemos la misma busqueda vuelve a hacer un llamado a la api. Cada vez que repetimos unas busqueda tienen que hacer una conexion con el back. La idea de esta parte es guardar el resultado de las busquedas en una cache y si luego se repiten no hace falta hacer una conexion http.


En un momento de la clase habla de las diferencias entre las estructuras de datos Set y Map de javascript. Deja el siguiente enlace:

    https://gist.github.com/Klerith/aa4fa691df78588203d4223e747e7925

Guardamos en un Set una clave con query y el valor con el array de paises que retorne. Luego cada vez que hacemos la nueva consulta la busca en la cache y no existe hace una nueva peticion http con la nueva consulta.

**139. Tarea - Cache de paises**

Hacer lo hecho anteriorimente pero para buscar paises por su nombre.

**140. Tarea - Pises por region**

Agregar la busqueda de paises por region y cachear los resultados.

**141. Resolucion de tarea**

**142. Preservar resultados - ActivatedRoute**

La idea es manejar las busquedas en el input del buscador. Primero en realidad guardamos la query de la url, y la ponemos en el input, podemos copiar el url y va ser lo mismo siempre. Para esto hay que tomar la informacion de la ruta activa. Con activatedRoute tomamos la informacion de la url. Inyecamos el servicio y luego podemos usarlo, nos devuelve un observable. 

  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')

Snapshot captura, saca una foto, de la url en el momento y no se modifica dinamicamente. 
Nuestra page deberia tomar la url y pasarsela al SearchInputComponent y asi este trabajar con ella

    <country-search-input
        placeholderInput="Buscar por capital"
        (value)="query.set($event)"
        [initialValue]="query()"
    />


    initialValue = input<string>('');
    inputValue = signal<string>(this.initialValue());

Sin embargo esto NO FUNCIONA, el problema es como se esta inicializando nuestra query, cuando tenemos un signal que es producto de alguna computacion o calculo, no es que no va a funcionar pero existe un objeto en angular que se llama LinkedSignal que nos va a permitir inicializar una señal con algun tipo de proceso, luego de realizar ese proceso se puede trabajar como una señal normal.

    inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

Basicamente usamos LinkedSignal cuando esa senñal debe ser inicializada, despues la usas como un signal normal. 

 **143. Cambiar queryParams via codigo**

Usamor router.navigate. Esto nos permite manejar la ruta a nuestro gusto y placere. 

**144. Validar parametros de query**

En la parte de Region asegurarnos que el query sea un parametro valido con respecto a lo esperado, si es africa, asia etc.

    function validateQueryParam(queryParam: string): Region {
        queryParam = queryParam.toLowerCase();
        const validRegions: Record<string, Region> = {
            africa: 'Africa',
            americas: 'Americas',
            asia: 'Asia',
            europe: 'Europe',
            oceania: 'Oceania',
            antarctic: 'Antarctic',
        };
        return validRegions[queryParam] ?? 'Americas';
    }

    queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
    region = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

**145. Codigo fuente**

    https://github.com/DevTalles-corp/angular-country-app/tree/fin-seccion-11