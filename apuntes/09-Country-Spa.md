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


Aplicamos el componente de footer a toda la aplicacion en app.component.html