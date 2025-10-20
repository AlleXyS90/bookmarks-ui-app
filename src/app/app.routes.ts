import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./features/bookmarks/bookmarks.component').then(
        (m) => m.BookmarksComponent,
      ),
  },
  {
    // TODO - should redirect to homepage (not created)
    path: '**',
    redirectTo: 'bookmarks',
  },
];
