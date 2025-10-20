import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Bookmark } from '../../models/bookmarks/bookmark';
import { BookmarksService } from '../../api/bookmarks.service';
import { AppState } from '../../store';
import * as fromBookmarks from '../../store/bookmarks';

@Component({
  standalone: true,
  selector: 'app-bookmarks',
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    NgFor,
  ],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  filterFormControl = new FormControl('');

  private readonly service = inject(BookmarksService);
  private readonly store = inject(Store<AppState>);

  bookmarks$: Observable<Bookmark[]> = this.store.pipe(select(fromBookmarks.selectBookmarks));

  ngOnInit(): void {
  }

  edit(id: number): void {

  }
}
