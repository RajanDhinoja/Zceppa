import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IArtical } from '../models/i-artical';
import { INews } from '../models/i-news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  articles: IArtical[] = [];
  activeTab = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((news: INews) => {
      this.articles = news.articles;
    });
  }
}
