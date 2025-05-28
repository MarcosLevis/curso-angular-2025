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

**70. Rutas Hijas**

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


**71. Componentes para el menu lateral**

Modularizamos el navbar del template en diferentes componentes

**72. RouterLink - desde componentes hijos**

Linkeamos los botones del navbar con los componentes correspondientes


    @for (item of menuOptions; track item.route) 
        <a [routerLink]="item.route" routerLinkActive="bg-blue-800" ....
                <div>
                    //<i class="{{ item.icon }}"></i>
                    // cuando se hace uso de una propiedad computada o de un dato enlazado de un servicio o de la propiedad de un componente se recomiend usar [class]
                    <i [class]="item.icon"></i>               
                </div>

**73. Angular Enviroments y Path Alias**

Environments:

Con Angular Cli podemos configurar las variables de entorno con la forma mas comun que a traves de objetos de environments. Tiene dos propiedades, development y produccion

    ng g environments

Nos crea una carpeta y dos objetos .ts de tipo environments, pero tambien hace la modificacion necesaria en angular.js "fileReplacementes: [{...}]"


    "fileReplacements": [
    {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.development.ts"
    }
    ]

Despues lo importamos y lo utilizamos.


Alias Path:

Cuando los path quedan muy largos y feos podemos crearles un alias para que no se vean tan mal. 

En tsconfig.jsn:

    "compilerOptions": {

    "baseUrl": ".",
    "paths":{
        "@environments/*": ["src/environments/*"]
    },

Ahora accediendo a @environment referencias toda la ruta. 

**74. Mostrar imagenes de relleno**

    
    https://flowbite.com/docs/components/gallery/

Creamos componentes de lista y de item de listas. Nos traemos estas imagenes random para darle forma a la app. 


**75. Tarea - input de imagenes**

Hacer un objeto con las imagenes, y pasarselas a los componentes hijos para que muestren las imageness. Prop Drilling creo que se llama...
Segun google: 
    
    "El "prop drilling" en React es una situación en la que las propiedades (props) se pasan a través de componentes intermedios en el árbol de componentes, incluso si esos componentes no las usan directamente, hasta que finalmente llegan al componente que sí las necesita"

Desde trending page, hasta list-item, pasando por list. 

Hice bien la tarea, solo que en el Signal me olvide de poner el .required. Y en el html no puse el [src] entre corchetes

    
    itemUrl = input.required<string>();
    <img class="h-auto max-w-full rounded-lg" [src]="itemUrl()" alt="">

**76. Codigo fuente**

    
    https://github.com/DevTalles-corp/angular-gif-app/tree/fin-seccion-6






