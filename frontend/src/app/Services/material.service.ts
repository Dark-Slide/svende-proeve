import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Materials } from '../models/materials';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private readonly apiUrl = environment.apiUrl + 'materials';   
    constructor(private http: HttpClient) {}

    getAllMaterials(): Observable<Materials[]> {
        return this.http.get<Materials[]>(this.apiUrl);
    }

    createMaterial(material: Materials): Observable<Materials> {
        return this.http.post<Materials>(this.apiUrl, material);
    }

    updateMaterial(materialId: number, material: Materials): Observable<Materials> {
        return this.http.put<Materials>(this.apiUrl+ '/' +materialId, material);
    }

    deleteMaterial(materialId: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/' + materialId);
    }
    
    findMaterialById(materialId: number): Observable<Materials> {
        return this.http.get<Materials>(this.apiUrl + '/' + materialId);
    }
}