export interface IEmployee {
  id: number;
  cpf: string;
  nome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    uf: string;
    complemento?: string;
  };
  departamento: string;
  cargo: string;
  nivel: ILevel;
  salario: number;
}

export type ILevel = 'JUNIOR' | 'PLENO' | 'SENIOR';
