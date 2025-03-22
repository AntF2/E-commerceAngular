import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-services/auth-service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePasswordForm!: FormGroup;
  isSpinning = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  onSubmit(): void {

    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        this.snackBar.open('Las contraseñas no coinciden.', 'Cerrar', { duration: 5000, panelClass: 'error-snackbar' });
        return;
      }

      this.isSpinning = true;

      this.authService.updatePassword(this.changePasswordForm.value).subscribe(
        (response) => {
          this.isSpinning = false;
          console.log(response);
          if (response.id != null) {
            this.snackBar.open('Contraseña cambiada exitosamente', 'Cerrar', { duration: 5000 });
          } else {
            this.snackBar.open('Contraseña antigua incorrecta', 'Cerrar', { duration: 5000 });
            this.changePasswordForm.reset();
          }

        },
        (error) => {
          this.isSpinning = false;
          this.snackBar.open('Falló. Inténtalo de nuevo.', 'Cerrar', { duration: 5000, panelClass: 'error-snackbar' });
        }
      );
    } else {
      for (const i in this.changePasswordForm.controls) {
        this.changePasswordForm.controls[i].markAsDirty();
        this.changePasswordForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
