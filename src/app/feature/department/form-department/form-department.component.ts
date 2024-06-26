import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../employee/employee.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Position {
  name: string;
}

@Component({
  selector: 'app-form-department',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './form-department.component.html',
  styleUrl: './form-department.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDepartmentComponent {
  formGroup = input.required<FormGroup>();
  type = input.required<'create' | 'update'>();
  formValuesChange = output();

  private employeeService = inject(EmployeeService);
  private formBuilder = inject(FormBuilder);

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  protected managersList = toSignal(this.employeeService.getManagers());

  get positionsControl(): FormArray {
    return this.formGroup()!.controls['positions'] as FormArray;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our position
    if (value) {
      this.positionsControl.push(this.formBuilder.control(value));
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(position: Position): void {
    const index = this.positionsControl.value.indexOf(position);
    if (index >= 0) {
      this.positionsControl.removeAt(index);
    }
  }

  edit(position: Position, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove position if it no longer has a name
    if (!value) {
      this.remove(position);
      return;
    }

    // Edit existing position
    const index = this.positionsControl.value.indexOf(position);
    const positions = [...this.positionsControl.value];
    if (index >= 0) {
      positions[index].name = value;
    }
    this.positionsControl.setValue([...positions]);
  }

  onSubmitValues() {
    if (this.formGroup().valid) {
      this.formValuesChange.emit();
    }
  }
}
