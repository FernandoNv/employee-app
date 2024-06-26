import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PageOptionComponent } from './page-option/page-option.component';
import { AuthService } from '../../core/auth/auth.service';

interface IPageOption {
  title: string;
  subtitle: string;
  icon: string;
  link: string;
}

const OPTIONS: IPageOption[] = [
  {
    title: 'Novo Funcionário',
    subtitle: 'Faça o cadastro de um novo funcionário',
    icon: 'person_add',
    link: '/app/employee/add',
  },
  {
    title: 'Listar Funcionários',
    subtitle: 'Busque por um funcionário na lista de funcionários',
    icon: 'list_alt',
    link: '/app/employee',
  },
  {
    title: 'Novo Departamento',
    subtitle: 'Faça o cadastro de um novo departamento',
    icon: 'work',
    link: '/app/department/add',
  },
  {
    title: 'Listar Departamentos',
    subtitle: 'Busque por um departamento na lista de departamentos',
    icon: 'list_alt',
    link: '/app/department',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageOptionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private authService = inject(AuthService);
  protected employee = this.authService.getEmployee();

  protected pageOptions = computed(() => {
    if (this.employee()?.typeEmployee === 'EMPLOYEE') {
      return [...OPTIONS.slice(0, 2)];
    }

    return [...OPTIONS];
  });
}
