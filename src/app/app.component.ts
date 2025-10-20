import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { getListAction } from './store/bookmarks/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookmark-app';

  private readonly store = inject(Store);

  constructor() {
    // should be moved in bookmarks router reducer
    this.store.dispatch(getListAction());
  }
  
}
