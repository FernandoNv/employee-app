import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-option',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './page-option.component.html',
  styleUrl: './page-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageOptionComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  icon = input.required<string>();
  link = input.required<string>();
}
