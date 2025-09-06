import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"; 
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Conditions } from "../models/conditions";

@Injectable({
    providedIn: 'root'
})
export class ConditionsService {
    private readonly apiUrl = environment.apiUrl + 'conditions';
    constructor(private http: HttpClient) {}

    getAllConditions(): Observable<Conditions[]> {
        return this.http.get<Conditions[]>(this.apiUrl);
    }

    getConditionById(id: number): Observable<Conditions> {
        return this.http.get<Conditions>(`${this.apiUrl}/${id}`);
    }

    createCondition(condition: Conditions): Observable<Conditions> {
        return this.http.post<Conditions>(this.apiUrl, condition);
    }

    updateCondition(id: number, condition: Conditions): Observable<Conditions> {
        return this.http.put<Conditions>(`${this.apiUrl}/${id}`, condition);
    }

    deleteCondition(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}