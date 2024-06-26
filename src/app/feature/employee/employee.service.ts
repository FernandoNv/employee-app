import { inject, Injectable } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { IEmployeeListItem } from './employee-list/employee-list.component';
import { IEmployee } from './employee';
import { Sort } from '@angular/material/sort';
import { IPagination } from '../../shared/data-api/pagination/pagination';
import { IDataAPI } from '../../shared/data-api/data-api';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly API_URL: string = 'http://localhost:8080';
  private http: HttpClient = inject(HttpClient);

  private loading$ = new Subject<boolean>();
  private data$ = new BehaviorSubject<IDataAPI<IPagination<IEmployeeListItem>>>(
    [] as IDataAPI<IPagination<IEmployeeListItem>>
  );

  private getAll(): Observable<IDataAPI<IPagination<IEmployeeListItem>>> {
    const url = `${this.API_URL}/employees`;
    this.loading$.next(true);

    const observable = this.http.get<IPagination<IEmployeeListItem>>(url).pipe(
      retry(3),
      map(next => {
        const data: IDataAPI<IPagination<IEmployeeListItem>> = {
          data: next,
        };

        return data;
      }),
      catchError(error => {
        console.log(error);
        const emptyData: IDataAPI<IPagination<IEmployeeListItem>> = {
          message: 'Sem dados no momento',
        };

        return of(emptyData);
      }),
      finalize(() => this.loading$.next(false))
    );

    observable.pipe(take(1)).subscribe(next => this.data$.next(next));

    return observable;
  }

  getById(id: number): Observable<IDataAPI<IEmployee>> {
    const url = `${this.API_URL}/employees/${id}`;
    this.loading$.next(true);

    return this.http.get<IEmployee>(url).pipe(
      retry(3),
      shareReplay(),
      map(next => {
        const data: IDataAPI<IEmployee> = {
          data: next,
        };

        return data;
      }),
      catchError(error => {
        console.log(error);
        const emptyData: IDataAPI<IEmployee> = {
          message: 'Sem dados no momento',
        };

        return of(emptyData);
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.API_URL}/employees/${id}`;
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

  public create(data: IEmployee): Observable<IDataAPI<IEmployee>> {
    console.log(data);
    const url = `${this.API_URL}/employees`;

    return this.http.post<IEmployee>(url, data).pipe(
      take(1),
      retry(3),
      shareReplay(),
      map(next => {
        const data: IDataAPI<IEmployee> = {
          data: next,
        };

        return data;
      }),
      catchError(error => {
        console.log(error);
        const emptyData: IDataAPI<IEmployee> = {
          message: 'Erro na requisição',
        };

        return of(emptyData);
      })
    );
  }

  update(id: number, data: IEmployee) {
    const url = `${this.API_URL}/employees/${id}`;

    return this.http.put<IEmployee>(url, data).pipe(
      retry(3),
      shareReplay(),
      map(next => {
        const data: IDataAPI<IEmployee> = {
          data: next,
        };

        return data;
      }),
      catchError(error => {
        console.log(error);
        const emptyData: IDataAPI<IEmployee> = {
          message: 'Erro na requisição',
        };

        return of(emptyData);
      })
    );
  }

  public getManagers(): Observable<IEmployeeListItem[]> {
    const url = `${this.API_URL}/employees/managers`;
    this.loading$.next(true);

    return this.http.get<IPagination<IEmployeeListItem>>(url).pipe(
      retry(3),
      map(next => {
        return next.content;
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  public connect(): void {
    this.getAll();
  }

  public getData(): Observable<IDataAPI<IPagination<IEmployeeListItem>>> {
    return this.data$.asObservable();
  }

  public getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  public sortData(event: Sort): void {
    this.data$.pipe(take(1)).subscribe(next => {
      const column = event['active'];
      const direction = event['direction'];

      const dataSorted = [
        ...next.data!.content.sort((a, b) => {
          const valueA = a[column as keyof IEmployeeListItem];
          const valueB = b[column as keyof IEmployeeListItem];

          switch (column) {
            case 'id':
              return direction === 'asc'
                ? valueA < valueB
                  ? 1
                  : -1
                : valueA > valueB
                  ? 1
                  : -1;
            default:
              return direction === 'asc'
                ? valueA.toString().localeCompare(valueB as string)
                : valueB.toString().localeCompare(valueA as string);
          }
        }),
      ];

      next.data!.content = dataSorted;
    });
  }

  public formatDataSave(rawValue: any): IEmployee {
    const employee = {
      name: rawValue.name,
      birthDate: rawValue.birthDate,
      cpf: rawValue.cpf,
      email: rawValue.email,
      phone: rawValue.phone,
      address: {
        postalCode: rawValue.address.postalCode,
        address: rawValue.address.address,
        neighborhood: rawValue.address.neighborhood,
        city: rawValue.address.city,
        state: rawValue.address.state,
        address2: rawValue.address.address2,
        number: rawValue.address.number,
      },
      department: rawValue.contractual.department || undefined,
      position: rawValue.contractual.position || undefined,
      seniority: rawValue.contractual.seniority || undefined,
      salary: rawValue.contractual.salary,
      typeEmployee: rawValue.typeEmployee,
    };

    return employee as IEmployee;
  }
}
