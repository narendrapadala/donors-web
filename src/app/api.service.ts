import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  donorCreate(body: any) {
    return this.http.post(`${this.BASE_URL}/donors/create`, body);
  }

  getDonors(refName: any, size: number, page: number) {
    return this.http.get(
      `${this.BASE_URL}/donors/get?reference=${refName}&size=${size}&page=${page}`
    );
  }

  getFunds(ref: any) {
    return this.http.get(`${this.BASE_URL}/donors/fund?reference=${ref}`);
  }
}
