import { Injectable } from '@angular/core';
import { ICrudInterface } from '../shared/service/crud.interface.service';
import { IEmployee } from './employee';
import { Observable, of } from 'rxjs';

const EMPLOYEE: IEmployee = {
  id: 1,
  nome: 'Fernando Vieira',
  telefone: '(21) 12345-6789',
  cpf: '123.123.124-12',
  email: 'email@email.com',
  dataNascimento: '17/12/1996',
  endereco: {
    cep: '12345-123',
    rua: 'Rua 1',
    numero: 1,
    bairro: 'Bairro 1',
    cidade: 'Cidade 1',
    uf: 'AO',
  },
  departamento: 'TI',
  cargo: 'Dev Fullstack',
  nivel: 'JUNIOR',
  salario: 20000,
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeMockService implements ICrudInterface<IEmployee> {
  constructor() {}

  getById(id: number): Observable<IEmployee> {
    return of(EMPLOYEE);
  }
  deleteById(id: number): Observable<IEmployee>;
  deleteById(id: number): Observable<IEmployee>;
  deleteById(id: unknown): import('rxjs').Observable<IEmployee> {
    throw new Error('Method not implemented.');
  }
  updateById(id: number, data: IEmployee): Observable<IEmployee> {
    throw new Error('Method not implemented.');
  }
  create(data: IEmployee): Observable<IEmployee> {
    throw new Error('Method not implemented.');
  }
}
