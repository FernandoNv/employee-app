import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeRemoveComponent } from '../../employee/employee-remove/employee-remove.component';
import { IEmployeeListItem } from '../../employee/employee-list/employee-list.component';
import { DepartmentService } from '../department.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';
import { IDepartment } from '../department';
import { DepartmentRemoveComponent } from '../department-remove/department-remove.component';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatProgressSpinnerModule,
    JsonPipe,
  ],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
})
export class DepartmentListComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected displayedColumns = [
    'id',
    'name',
    'manager',
    'positions',
    'actions',
  ];
  protected departmentData = toSignal(this.departmentService.getData());
  protected isLoading = toSignal(this.departmentService.getLoading());

  ngOnInit(): void {
    this.departmentService.connect();
    console.log(this.departmentData());
  }

  protected editEmployee(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  protected removeDepartment(department: IDepartment): void {
    const dialogRef = this.dialog.open(DepartmentRemoveComponent, {
      data: {
        department,
      },
    });

    dialogRef.afterClosed().subscribe(isDeleted => {
      if (isDeleted) {
        this.departmentService
          .deleteById(department.id || -1)
          .subscribe(() => {});
      }
    });
  }
}
