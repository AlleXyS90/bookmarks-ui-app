import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

import { getListAction } from '../../../../store/bookmarks/actions';

@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  private readonly store = inject(Store);

  filterFormControl = new FormControl('');

  ngOnInit(): void {
    this.filterFormControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe((value) => {
        this.store.dispatch(
          getListAction({ keyword: value?.toLowerCase() || '' }),
        );
      });
  }
}
