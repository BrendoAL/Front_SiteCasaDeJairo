import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  // URL base da sua API Spring Boot
  private baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  createPost(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, data);
  }
}
