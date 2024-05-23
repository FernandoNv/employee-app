import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IEmployee } from '../employee';
import { EmployeeMockService } from '../employee-mock.service';
import { EmployeeService } from '../employee.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { parseDMY } from '../../shared/utils/utils';

@Component({
  selector: 'app-employee-edit',
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
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: EmployeeService,
      useClass: EmployeeMockService,
    },
  ],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditComponent {
  private employeeService = inject(EmployeeService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  protected readonly id: number = Number(this.route.snapshot.params['id']);
  protected readonly employee = toSignal(
    this.employeeService.getById(this.id),
    { initialValue: {} as IEmployee }
  );

  employeeForm = new FormGroup({
    nome: new FormControl(this.employee().nome, [Validators.required]),
    cpf: new FormControl(this.employee().cpf, [Validators.required]),
    email: new FormControl(this.employee().email, [
      Validators.required,
      Validators.email,
    ]),
    dataNascimento: new FormControl(parseDMY(this.employee().dataNascimento), [
      Validators.required,
    ]),
    telefone: new FormControl(this.employee().telefone, [Validators.required]),
    endereco: new FormGroup({
      cep: new FormControl(this.employee().endereco.cep, [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      rua: new FormControl(this.employee().endereco.rua, [
        Validators.required,
        Validators.minLength(3),
      ]),
      numero: new FormControl(this.employee().endereco.numero, [
        Validators.required,
        Validators.min(1),
      ]),
      bairro: new FormControl(this.employee().endereco.bairro, [
        Validators.required,
        Validators.minLength(3),
      ]),
      cidade: new FormControl(this.employee().endereco.cidade, [
        Validators.required,
        Validators.minLength(3),
      ]),
      uf: new FormControl(this.employee().endereco.uf, [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2),
      ]),
      complemento: new FormControl(this.employee().endereco.complemento),
    }),
    contratual: new FormGroup({
      departamento: new FormControl(this.employee().departamento, [
        Validators.required,
      ]),
      cargo: new FormControl(this.employee().cargo, [Validators.required]),
      nivel: new FormControl(this.employee().nivel, [Validators.required]),
      salario: new FormControl(this.employee().salario, [
        Validators.required,
        Validators.min(1200),
      ]),
    }),
  });

  onSubmitValues(): void {
    console.log(this.employeeForm.getRawValue());
  }
}
