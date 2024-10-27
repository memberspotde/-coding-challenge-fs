import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // Singleton service available app-wide
})
export class PeopleService {
    private baseUrl = '/api'; // API base URL

    constructor(private http: HttpClient) { }

    // Fetches a list of people with pagination
    getPeople(page: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/people?page=${page}`);
    }
}
