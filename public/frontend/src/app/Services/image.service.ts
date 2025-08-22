import { Image } from "../models/image";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  private readonly apiUrl = environment.apiUrl + 'images';

  constructor(private http: HttpClient) {}
  
    getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
    }

    createImage(image: Image): Observable<Image> {
    return this.http.post<Image>(this.apiUrl, image);
    }

    updateImage(imageId: number, image: Image): Observable<Image> {
    return this.http.put<Image>(this.apiUrl + '/' + imageId, image);
    }

    deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${imageId}`);
    }

     findImageById(imageId: number): Observable<Image> {
    return this.http.get<Image>(this.apiUrl+ '/' + imageId);
    }
}