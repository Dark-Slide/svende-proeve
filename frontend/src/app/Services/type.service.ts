import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Types } from "../models/types";


@Injectable({
    providedIn: 'root'
})
export class TypeService {
    private readonly apiUrl = environment.apiUrl + 'types';
    constructor(private http: HttpClient) {}
    getAllTypes(): Observable<Types[]> {
        return this.http.get<Types[]>(this.apiUrl);
    }
    findTypeById(typeId: number): Observable<Types> {
        return this.http.get<Types>(this.apiUrl + '/' + typeId);
    }
    createType(type: Types): Observable<Types> {
        return this.http.post<Types>(this.apiUrl, type);
    }
    updateType(typeId: number, type: Types): Observable<Types> {
        return this.http.put<Types>(this.apiUrl+ '/' +typeId, type);
    }
    deleteType(typeId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + typeId);
    }
}