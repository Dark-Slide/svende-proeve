import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable, firstValueFrom, switchMap, finalize} from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../models/profile";
import { User } from "../models/user";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly apiUrl = environment.apiUrl + 'user';
  private readonly apiUrlProfile = environment.apiUrl + 'profile';
  private userSubject= new BehaviorSubject<User | null>(null);
  private profileSubject = new BehaviorSubject<Profile | null>(null);

  constructor(private http: HttpClient) {}

  csrf() {
    return this.http.get(`${this.apiUrlProfile}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  public get user(): User | null
  {
        return this.userSubject.value;
  }

  public get profile(): Profile | null
    {
        console.log(this.userSubject.value);
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
        // 1) XSRF-TOKEN
        await firstValueFrom(
          this.http.get(`${this.apiUrlProfile}/sanctum/csrf-cookie`, { withCredentials: true })
        );
        

        const user = await firstValueFrom(
          this.http.get<any>(this.apiUrl, { withCredentials: true }) // this.apiUrl -> e.g. https://api.example.com/api/user
          
        );

        this.userSubject.next(user ?? null);

        // Load profile after user is loaded
        this.loadProfile();

      } catch (error) {
        console.error('Error loading user:', error);
        this.userSubject.next(null);
      }

      

    }


    loadProfile(): void{
      this.http.get<Profile>(this.apiUrlProfile , {withCredentials: true}).subscribe
      (profile => this.profileSubject.next(profile), () => this.profileSubject.next(null));
    }



  login(loginForm: any) {
    return this.csrf().pipe(
      switchMap(() =>
        this.http.post<any>(this.apiUrlProfile + "/login", loginForm, {withCredentials: true, headers: new HttpHeaders({ 'X-XSRF-TOKEN': this.returnXSRFToken() }),})
      )
    );
  }

  register(registerForm: any) {
    return this.csrf().pipe(
      switchMap(() =>
        this.http.post<any>(this.apiUrlProfile + '/register', registerForm, { withCredentials: true, headers: new HttpHeaders({ 'X-XSRF-TOKEN': this.returnXSRFToken() }) })
      )
    );
  }

  logOut(): void {
    this.http.get(`${this.apiUrlProfile}/sanctum/csrf-cookie`, { withCredentials: true }).pipe(
      switchMap(() =>
        this.http.post(`${this.apiUrlProfile}/logout`, this.userSubject, { withCredentials: true, headers: new HttpHeaders({ 'X-XSRF-TOKEN': this.returnXSRFToken() }) })
      ),
      finalize(() => {
        this.userSubject.next(null);
        this.profileSubject.next(null);
      })
    ).subscribe({ error: err => console.error('Logout error:', err) });
  }

  returnXSRFToken(): any {
    const name = 'XSRF-TOKEN';
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }

  getProfileUser(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrlProfile + "/profile", {withCredentials:true});
  }

  loadProfileAlone(): void {
    this.http.get<Profile>(this.apiUrlProfile, {withCredentials: true}).subscribe
    (profile => this.profileSubject.next(profile), () => this.profileSubject.next(null));
  }


}
