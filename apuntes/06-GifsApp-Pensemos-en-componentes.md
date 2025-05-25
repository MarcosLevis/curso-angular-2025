**65. Introduccion**

Nos vamos a enfocar en hacer una aplicacion real de Angular que liste gifs con Tailwind, LazyLoad, Rutas hijas, rutas principales, variables de entorno etc. Una arquitectura ordenada, carpetas y archivos. Despues lo vamos a reutlizar.

**66. Temas Puntuales**

Esta sección es muy importante porque nos dará las bases de lo que es trabajar en Angular diariamente.

Puntualmente veremos:

1. LazyLoad

2. Separación de rutas

3. Rutas hijas

4. Variables de entorno de Angular

5. Angular CLI

6. inputs

7. Comunicación entre componentes

8. RouterOutlets anidados

9. Señales

10. Propiedades de componentes

11. Tailwind

12. Y más

La idea es ir creando un pequeño dashboard administrativo para mostrar Gifs que traeremos desde un API, aunque eso es tema de la siguiente sección, aquí empezaremos a dejar las bases y la estructura del mismo.

**67. Demostracion**

Hace una muestra de como va a ser la app que vamos a hacer en esta seccion. El file system, feature moduls (nos permiten encapsular por funcionalidad la aplicacion). No Modules como antes se usaba en Angular. Hoy en dia los componentes son modules en si ya que por defecto son standalone. 


**68. Demostracion**

La voy a hacer en un repositorio distinto

    https://tailwindcss.com/

    https://www.creative-tim.com/twcomponents/component/dashboard-navigation


Instalamos tailwind como dice la pagina oficial y nos compiamos un template.

**69. Pensemos en componentes**

Creamos una carpeta para todo lo relacionado con los gifs. Como ya todos los componentes son por defecto standalone ya no se crean los modules. Creamos un nuevo componente usando Angular Schematics. 

Luego crea una ruta, donde en vez de poner Component le pone una funcion. Dice que cuando pones "component:" hace que no haya carga perezosa, ninguna separacion de codigo y sera parte del bundle principal y esta bien porque esta ruta va a hacer visible, es el navbar. Ahora, si queremos que no se cargue bajo demanda hasta que alguien pueda entrar a la pagina se puede optimizar el bundle utilizadn loadComponent: () haciendo un lazy load. Es la importacion por defecto de la manera perezosa, bajo demanda carga el pedazo de script.


    import { Routes } from '@angular/router';
    export const routes: Routes = [
        {
            path:"dashboard",
            loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component')
        }
    ];

    //Para que la sintaxis funcione hay que agregarle el default a la class del componente
    export default class DashboardPageComponent { }

70. Rutas Hijas

Vamos a trabajar con rutas hijas. Osea que las rutas queden dashboard/search o dashboard/trending. Basicamente a una ruta se le agrega un array de childen[]


    {
        path:"dashboard",
        loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
        
        children: [
            {
                path:"trending",
                loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
            }
        ]
    }