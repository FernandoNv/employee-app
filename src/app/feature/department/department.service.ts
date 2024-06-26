import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  retry,
  shareReplay,
  Subject,
  take,
} from 'rxjs';
import { IDataAPI } from '../../shared/data-api/data-api';
import { IDepartment, IPosition } from './department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly API_URL: string = 'http://localhost:8080';
  private http: HttpClient = inject(HttpClient);

  private loading$ = new Subject<boolean>();
  private data$ = new BehaviorSubject<IDepartment[]>([] as IDepartment[]);

  public create(data: IDepartment): Observable<IDataAPI<IDepartment>> {
    console.log(data);
    const url = `${this.API_URL}/departments`;

    return this.http.post<IDepartment>(url, data).pipe(
      take(1),
      map(next => {
        const data: IDataAPI<IDepartment> = {
          data: next,
        };

        return data;
      }),
      catchError(error => {
        console.log(error);
        const emptyData: IDataAPI<IDepartment> = {
          message: 'Erro na requisição',
        };

        return of(emptyData);
      })
    );
  }

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

  public formatDataSave(rawValue: any): IDepartment {
    return {
      id: rawValue.id,
      name: rawValue.name,
      idManager: rawValue.idManager,
      positions: rawValue.positions.map((p: any): IPosition => ({ name: p })),
    };
  }

  getData(): Observable<IDepartment[]> {
    return this.data$.asObservable();
  }

  private getAll() {
    const url = `${this.API_URL}/departments`;
    this.loading$.next(true);

    const observable = this.http.get<IDepartment[]>(url).pipe(
      retry(3),
      finalize(() => this.loading$.next(false))
    );

    observable.pipe(take(1)).subscribe(next => this.data$.next(next));

    return observable;
  }

  public connect(): void {
    this.getAll();
  }

  getById(id: number): Observable<IDepartment> {
    const url = `${this.API_URL}/departments/${id}`;
    this.loading$.next(true);

    return this.http.get<IDepartment>(url).pipe(
      retry(3),
      shareReplay(),
      finalize(() => this.loading$.next(false))
    );
  }

  public getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.API_URL}/departments/${id}`;
    this.loading$.next(true);

    const observable = this.http.delete<void>(url).pipe(
      take(1),
      catchError(error => {
        console.log(error);
        console.log(`ERRO AO APAGAR O FUNCIONÁRIO ${id}`);
        return of();
      }),
      finalize(() => this.loading$.next(false))
    );

    observable.subscribe(() => this.connect());

    return observable;
  }

  update(id: number, data: IDepartment) {
    const url = `${this.API_URL}/departments/${id}`;

    return this.http.put<IDepartment>(url, data).pipe(
      retry(3),
      shareReplay(),
      map(next => {
        const data: IDataAPI<IDepartment> = {
          data: next,
        };

        return data;
      }),
      catchError(error => {
        console.log(error);
        const emptyData: IDataAPI<IDepartment> = {
          message: 'Erro na requisição',
        };

        return of(emptyData);
      })
    );
  }
}
