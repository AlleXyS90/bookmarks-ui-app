import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';

import { addAction } from '../../../../store/bookmarks';
import { Bookmark } from '../../../../models/bookmarks/bookmark';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatCardModule,
    FormComponent
  ],
  templateUrl: './create.page.html',
  styleUrl: './create.page.scss',
})
export class CreatePage {
  private readonly store = inject(Store);

  default: Bookmark = {
    id: Math.floor(Math.random() * 10000) + 1,
    title: '',
    url: '',
    date: new Date()
  };

  submit(bookmark: Bookmark): void {
    this.store.dispatch(addAction({ bookmark: bookmark }));
  }
}
