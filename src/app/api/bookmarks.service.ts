import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '../models/bookmarks/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getFiltered(keyword: string): Observable<Bookmark[]> {
    const queryUrl = `${this.apiUrl}/bookmarks`;
    return this.http.get<Bookmark[]>(queryUrl, this.httpOptions);
  }

  public getById(id: number): Observable<Bookmark> {
    const queryUrl = `${this.apiUrl}/bookmarks/${id}`;
    return this.http.get<Bookmark>(queryUrl, this.httpOptions);
  }
}
