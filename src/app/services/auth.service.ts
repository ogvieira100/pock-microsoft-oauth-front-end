import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44321/Auth/microsoft-login';  // URL da sua API
  private apiSegurancaUrl = 'https://localhost:44321/Auth/VerificarToken';
  private testUrl = 'https://localhost:44321/WeatherForecast';
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders({
          'Access-Control-Allow-Origin': '*' 
    });
  }

  // constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  //   this.httpHeaders = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*' 
  // });
  // }

  login() {
    return this.http.get(`${this.apiUrl}`, {
      headers: this.httpHeaders
    });
  }

  getLoginUrl() {
    return this.apiUrl;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  public verificarTokenPost(token: any) {
    return this.http.post<any>(`${this.apiSegurancaUrl}VerificarToken/`, token);
  }
}