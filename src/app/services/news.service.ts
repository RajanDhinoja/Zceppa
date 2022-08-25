import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INews } from '../models/i-news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<INews> {
    return this.http.get(
      `https://newsapi.org/v2/everything?q=Apple&from=2022-08-25&sortBy=popularity&apiKey=df15e67151ee471d99452c0653715792&pageSize=20`
    ) as Observable<INews>;
  }
}
