import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, switchMap, tap, retry } from 'rxjs/operators';
import { Post } from '../components/models';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  constructor(private http: HttpClient) {}

  getSimulatedPosts(): Observable<Post[]> {
    return timer(2000).pipe(
      switchMap(() => {
        const randomOutcome = Math.random();
        if (randomOutcome < 0.33) {
          return throwError(() => new Error('Simulated network error'));
        } else if (randomOutcome < 0.66) {
          return of([]);
        } else {
          return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        }
      }),
      tap(() => console.log('Simulated request executed')),
      retry(3),
      catchError(err => {
        console.error('Error occurred during simulated request:', err);
        return of([]);
      })
    );
  }
}
