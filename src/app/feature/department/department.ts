export interface IDepartment {
  id?: number;
  name: string;
  idManager: number;
  positions: IPosition[];
}

export interface IPosition {
  id?: number;
  name: string;
}
