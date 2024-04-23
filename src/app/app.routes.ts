import { RouteMetadataKey, RouteWithMetadata } from './domain';

// Use function instead of const for proper work of the JIT localization.
export const getRoutes = (): RouteWithMetadata[] => {
  const routesMetadata = {
    home: {
      title: $localize`:Homepage title for SEO@@SEO.homePage.title:Homepage`,
      description: $localize`:Homepage description for SEO@@SEO.homePage.description:Homepage meta description`,
    },
    about: {
      title: $localize`:About page title for SEO@@SEO.aboutPage.title:About`,
      description: $localize`:About page description for SEO@@SEO.aboutPage.description:About page meta description`,
    }
  };

  return [
    {
      path: '',
      children: [
        {
          path: '',
          pathMatch: 'full',
          title: routesMetadata.home.title,
          loadComponent: () => import('./pages/home').then(mod => mod.HomeComponent),
          [RouteMetadataKey]: {
            tags: [
              {
                name: 'description',
                content: routesMetadata.home.description,
              },
              {
                property: 'og:title',
                content: routesMetadata.home.title,
              },
              {
                property: 'og:description',
                content: routesMetadata.home.description,
              },
            ]
          },
        },
        {
          path: 'about',
          title: routesMetadata.about.title,
          loadComponent: () => import('./pages/about').then(mod => mod.AboutComponent),
          [RouteMetadataKey]: {
            tags: [
              {
                name: 'description',
                content: routesMetadata.about.description,
              },
              {
                property: 'og:title',
                content: routesMetadata.about.title,
              },
              {
                property: 'og:description',
                content: routesMetadata.about.description,
              },
            ]
          },
        },
      ],
    },
  ];
};
