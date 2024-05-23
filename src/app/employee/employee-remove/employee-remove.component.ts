import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
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
  protected data: { id: number } = inject(DIALOG_DATA);
  private dialogRef: MatDialogRef<EmployeeRemoveComponent> = inject(
    MatDialogRef<EmployeeRemoveComponent>
  );

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
