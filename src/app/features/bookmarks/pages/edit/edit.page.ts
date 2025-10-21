import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap, tap } from 'rxjs';

import { Routes } from '../../../../_shared/routes';
import { BookmarksService } from '../../../../api/bookmarks.service';
import { Bookmark } from '../../../../models/bookmarks/bookmark';
import { getListAction } from '../../../../store/bookmarks';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [AsyncPipe, NgIf, FormComponent, MatCardModule],
  templateUrl: './edit.page.html',
  styleUrl: './edit.page.scss',
})
export class EditPage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly service = inject(BookmarksService);

  bookmark$!: Observable<Bookmark>;

  constructor() {
    this.bookmark$ = this.activatedRoute.params.pipe(
      map((params) => params['id']),
      tap((id) => {
        if (!id) {
          this.router.navigateByUrl(Routes.bookmarks.root);
        }
      }),
      switchMap((id) => this.service.getById(id)),
    );
  }

  submit(bookmark: Bookmark): void {
    // old way - call directly the service (if there is not a defined store & effect to call it)
    this.service.update(bookmark!).subscribe(() => {
      this.store.dispatch(getListAction({ keyword: '' }));
      this.router.navigateByUrl(Routes.bookmarks.root);
    });
  }
}
