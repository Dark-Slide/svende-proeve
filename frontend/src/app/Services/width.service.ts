import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Width } from "../models/width";

@Injectable({
    providedIn: 'root'
})
export class WidthService {
    private readonly apiUrl = environment.apiUrl + 'width';
    constructor(private http: HttpClient) {}

    getAllWidths(): Observable<Width[]> {
        return this.http.get<Width[]>(this.apiUrl);
    }

    findWidthById(widthId: number): Observable<Width> {
        return this.http.get<Width>(this.apiUrl + '/' + widthId);
    }

    createWidth(width: Width): Observable<Width> {
        return this.http.post<Width>(this.apiUrl, width);
    }

    updateWidth(widthId: number, width: Width): Observable<Width> {
        return this.http.put<Width>(this.apiUrl+ '/' +widthId, width);
    }
    
    deleteWidth(widthId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + widthId);
    }
}