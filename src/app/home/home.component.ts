import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PageOptionComponent } from './page-option/page-option.component';

interface IPageOption {
  title: string;
  subtitle: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageOptionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected pageOptions = signal<IPageOption[]>([
    {
      title: 'Novo Funcionário',
      subtitle: 'Faça o cadastro de um novo funcionário',
      icon: 'person_add',
      link: '/funcionario/criar',
    },
    {
      title: 'Listar Funcionários',
      subtitle: 'Busque por um funcionário na lista de funcionários',
      icon: 'list_alt',
      link: '/funcionario',
    },
  ]);
}
