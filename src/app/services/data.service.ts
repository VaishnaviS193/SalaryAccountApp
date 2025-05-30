import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '../user-info';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'assets/dttb.json';

  constructor(private http: HttpClient) {}

  getAllAgents(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.agents || [])
    );
  }

  getAllAdmins(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.admins || [])
    );
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.users || [])
    );
  }
  getContactUsList(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.contactus || [])
    );
  }

  getAllCountries(): Observable<any[]> {
    return this.http.get<any>('assets/dttb.json').pipe(
      map((data) => data.countries || [])
    );
  }

  getAllDocuments(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.documents || [])
    );
  }
  
  getAllHomeTypes(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((data) => data.homeTypes || [])
    );
  }
  
  searchUsers(query: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this.baseUrl}`).pipe(
      map((users) =>
        users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(query.toLowerCase()) ||
            user.lastname.toLowerCase().includes(query.toLowerCase()) ||
            user.middlename?.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  getUserById(userId: string): Observable<UserInfo | undefined> {
    return this.getAllUsers().pipe(
      map((users) => users.find((user) => user.id === userId))
    );
  }

  updateUser(user: any): Observable<any> {
    console.log('Updating User:', user);
    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/users/${userId}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${'http://localhost:3000'}/users`, user);
  }

  addAgent(agent: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/agents', agent);
  }

  saveContactUs(contactus: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/contactus', contactus);
  }
}
