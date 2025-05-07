import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'assets/dttb.json'; // Path to dttb.json

  constructor(private http: HttpClient) {}

  // Fetch all agents
  getAllAgents(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.agents) // Extract agents from the response
    );
  }

  // Fetch all countries
  getAllCountries(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.countries) // Extract countries from the response
    );
  }

  // Fetch all states
  getAllStates(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.states) // Extract states from the response
    );
  }

  // Fetch all cities
  getAllCities(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.citys) // Extract cities from the response
    );
  }

  // Fetch all documents
  getAllDocuments(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.documents) // Extract documents from the response
    );
  }

  // Fetch all home types
  getAllHomeTypes(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.homeTypes) // Extract home types from the response
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${'http://localhost:3000'}/users`, user);
  }
}
