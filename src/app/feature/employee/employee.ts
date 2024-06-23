export interface IEmployee {
  id?: number;
  name: string;
  seniority: ISeniority;
  cpf: string;
  phone: string;
  email: string;
  birthDate: string;
  salary: number;
  address: {
    address: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    address2?: string;
  };
  department: string;
  position: string;
  typeEmployee: 'EMPLOYEE' | 'MANAGER';
}

export type ISeniority = 'JUNIOR' | 'PLENO' | 'SENIOR';
