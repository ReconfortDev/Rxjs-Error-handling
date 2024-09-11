import { Component, OnInit } from '@angular/core';
import { Post } from '../components/models';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostServiceService } from "../service/post-service.service";
import { RouterOutlet } from "@angular/router";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjsErrorHandling';
  posts: Post[] = [];
  loading = false;
  errorMessage = '';
  retryCount = 0;

  constructor(private postService: PostServiceService) {}

  ngOnInit() {}

  getPost(): void {
    this.loading = true;
    this.errorMessage = '';
    this.posts = [];
    this.retryCount = 0;

    this.postService.getSimulatedPosts().pipe(
      tap({
        next: () => {
          this.loading = false;
          this.errorMessage = '';
        },
        error: () => {
          this.retryCount++;
        }
      }),
      catchError(err => {
        this.loading = false;
        if (err.status) {
          switch (err.status) {
            case 404:
              this.errorMessage = 'Resource not found (404). Please check the URL.';
              break;
            case 500:
              this.errorMessage = 'Server error (500). Please try again later.';
              break;
            default:
              this.errorMessage = `An error occurred: ${err.message}`;
              break;
          }
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
        return of([]);
      })
    ).subscribe(
      (res: Post[]) => {
        if (res.length > 0) {
          this.posts = res;
        } else {
          this.errorMessage = 'No posts available.';
        }
      },
      (err) => {
        this.errorMessage = 'An error occurred while fetching posts.';
        console.log('HTTP Error:', err);
      },
      () => {
        console.log('HTTP request completed.');
      }
    );
  }
}
