import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  AsyncPipe,
  DatePipe,
  KeyValue,
  KeyValuePipe,
  NgFor,
} from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { Bookmark } from '../../../../models/bookmarks/bookmark';
import { isSameDay, toDate } from '../../../../_shared/utils';
import { AppState } from '../../../../store';
import * as fromBookmarks from '../../../../store/bookmarks';
import { Routes } from '../../../../_shared/routes';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    KeyValuePipe,
    DatePipe,
    MatIconModule,
    NgFor,
  ],
  templateUrl: './list.page.html',
  styleUrl: './list.page.scss',
})
export class ListPage {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  // It's not really applicable for such small data,
  // but to exemplify, I used Map instead of defined object or simply array
  bookmarks$: Observable<Map<string, Bookmark[]>>;

  constructor() {
    this.bookmarks$ = this.store
      .pipe(select(fromBookmarks.selectBookmarks))
      .pipe(map((bookmarks) => this.setGroups(bookmarks)));
  }

  setGroups(bookmarks: Bookmark[]): Map<string, Bookmark[]> {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const groups = bookmarks.reduce((acc, bm) => {
      const bmDate = toDate((bm as any).date);
      let key: 'Today' | 'Yesterday' | 'Older' = 'Older';

      if (!isNaN(bmDate.getTime())) {
        if (isSameDay(bmDate, today)) key = 'Today';
        else if (isSameDay(bmDate, yesterday)) key = 'Yesterday';
      }

      if (!acc.has(key)) acc.set(key, []);
      acc.get(key)!.push(bm);
      return acc;
    }, new Map<string, Bookmark[]>());

    const order = ['Today', 'Yesterday', 'Older'];
    const ordered = new Map<string, Bookmark[]>();

    order.forEach((key) => {
      if (groups.has(key)) {
        ordered.set(key, groups.get(key)!);
      }
    });

    return ordered;
  }

  edit(id: number): void {
    this.router.navigateByUrl(Routes.bookmarks.edit(id));
  }

  groupOrder = (
    a: KeyValue<string, unknown>,
    b: KeyValue<string, unknown>,
  ): number => {
    const order = ['Today', 'Yesterday', 'Older'];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };
}
