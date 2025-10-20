import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
    let queryUrl = `${this.apiUrl}/bookmarks`;

    // apply filters
    // if (keyword) {
    //   queryUrl += `?title_like=${keyword}`;
    // }

    // issue: json-server {field}_like is ignored - can not apply filtering

    return this.http.get<Bookmark[]>(queryUrl, this.httpOptions).pipe(
      map((items) => {
        // apply filters to the response, as a temporary fix
        if (!keyword) {
          return items;
        }

        return items.filter((x) => x.title.toLowerCase().includes(keyword));
      }),
    );
  }

  public getById(id: number): Observable<Bookmark> {
    const queryUrl = `${this.apiUrl}/bookmarks/${id}`;
    return this.http.get<Bookmark>(queryUrl, this.httpOptions);
  }
}
