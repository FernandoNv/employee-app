export interface IDepartment {
  id: number;
  name: string;
  positionList: IPosition[];
}

export interface IPosition {
  id: number;
  name: string;
}
