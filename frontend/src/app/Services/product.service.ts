import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import {Observable, map, switchMap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";
import {Profile} from "../models/profile";


@Injectable({
  providedIn: "root",
})

export class ProductService {


    private readonly apiUrl = environment.apiUrl + 'products';
    constructor(private http: HttpClient) {}

    csrf() {
      return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
    }

    returnXSRFToken(): any {
      const name = 'XSRF-TOKEN';
      const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : '';
    }

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    public getFeaturedProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(environment.apiUrl + 'frontpage');
    }

    public getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + '/'+ id);
    }
    public createProduct(product: FormData): Observable<Product> {
      return this.csrf().pipe(
        switchMap(() =>
          this.http.post<any>(this.apiUrl, product, { withCredentials: true, headers: new HttpHeaders({ 'X-XSRF-TOKEN': this.returnXSRFToken() }) })
        )
      );
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
