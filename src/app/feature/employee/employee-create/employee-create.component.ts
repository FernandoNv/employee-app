import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [FormEmployeeComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);

  protected employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(14),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(15),
    ]),
    address: new FormGroup({
      postalCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      number: new FormControl('', [Validators.required, Validators.min(1)]),
      neighborhood: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      state: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2),
      ]),
      address2: new FormControl(),
    }),
    contractual: new FormGroup({
      department: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      seniority: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required, Validators.min(1200)]),
    }),
    typeEmployee: new FormControl('EMPLOYEE', [Validators.required]),
  });

  onSubmitValues(): void {
    const valuesFormatted = this.employeeService.formatDataSave(
      this.employeeForm.getRawValue()
    );

    this.employeeService
      .create(valuesFormatted)
      .subscribe(() => this.router.navigate([''], { relativeTo: this.route }));
  }
}
