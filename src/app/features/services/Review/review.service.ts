import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { PostReviewData } from '../../interfaces/Reviews/postReviewData.interface copy';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getReviews(id: number) {
    return this.http.get(this.apiUrl + '/reviews/' + id);
  }
  postReview(data: PostReviewData) {
    return this.http.post(this.apiUrl + '/reviews', data);
  }
  editReview(id: number, content: string) {
    return this.http.put(this.apiUrl + '/reviews/' + id,{'content':content});
  }
  deleteReview(id: number) {
    return this.http.delete(this.apiUrl + '/reviews/' + id);
  }
}
