import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { Routes } from '../../../../_shared/routes';
import { BookmarksService } from '../../../../api/bookmarks.service';
import { Bookmark } from '../../../../models/bookmarks/bookmark';
import { NgIf } from '@angular/common';
import { getListAction } from '../../../../store/bookmarks';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf],
  templateUrl: './edit.page.html',
  styleUrl: './edit.page.scss',
})
export class EditPage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly service = inject(BookmarksService);

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    url: ['', [Validators.required]],
  });

  id: number | undefined;

  bookmark!: Bookmark;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.hasOwnProperty('id')) {
        this.id = params['id'];

        this.getData();
      } else {
        this.router.navigateByUrl(Routes.bookmarks.root);
      }
    });
  }
  
  get title() {
    return this.form.controls.title;
  }
  get url() {
    return this.form.controls.url;
  }

  getData(): void {
    this.service.getById(this.id!).subscribe(data => {
      this.bookmark = data;
      this.initForm();
    })
  }

  initForm(): void {
    this.form.setValue({
      title: this.bookmark?.title || '',
      url: this.bookmark?.url || ''
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { title, url } = this.form.getRawValue();

    this.bookmark.title = title!;
    this.bookmark.url = url!;
    
    // old way - call directly the service (if there is not a defined store & effect to call it)
    this.service.update(this.bookmark!).subscribe(() => {
      this.store.dispatch(getListAction({keyword: ''}))
      this.router.navigateByUrl(Routes.bookmarks.root);
    })
  }
}
