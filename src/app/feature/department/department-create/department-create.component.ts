import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormDepartmentComponent } from '../form-department/form-department.component';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-create',
  standalone: true,
  imports: [FormDepartmentComponent],
  templateUrl: './department-create.component.html',
  styleUrl: './department-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentCreateComponent {
  private formBuilder = inject(FormBuilder);
  private departmentService = inject(DepartmentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected formGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    idManager: ['', [Validators.required]],
    positions: this.formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1)]
    ),
  });

  onSubmitValues() {
    const data = this.departmentService.formatDataSave(
      this.formGroup.getRawValue()
    );

    this.departmentService
      .create(data)
      .subscribe(() =>
        this.router.navigate(['/app/department'], { relativeTo: this.route })
      );
  }
}
