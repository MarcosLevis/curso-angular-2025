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

