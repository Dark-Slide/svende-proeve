import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';



@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private readonly apiUrl = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl+ '/' +categoryId, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + categoryId);
  }

  findCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(this.apiUrl + '/' + categoryId);
  }
}