import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
   emailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
  if (this.emailForm.valid) {
    const email = this.emailForm.get('email')?.value;
    console.log('Email to send reset link:', email);


    // Afficher un SweetAlert2 de confirmation
    Swal.fire({
      icon: 'success',
      title: 'Email envoyé !',
      text: `Un lien de réinitialisation a été envoyé à ${email}`,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    });
  } else {
    // Afficher une erreur si le formulaire est invalide
    Swal.fire({
      icon: 'error',
      title: 'Formulaire invalide',
      text: 'Veuillez entrer une adresse email valide.',
      confirmButtonText: 'Réessayer',
      confirmButtonColor: '#d33'
    });
  }
}

}
