import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './bookmarks.page.html',
  styleUrl: './bookmarks.page.scss',
})
export class BookmarksPage {}
