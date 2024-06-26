import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormEmployeeComponent } from '../form-employee/form-employee.component';
import { parseYMD } from '../../../shared/utils/utils';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    FormEmployeeComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditComponent {
  private employeeService = inject(EmployeeService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  protected readonly id: number = Number(this.route.snapshot.params['id']);
  protected readonly employeeDataAPI = toSignal(
    this.employeeService.getById(this.id)
  );
  protected readonly employee = computed(() => this.employeeDataAPI()?.data);
  protected isLoading = toSignal(this.employeeService.getLoading());
  protected employeeForm!: FormGroup;
  protected managerForm!: FormGroup;

  constructor() {
    effect(() => {
      if (this.employee() !== undefined) {
        if (this.employee()?.typeEmployee === 'EMPLOYEE') {
          this.employeeForm = new FormGroup({
            name: new FormControl(this.employee()?.name, [
              Validators.required,
              Validators.minLength(3),
            ]),
            cpf: new FormControl(
              { value: this.employee()?.cpf, disabled: true },
              [
                Validators.required,
                Validators.minLength(14),
                Validators.maxLength(14),
              ]
            ),
            email: new FormControl(
              { value: this.employee()?.email, disabled: true },
              [Validators.required, Validators.email]
            ),
            birthDate: new FormControl(
              { value: parseYMD(this.employee()!.birthDate), disabled: true },
              [Validators.required]
            ),
            phone: new FormControl(this.employee()?.phone, [
              Validators.required,
              Validators.minLength(14),
              Validators.maxLength(15),
            ]),
            address: new FormGroup({
              postalCode: new FormControl(this.employee()?.address.postalCode, [
                Validators.required,
                Validators.maxLength(9),
                Validators.minLength(9),
              ]),
              address: new FormControl(this.employee()?.address.address, [
                Validators.required,
                Validators.minLength(3),
              ]),
              number: new FormControl(this.employee()?.address.number, [
                Validators.required,
                Validators.min(1),
              ]),
              neighborhood: new FormControl(
                this.employee()?.address.neighborhood,
                [Validators.required, Validators.minLength(3)]
              ),
              city: new FormControl(this.employee()?.address.city, [
                Validators.required,
                Validators.minLength(3),
              ]),
              state: new FormControl(this.employee()?.address.state, [
                Validators.required,
                Validators.maxLength(2),
                Validators.minLength(2),
              ]),
              address2: new FormControl(this.employee()?.address?.address2),
            }),
            contractual: new FormGroup({
              department: new FormControl(this.employee()?.department, [
                Validators.required,
              ]),
              position: new FormControl(this.employee()?.position, [
                Validators.required,
              ]),
              seniority: new FormControl(this.employee()?.seniority, [
                Validators.required,
              ]),
              salary: new FormControl(this.employee()?.salary, [
                Validators.required,
                Validators.min(1200),
              ]),
            }),
            typeEmployee: new FormControl(this.employee()?.typeEmployee, [
              Validators.required,
            ]),
          });
        } else {
          this.managerForm = new FormGroup({
            name: new FormControl(this.employee()?.name, [
              Validators.required,
              Validators.minLength(3),
            ]),
            cpf: new FormControl(
              { value: this.employee()?.cpf, disabled: true },
              [
                Validators.required,
                Validators.minLength(14),
                Validators.maxLength(14),
              ]
            ),
            email: new FormControl(
              { value: this.employee()?.email, disabled: true },
              [Validators.required, Validators.email]
            ),
            birthDate: new FormControl(
              { value: parseYMD(this.employee()!.birthDate), disabled: true },
              [Validators.required]
            ),
            phone: new FormControl(this.employee()?.phone, [
              Validators.required,
              Validators.minLength(14),
              Validators.maxLength(15),
            ]),
            address: new FormGroup({
              postalCode: new FormControl(
                this.employee()?.address?.postalCode,
                [
                  Validators.required,
                  Validators.maxLength(9),
                  Validators.minLength(9),
                ]
              ),
              address: new FormControl(this.employee()?.address?.address, [
                Validators.required,
                Validators.minLength(3),
              ]),
              number: new FormControl(this.employee()?.address?.number, [
                Validators.required,
                Validators.min(1),
              ]),
              neighborhood: new FormControl(
                this.employee()?.address?.neighborhood,
                [Validators.required, Validators.minLength(3)]
              ),
              city: new FormControl(this.employee()?.address?.city, [
                Validators.required,
                Validators.minLength(3),
              ]),
              state: new FormControl(this.employee()?.address?.state, [
                Validators.required,
                Validators.maxLength(2),
                Validators.minLength(2),
              ]),
              address2: new FormControl(this.employee()?.address?.address2),
            }),
            contractual: new FormGroup({
              department: new FormControl(''),
              position: new FormControl(''),
              seniority: new FormControl(''),
              salary: new FormControl(this.employee()?.salary, [
                Validators.required,
                Validators.min(1200),
              ]),
            }),
            typeEmployee: new FormControl(this.employee()?.typeEmployee, [
              Validators.required,
            ]),
          });
        }
      }
    });
  }

  onSubmitValues(): void {
    const valuesFormatted = this.employeeService.formatDataSave(
      this.employee()?.typeEmployee === 'MANAGER'
        ? this.managerForm.getRawValue()
        : this.employeeForm.getRawValue()
    );

    this.employeeService
      .update(this.id, valuesFormatted)
      .subscribe(() => this.router.navigate(['/'], { relativeTo: this.route }));
  }
}
