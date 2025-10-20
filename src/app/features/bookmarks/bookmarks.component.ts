import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { BookmarksService } from '../../api/bookmarks.service';
import { Observable } from 'rxjs';

import { Bookmark } from '../../models/bookmarks/bookmark';

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

  bookmarks$: Observable<Bookmark[]> = this.service.getFiltered('');

  ngOnInit(): void {
  }

  edit(id: number): void {

  }
}
