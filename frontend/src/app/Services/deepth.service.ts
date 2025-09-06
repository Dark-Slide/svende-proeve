import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Deepth } from "../models/deepth";

@Injectable({
    providedIn: 'root'
})
export class DeepthService {
    private readonly apiUrl = environment.apiUrl + 'deepth';
    constructor(private http: HttpClient) {}
    getAllDeepths(): Observable<Deepth[]> {
        return this.http.get<Deepth[]>(this.apiUrl);
    }
    findDeepthById(deepthId: number): Observable<Deepth> {
        return this.http.get<Deepth>(this.apiUrl + '/' + deepthId);
    }
    createDeepth(deepth: Deepth): Observable<Deepth> {
        return this.http.post<Deepth>(this.apiUrl, deepth);
    }
    updateDeepth(deepthId: number, deepth: Deepth): Observable<Deepth> {
        return this.http.put<Deepth>(this.apiUrl+ '/' +deepthId, deepth);
    }
    deleteDeepth(deepthId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + deepthId);
    }
}