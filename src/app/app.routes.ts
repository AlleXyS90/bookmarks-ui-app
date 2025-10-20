import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./features/bookmarks/bookmarks.routes').then(
        (m) => m.BookmarkRoutes,
      ),
  },
  {
    // TODO - should redirect to homepage (not created)
    path: '**',
    redirectTo: 'bookmarks',
  },
];
