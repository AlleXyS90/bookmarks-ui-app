import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Routes } from '../../../../_shared/routes';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { addAction } from '../../../../store/bookmarks';
import { Bookmark } from '../../../../models/bookmarks/bookmark';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './create.page.html',
  styleUrl: './create.page.scss',
})
export class CreatePage {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    url: ['', [Validators.required]],
  });

  get title() {
    return this.form.controls.title;
  }
  get url() {
    return this.form.controls.url;
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { title, url } = this.form.getRawValue();

    if (!title || !url) {
      return;
    }

    const bookmark: Bookmark = {
      id: Math.floor(Math.random() * 10000) + 1,
      title: title,
      url: url,
      date: new Date(),
    };
    this.store.dispatch(addAction({ bookmark: bookmark }));
    this.form.reset();
  }

  add(): void {
    this.router.navigateByUrl(Routes.bookmarks.root);
  }
}
