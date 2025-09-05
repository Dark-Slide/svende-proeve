import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../models/profile";
import { User } from "../models/user";




@Injectable({
  providedIn: 'root'
})

export class AuthService {
  static getProfile() {
    throw new Error('Method not implemented.');
  }
  private readonly apiUrl = environment.apiUrl + 'user';
  private userSubject= new BehaviorSubject<User | null>(null);
  private profileSubject = new BehaviorSubject<Profile | null>(null);

  constructor(private http: HttpClient) {}

  public get user(): User | null
  {
        return this.userSubject.value;
  }

  public get profile(): Profile | null
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
            const user = await firstValueFrom(this.http.get<any>(this.apiUrl, {withCredentials: true}));
        }
        catch (error) {
            console.error('Error loading user:', error);
            this.userSubject.next(null);
        }
    }


    loadProfile(): void{
      this.http.get<Profile>(this.apiUrl + "/profile", {withCredentials: true}).subscribe
      (profile => this.profileSubject.next(profile), () => this.profileSubject.next(null));
    }


  login(loginForm: any) {
    return this.http.post<any>(this.apiUrl + "/login", loginForm, {withCredentials: true})
  }

  register(registerForm: any) {
        return this.http.post<any>(this.apiUrl, "/register", {withCredentials: true})
    }

  logOut(): void {
    this.http.get(this.apiUrl + "/logout", {withCredentials: true}).subscribe
    (() => {this.userSubject.next(null); this.profileSubject.next(null)});
  }

  getProfileUser(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl + "/profile", {withCredentials:true});
  }


}
