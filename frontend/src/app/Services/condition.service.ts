import { Injectable } from "@angular/core"; 
import { Observable, of } from "rxjs";
import { Conditions } from "../models/conditions";

@Injectable({
    providedIn: 'root'
})
export class ConditionsService {
 
    private conditions: Conditions[] = [
        { id: 1, name: 'Ny', products: [] },
        { id: 2, name: 'Brugt', products: [] }
    ];


    constructor() {}

    getAllConditions(): Observable<Conditions[]> {
        return of(this.conditions);
    }

    
}