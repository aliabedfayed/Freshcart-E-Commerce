import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + "auth/signup", data)
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + "auth/signin", data)
  }

  decodeToken() {
    try {
      if (typeof localStorage != "undefined") {
        const decoded = jwtDecode(localStorage.getItem("authToken")!);
        console.log(decoded);
      }
    } catch {
      this.logout()
    }
  }

  saveToken(token: string): void {
    if (typeof localStorage != "undefined")
      localStorage.setItem("authToken", token)
  }

  getToken(): string | null {
    if (typeof localStorage != "undefined")
      return localStorage.getItem('authToken')
    return null
  }

  isAuthenticated(): boolean {
    if (typeof localStorage != "undefined")
      return !!localStorage.getItem('authToken')
    return false
  }
  logout(): void {
    localStorage.clear()
    this.router.navigate(["/login"])
  }
}
