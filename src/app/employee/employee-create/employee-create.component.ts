import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateComponent {
  employeeForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    endereco: new FormGroup({
      cep: new FormControl('', [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
      rua: new FormControl('', [Validators.required, Validators.minLength(3)]),
      numero: new FormControl('', [Validators.required, Validators.min(1)]),
      bairro: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cidade: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      uf: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2),
      ]),
      complemento: new FormControl(''),
    }),
    contratual: new FormGroup({
      departamento: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      nivel: new FormControl('', [Validators.required]),
      salario: new FormControl('', [Validators.required, Validators.min(1200)]),
    }),
  });

  onSubmitValues(): void {
    console.log(this.employeeForm.getRawValue());
  }
}
