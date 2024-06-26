import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-department-remove',
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './department-remove.component.html',
  styleUrl: './department-remove.component.scss',
})
export class DepartmentRemoveComponent {
  protected data = inject(MAT_DIALOG_DATA);
  private dialogRef: MatDialogRef<DepartmentRemoveComponent> = inject(
    MatDialogRef<DepartmentRemoveComponent>
  );

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick() {
    this.dialogRef.close(true);
  }
}
