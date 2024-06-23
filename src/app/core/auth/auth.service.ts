import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, take } from 'rxjs';
import { IEmployee } from '../../feature/employee/employee';
import { TokenService } from './token.service';

export interface ISigninData {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL: string = 'http://localhost:8080';
  private employee = signal<IEmployee | null>(null);
  private http: HttpClient = inject(HttpClient);
  private tokenService = inject(TokenService);

  constructor() {
    if (this.tokenService.hasToken()) {
      this.decodeToken();
    }
  }

  public signin(siginData: ISigninData): Observable<IEmployee> {
    const url = `${this.API_URL}/auth/signin`;

    return this.http.post<IEmployee>(url, siginData).pipe(retry(3), take(1));
  }

  public saveToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeToken();
  }

  public isSignedIn(): boolean {
    return this.tokenService.hasToken();
  }

  public getEmployee() {
    return this.employee.asReadonly();
  }

  private decodeToken() {
    try {
      const employee: IEmployee = JSON.parse(this.tokenService.getToken());
      this.employee.set(employee);
    } catch (e) {
      console.error(e);
    }
  }

  signout() {
    this.tokenService.removeToken();
  }
}
