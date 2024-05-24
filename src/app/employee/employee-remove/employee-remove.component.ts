import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-remove',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './employee-remove.component.html',
  styleUrl: './employee-remove.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeRemoveComponent {
  protected data = inject(MAT_DIALOG_DATA);
  private dialogRef: MatDialogRef<EmployeeRemoveComponent> = inject(
    MatDialogRef<EmployeeRemoveComponent>
  );

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }
}
