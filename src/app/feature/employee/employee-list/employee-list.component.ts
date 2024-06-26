import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeRemoveComponent } from '../employee-remove/employee-remove.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/auth/auth.service';
import { IDataAPI } from '../../../shared/data-api/data-api';
import { IPagination } from '../../../shared/data-api/pagination/pagination';

export interface IEmployeeListItem {
  id: number;
  name: string;
  department: string;
  position: string;
  seniority: string;
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private employeeAuth = this.authService.getEmployee();
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected displayedColumns = [
    'id',
    'name',
    'department',
    'position',
    'seniority',
    'actions',
  ];

  protected employeeData = toSignal(this.employeeService.getData(), {
    initialValue: {} as IDataAPI<IPagination<IEmployeeListItem>>,
  });
  protected dataSource = computed(() => {
    if (this.employeeAuth()?.typeEmployee === 'EMPLOYEE') {
      console.log(this.employeeData()!.data!.content);
      return this.employeeData()!.data!.content.filter(
        e => e.position !== null
      );
    }
    return this.employeeData()!.data!.content;
  });
  protected sortData($event: Sort): void {
    this.employeeService.sortData($event);
  }

  protected isLoading = toSignal(this.employeeService.getLoading());

  ngOnInit(): void {
    this.employeeService.connect();
  }

  protected editEmployee(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  protected removeEmployee(employee: IEmployeeListItem): void {
    const dialogRef = this.dialog.open(EmployeeRemoveComponent, {
      data: {
        employee,
      },
    });

    dialogRef.afterClosed().subscribe(isDeleted => {
      if (isDeleted) {
        this.employeeService.deleteById(employee.id).subscribe(() => {});
      }
    });
  }
}
