import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Colours } from "../models/colours";

@Injectable({
  providedIn: 'root'
})
export class ColourService {
    private readonly apiUrl = environment.apiUrl + 'colours';
    constructor(private http: HttpClient) {}

    getAllColours(): Observable<Colours[]> {
        return this.http.get<Colours[]>(this.apiUrl);
    }
    findColourById(colourId: number): Observable<Colours> {
        return this.http.get<Colours>(this.apiUrl + '/' + colourId);
    }
    createColour(colour: Colours): Observable<Colours> {
        return this.http.post<Colours>(this.apiUrl, colour);
    }
    updateColour(colourId: number, colour: Colours): Observable<Colours> {
        return this.http.put<Colours>(this.apiUrl+ '/' +colourId, colour);
    }
    deleteColour(colourId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + colourId);
    }
}