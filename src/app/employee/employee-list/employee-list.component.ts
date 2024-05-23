import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeRemoveComponent } from '../employee-remove/employee-remove.component';
import { Router } from '@angular/router';

export interface IEmployeeListItem {
  id: number;
  nome: string;
  cargo: string;
  nivel: string;
  departamento: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);

  protected displayedColumns = [
    'id',
    'nome',
    'departamento',
    'cargo',
    'nivel',
    'actions',
  ];
  protected employeeList = signal<IEmployeeListItem[]>([
    {
      id: 1,
      nome: 'Fernando Vieira',
      departamento: 'TI',
      cargo: 'Dev Fullstack',
      nivel: 'JÚNIOR',
    },
    {
      id: 2,
      nome: 'Marcos Fred',
      departamento: 'DP',
      cargo: 'Assiste Administrativo',
      nivel: 'PLENO',
    },
  ]);

  protected sortData($event: Sort): void {
    console.log($event);
  }

  protected editEmployee(id: number): void {
    this.router.navigate(['/funcionario', id]);
  }

  protected removeEmployee(id: number): void {
    const dialogRef = this.dialog.open(EmployeeRemoveComponent, {
      data: {
        id,
        utoFocus: true,
      },
    });

    dialogRef.afterClosed().subscribe(r => {
      console.log('Fechei o dialog');
      console.log(r);
    });
  }
}
