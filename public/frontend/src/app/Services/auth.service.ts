import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../models/profile";
import { User } from "../models/user";


/*




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<Profile | null>;
  private profileSubject: BehaviorSubject<Profile | null>;

  constructor(private http: HttpClient) {}

  public get user(): Observable<Profile | null> 
  {
        return this.userSubject.value;
    }
  public get profile(): Observable<Profile | null> 
    {
        return this.profileSubject.value;
    }

    get profile$(): Observable<Profile | null> {
        return this.profileSubject.asObservable();  
    }

    isAuthenticated(): boolean {
        return !!this.userSubject.value;    
    }

    async loadUser(): Promise<void> {
        try {
            const user = await this.getUser().toPromise();
            this.userSubject.next(user);
        }
        catch (error) {
            console.error('Error loading user:', error);
            this.userSubject.next(null);
        }
    }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  getUser(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/auth/profile`);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }
}*/