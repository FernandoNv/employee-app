import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService, ISigninData } from '../../../core/auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButton],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  protected emailValue = signal<string>('');
  protected error = signal<boolean>(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  signin(): void {
    const authData: ISigninData = {
      email: this.emailValue(),
    };

    this.authService.signin(authData).subscribe({
      next: next => {
        this.authService.saveToken(JSON.stringify(next));
        this.router.navigate(['app']);
      },
      error: err => {
        console.log(err);
        this.error.set(true);
      },
    });
  }
}
