import { RouteMetadataKey, RouteWithMetadata } from './domain';

// Use function instead of const for proper work of the JIT localization.
export const getRoutes = (): RouteWithMetadata[] => [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: $localize`:Homepage title for SEO@@SEO.homePage.title:Homepage`,
        loadComponent: () => import('./pages/home').then(mod => mod.HomeComponent),
        [RouteMetadataKey]: () => ({
          tags: [
            {
              name: 'description',
              content: $localize`:Homepage description for SEO@@SEO.homePage.description:Homepage meta description`,
            }
          ]
        }),
      },
      {
        path: 'about',
        title: $localize`:About page title for SEO@@SEO.aboutPage.title:About`,
        loadComponent: () => import('./pages/about').then(mod => mod.AboutComponent),
        [RouteMetadataKey]: () => ({
          tags: [
            {
              name: 'description',
              content: $localize`:About page description for SEO@@SEO.aboutPage.description:About page meta description`,
            }
          ]
        }),
      },
    ],
  },
];
