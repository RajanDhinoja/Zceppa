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
  interestingTime: string[] = [];
  res = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((news: INews) => {
      this.articles = news.articles;
    });

    // please open the console for the output

    let startTime = '15:15:00';
    let endTime = '18:15:12';
    this.calculateInterestingPoints(startTime, endTime);
    console.log('interestingTime', this.interestingTime);
    console.log('count', this.res);
  }

  calculateInterestingPoints(startTime: string, endTime: string) {
    let st = startTime.split(':');
    let h1 = st[0];
    let m1 = st[1];
    let s1 = st[2];

    let h2 = endTime.substring(0, 2);
    let m2 = endTime.substring(3, 2);
    let s2 = endTime.substring(6, 2);

    let flag1: boolean = false;
    let i = parseInt(h1);
    let j = parseInt(m1);
    let k = parseInt(s1);

    for (;;) {
      for (;;) {
        for (;;) {
          if (
            (i >= parseInt(h2) && j > parseInt(m2)) ||
            (i >= parseInt(h2) && j >= parseInt(m2) && k > parseInt(s2)) ||
            i > 23 ||
            j > 59 ||
            k > 59
          ) {
            flag1 = true;
            break;
          }

          let temp = '';
          if (i < 10) {
            temp = '0' + i.toString() + ':';
          } else {
            temp = i.toString() + ':';
          }

          if (j < 10) {
            temp += '0';
          }
          temp += j.toString() + ':';
          if (k < 10) {
            temp += '0';
          }
          temp += k.toString();

          if (this.calculateDistinct(temp) <= 2) {
            this.res++;
            this.interestingTime.push(temp);
          }

          if (temp == endTime) {
            flag1 = true;
            break;
          }

          if (k >= 59) {
            j++;
            k = 0;
          } else {
            k++;
          }

          if (j > 59) {
            i++;
            j = 0;
          }
        }

        if (flag1 || (i >= parseInt(h2) && j > parseInt(m2))) {
          flag1 = true;
          break;
        }
        if (j >= 59) {
          i++;
          j = 0;
        } else {
          j++;
        }
      }
      if (flag1 || i > parseInt(h2)) {
        break;
      }
      if (i == 24) {
        break;
      } else {
        i++;
      }
    }
  }

  calculateDistinct(time: string) {
    let charArray = Array.from(time);
    let distinct = [];
    for (let i = 0; i < charArray.length; i++) {
      if (charArray[i] != ':') {
        distinct.push(charArray[i]);
      }
    }
    var set = new Set(distinct);
    return set.size;
  }
}
