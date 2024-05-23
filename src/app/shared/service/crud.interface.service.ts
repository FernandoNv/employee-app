import { Observable } from 'rxjs';

export interface ICrudInterface<T> {
  getById(id: number): Observable<T>;
  deleteById(id: number): Observable<T>;
  updateById(id: number, data: T): Observable<T>;
  deleteById(id: number): Observable<T>;
  create(data: T): Observable<T>;
}
