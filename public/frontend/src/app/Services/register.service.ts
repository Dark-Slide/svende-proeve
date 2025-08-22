import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    private readonly apiUrl = environment.apiUrl + '/auth/register';
    
    constructor(private http: HttpClient) {}
    
    register(user: { email: string; password: string; username: string }): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }

}