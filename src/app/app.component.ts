import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Post} from "../components/models";
import {catchError, delayWhen, map, of, retryWhen, shareReplay, tap, throwError, timer} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rxjsErrorHandling';
  posts: Post[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const https$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

    // RxJs subscribe and error callbacks
    https$.subscribe(
      res => {
        console.log(res);
        this.posts = res;
      },
      error => console.log(error),
      () => console.log('Completed')
    )



    // The catchError Operator

    // https$.pipe(
    //   catchError(err => of([])),
    // ).subscribe(
    //   res => console.log('HTTP response', res),
    //   err => console.log('HTTP Error', err),
    //   () => console.log('HTTP request completed.')
    // )





    // The Catch and Rethrow Strategy

    // https$.pipe(
    //   catchError(err => {
    //     console.log('Handling error locally an rethrowing it ...', err)
    //     return throwError(err)
    //   }),
    // ).subscribe(
    //   res => console.log('HTTP response', res),
    //   err => console.log('HTTP Error', err),
    //   () => console.log('HTTP request completed.')
    // )





    // Immediate Retry Strategy

    // https$.pipe(
    //   tap(() => console.log("HTTP request executed")),
    //   map(res => Object.values(res)),
    //   shareReplay(),
    //   retryWhen(errors => {
    //     return errors
    //       .pipe(
    //         tap(() => console.log('retrying...'))
    //       );
    //   })
    // ).subscribe(
    //   res => console.log('HTTP response', res),
    //   err => console.log('HTTP Error', err),
    //   () => console.log('HTTP request completed.')
    // );





    // Delayed Retry Strategy implementation

    // https$.pipe(
    //   tap(() => console.log("HTTP request executed")),
    //   map((res: any) => Object.values(res)),
    //   shareReplay(),
    //   retryWhen(errors => {
    //     return errors
    //       .pipe(
    //         delayWhen(() => timer(2000)),
    //         tap(() => console.log('retrying...'))
    //       );
    //   })
    // ).subscribe(
    //   (res: any) => console.log('HTTP response', res),
    //   (err: any) => console.log('HTTP Error', err),
    //   () => console.log('HTTP request completed.')
    // );
  }
}
