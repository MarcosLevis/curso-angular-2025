import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonballPagesComponent } from './pages/dragonball/dragonball-pages.component';
import { DragonballSuperPagesComponent } from './pages/dragonball-super/dragonball-super-pages.component';

export const routes: Routes = [
    {
        path: '',
        component: CounterPageComponent
    },
    {
        path: 'hero',
        component: HeroPageComponent
    },
    {
        path: 'dragonball',
        component: DragonballPagesComponent
    },
    {
        path: 'dragonball-super',
        component: DragonballSuperPagesComponent
    },
    {
        path: '**',
        redirectTo: '',
    }
];
