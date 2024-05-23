import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCreateComponent {

}
