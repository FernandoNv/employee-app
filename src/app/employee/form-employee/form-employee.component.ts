import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DepartmentService } from '../../shared/department/department.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IDepartment } from '../../shared/department/department';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatIcon,
  ],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormEmployeeComponent {
  departmentService = inject(DepartmentService);
  employeeForm = input.required<FormGroup>();
  formValuesChange = output();
  type = input.required<'create' | 'update'>();
  protected departmentList = toSignal(this.departmentService.get());
  protected departmentSelected = signal<IDepartment | undefined>(undefined);

  constructor() {
    effect(
      () => {
        let departmentSelected: IDepartment | undefined = undefined;
        const departmentName = this.employeeForm()
          .get('contractual')
          ?.get('department')?.value;
        if (departmentName !== undefined && departmentName !== '') {
          departmentSelected = this.departmentList()?.find(
            v => v.name === departmentName
          );
        }

        this.departmentSelected.set(departmentSelected);
      },
      { allowSignalWrites: true }
    );
  }

  onSubmitValues(): void {
    this.updateDepartmentAndPositionValueToUseIdValue();
    this.formValuesChange.emit();
  }

  private updateDepartmentAndPositionValueToUseIdValue(): void {
    const positionValue = this.employeeForm()
      .get('contractual')
      ?.get('position')?.value;
    const position = this.departmentSelected()?.positionList.find(
      p => p.name === positionValue
    );

    this.employeeForm()
      .get('contractual')
      ?.get('position')
      ?.setValue(position!.id);

    this.employeeForm()
      .get('contractual')
      ?.get('department')
      ?.setValue(this.departmentSelected()!.id);
  }

  updatePositions(event: string): void {
    this.departmentSelected.set(
      this.departmentList()?.find(v => v.name === event)
    );
  }
}
