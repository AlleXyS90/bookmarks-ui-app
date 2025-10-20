import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Bookmark } from '../../models/bookmarks/bookmark';
import { BookmarksService } from '../../api/bookmarks.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppState } from '../../store';
import * as fromBookmarks from '../../store/bookmarks';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MatIconModule,
    NgFor,
    ToolbarComponent
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
