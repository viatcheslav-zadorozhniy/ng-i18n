import { Routes } from '@angular/router';

// Use function instead of const for proper work of the JIT localization.
export const getRoutes = (): Routes => [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: $localize`:Homepage title for SEO@@homePageSEOTitle:Homepage`,
        loadComponent: () => import('./pages/home').then(mod => mod.HomeComponent),
      },
      {
        path: 'about',
        title: $localize`:About page title for SEO@@aboutPageSEOTitle:About`,
        loadComponent: () => import('./pages/about').then(mod => mod.AboutComponent),
      },
    ],
  },
];
