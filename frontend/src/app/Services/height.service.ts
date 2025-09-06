import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Height } from "../models/height";

@Injectable({
    providedIn: 'root'
})
export class HeightService {
    private readonly apiUrl = environment.apiUrl + 'heights';
    constructor(private http: HttpClient) {}
    getAllHeights(): Observable<Height[]> {
        return this.http.get<Height[]>(this.apiUrl);
    }
    findHeightById(heightId: number): Observable<Height> {
        return this.http.get<Height>(this.apiUrl + '/' + heightId);
    }
    createHeight(height: Height): Observable<Height> {
        return this.http.post<Height>(this.apiUrl, height);
    }
    updateHeight(heightId: number, height: Height): Observable<Height> {
        return this.http.put<Height>(this.apiUrl+ '/' +heightId, height);
    }
    deleteHeight(heightId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + heightId);
    }
}


