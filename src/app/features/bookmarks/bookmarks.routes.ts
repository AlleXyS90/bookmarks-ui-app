export const BookmarkRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./bookmarks.page').then((m) => m.BookmarksPage),
  },
];
