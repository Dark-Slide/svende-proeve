import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Profile } from "../models/profile";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly apiUrl = environment.apiUrl + 'profile';

  constructor(private http: HttpClient) {}

  getAllProfiles(): Observable<Profile[]>{
    return this.http.get<Profile[]>(this.apiUrl)
  }

  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }

  updateProfile(profileId:number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(this.apiUrl + '/' + profileId, profile);
  }

  findProfileById(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl + '/' + profileId);
  }
  deleteProfileById(profileId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + profileId);
  }

  getLoggedInProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl + '/me');
  }

}
