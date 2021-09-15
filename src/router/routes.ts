import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('src/layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainPage.vue') },
      {
        path: 'cadastroClientePage',
        component: () =>
          import('src/components/cadastro/CadastroClientePage.vue')
      },
      {
        path: 'pacotesPage',
        component: () => import('src/components/pacotes/PacotesPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
