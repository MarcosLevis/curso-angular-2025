**103. Introduccion**

Vamos a hacer una app para buscar paises por diferentes filtros.

**104. Temas puntuales**

En esta sección aprenderemos y reforzaremos temas como:

. Rutas hijas

. Rutas Anidadas

Creación y comunicación entre componentes

. Tailwind y DaisyUI

. Archivo de rutas por feature / module

. Carga perezosa de módulos de rutas

El objetivo es armar la aplicación que luego haremos funcionar.

**105. Demostracion**

Demostracion de como se va a ver la app. 

**106. Inicio de proyecto country app**

    ng new nombre-app

Levantamos la app. Instalamos tailwind para despues poder usar DaisyUI. Al construirse la app despues solo crea un css con las clases que usamos. Es mucho mas eficiente que bootstrap por ejemplo que te instala todo aunque haya cosas que no uses.

Importamos themes de DaisyUI. Todas estas cosas conviene hacerlas como lo dice la documentacion porque el curso puede estar atrasado.

**107. Rutas y estructuras de carpetas**

Creamos las carpetas con esa estructura que a mi no me gusta tanto de Country y Shared, donde adentro tienen sus pages y sus components. Establecemos las rutas como siempre pero todo el modulo de paises va a manejar sus propias rutas en un archivo aparte. Entonces es necesario en las rutas de paises exportar la clase como default:

        export const countryRoutes: Routes = [
            {
                path: '',
                component: ByCapitalPageComponent,
            },

        ];

        export default  countryRoutes;

Para luego en el app.router hacer una lazy loading que sea vea mas bonito luego de un loadchildren.


        export const routes: Routes = [
            {
                path: '',
                component: HomePageComponent,
            },
            {
                path: 'country',
                loadChildren: () => import('./country/country.routes')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ];

Basicamente dice que todo lo que venga despues de /country/... lo va a manejar el otro archivo de rutas. 

**108. Layout Component**

El layout no es mas que un componente comun y corriente que usualmente usamos para darle un estilo a todas las paginas hijas.

**109. DaisyUI - Componentes**


Aplicamos el componente de footer a toda la aplicacion en app.component.html. Armamos una estructura medio rara, pero por ahora es de lo mejorcito que se puede hacer, para que quede el footer una especie de <main> despues <router-outlet> y despues el <app-footer>

**110. Menu superior e iconos**

Hacemos el navbar y agregamos iconos de las siguientes webs.

    https://iconify.design/
    https://daisyui.com/components/menu/

Volvemos a ustar RouterLink para los botones del navbar y tambien RouterLinkActive

**111. Inputs y Tablas**

Vamos a empezar a crear cada una de las paginas de los paises. Creamos un buscado con un input porque todavia no vimos forms. Y un boton para enviar lo que queramos buscar. Despues creamos una seccion con una tabla, full html para listar los paises. Luedo modularizamos y llevamos estas dos partes, tanto el buscador como la tabla de contenido a dos componentes distintos. Ahora, necesitamos que el componente buscador, le de como output el filtro buscado al componente padre que es la pagina, para que este busque y luego le envie a su hijo, el componente que lista el contenido. 

**112. Solucion**

Inputs, Outputs, Rutas dinamicas.


**113. Guia de estilos - Resumen**

Habla muy por arriba de las guias de estilos que propone angular para nombrar y ordenar las cosas.

    https://angular.dev/style-guide

Resumen del file system y como se organiza la app. 

**114. Codigo fuente**