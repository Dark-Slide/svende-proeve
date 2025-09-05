import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})

export class ProductService {
    
    
    private readonly apiUrl = environment.apiUrl + 'Products'; 
    constructor(private http: HttpClient) {}

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
    public getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + '/'+ id);
    }
    public createProduct(product: FormData): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }
    public updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(this.apiUrl+'/' + product.id, product);
    }
    public deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(this.apiUrl+ '/'+ id);
    }
    
    public getByProfileId(profileId: number): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + '/profile/' + profileId);
    }
    

  
}