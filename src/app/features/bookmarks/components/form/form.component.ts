import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Bookmark } from '../../../../models/bookmarks/bookmark';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form',
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
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input() bookmark!: Bookmark;
  @Input() buttonLabel!: string;

  private readonly fb = inject(FormBuilder);

  @Output() private readonly onSubmit = new EventEmitter<Bookmark>();

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    url: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form.setValue({
      title: this.bookmark?.title || '',
      url: this.bookmark?.url || '',
    });
  }

  get title() {
    return this.form.controls.title;
  }
  get url() {
    return this.form.controls.url;
  }

  submit(): void {
    if (this.form.invalid) return;
    const { title, url } = this.form.getRawValue();

    if (!title || !url) {
      return;
    }

    this.onSubmit.emit({
      ...this.bookmark,
      title: title,
      url: url,
    });
  }
}
