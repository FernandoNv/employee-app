import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDepartment } from './department';
import { catchError, Observable, of, retry, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly API_URL: string = 'http://localhost:8080';
  private http: HttpClient = inject(HttpClient);

  get(): Observable<IDepartment[]> {
    const url = `${this.API_URL}/departments`;

    return this.http.get<IDepartment[]>(url).pipe(
      retry(3),
      shareReplay(),
      catchError(error => {
        console.log(error);

        return of([] as IDepartment[]);
      })
    );
  }
}
