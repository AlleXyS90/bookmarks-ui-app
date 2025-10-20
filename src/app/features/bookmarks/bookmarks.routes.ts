export const BookmarkRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./bookmarks.page').then((m) => m.BookmarksPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/list/list.page').then((m) => m.ListPage),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/create/create.page').then((m) => m.CreatePage),
      },
    ],
  },
];
