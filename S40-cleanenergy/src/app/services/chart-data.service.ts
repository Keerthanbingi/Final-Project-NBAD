import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = environment.chartUrl;
  private readonly JWT_TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  getSummaryChart(): Observable<any> {
    const token = localStorage.getItem(this.JWT_TOKEN_KEY);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/summary`, {headers});
  }

  getReportsChart(): Observable<any> {
    const token = localStorage.getItem(this.JWT_TOKEN_KEY);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/report`, {headers});
  }
}