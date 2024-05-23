import { Injectable } from '@angular/core';
import { ICrudInterface } from '../shared/service/crud.interface.service';
import { IEmployee } from './employee';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements ICrudInterface<IEmployee> {
  constructor() {}

  getById(id: number): Observable<IEmployee> {
    return of({} as IEmployee);
  }

  deleteById(id: number): Observable<IEmployee> {
    return of({} as IEmployee);
  }

  updateById(id: number, data: IEmployee): Observable<IEmployee> {
    return of({} as IEmployee);
  }

  create(data: IEmployee): Observable<IEmployee> {
    throw new Error('Method not implemented.');
  }
}
