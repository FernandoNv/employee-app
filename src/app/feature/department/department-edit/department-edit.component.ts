import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormDepartmentComponent } from '../form-department/form-department.component';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IDepartment } from '../department';

@Component({
  selector: 'app-department-edit',
  standalone: true,
  imports: [FormDepartmentComponent],
  templateUrl: './department-edit.component.html',
  styleUrl: './department-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentEditComponent {
  private formBuilder = inject(FormBuilder);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected readonly id: number = Number(this.route.snapshot.params['id']);
  protected readonly departmentData = toSignal(
    this.departmentService.getById(this.id),
    {
      initialValue: {
        name: '',
        id: -1,
        idManager: -1,
        positions: [],
      } as IDepartment,
    }
  );

  protected formGroup: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    idManager: ['', [Validators.required, Validators.minLength(3)]],
    positions: this.formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  constructor() {
    effect(() => {
      if (this.departmentData().positions) {
        const positions: string[] = this.departmentData().positions.map(
          p => p.name
        );
        this.formGroup = new FormGroup({
          name: new FormControl(this.departmentData().name, [
            Validators.required,
            Validators.minLength(2),
          ]),
          idManager: new FormControl(this.departmentData().idManager, [
            Validators.required,
          ]),
          positions: new FormArray(
            [...positions.map(p => new FormControl(p))],
            [Validators.required]
          ),
        });
      }
    });
  }

  onSubmitValues() {
    const data = this.departmentService.formatDataSave(
      this.formGroup.getRawValue()
    );

    this.departmentService
      .update(this.departmentData().id as number, data)
      .subscribe(() =>
        this.router.navigate(['/app/department'], { relativeTo: this.route })
      );
  }
}
