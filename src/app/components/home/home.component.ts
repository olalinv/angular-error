import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  localError(): void {
    throw Error('The app component has thrown an error!');
  }

  failingRequest(): void {
    this.http.get('https://httpstat.us/404?sleep=2000').toPromise();
  }

  successfulRequest(): void {
    this.http.get('https://httpstat.us/200?sleep=2000').toPromise();
  }
}
