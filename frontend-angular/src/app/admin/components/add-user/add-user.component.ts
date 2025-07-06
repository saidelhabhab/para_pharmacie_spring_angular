import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
 
imageSrc: string = '../assets/images/profile/user-10.jpg';
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      aboutMe: [''],
      phone: [''],
      address: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  close(): void {
    this.dialogRef.close();
  }



  submit(): void {
  if (this.userForm.invalid || this.imageSrc === '../assets/images/profile/user-10.jpg') {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Veuillez remplir tous les champs requis et télécharger une image.'
    });
    return;
  }

  const fullName = this.userForm.value.name.split(' ');
  const firstName = fullName[0];
  const lastName = fullName.slice(1).join(' ') || ' ';

  const userData = {
    email: this.userForm.value.email,
    firstName,
    lastName,
    password: 'default123', // or ask from form
    phone: this.userForm.value.phone,
    address: this.userForm.value.address,
    aboutMe: this.userForm.value.aboutMe,
    country: 'Morocco',
    role: 'USER',
    profileImgBase64: this.imageSrc
  };

  this.dialogRef.close(userData);
}

  /*

  submit(): void {
    if (this.userForm.invalid || this.imageSrc === '../assets/images/profile/user-10.jpg') {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis et télécharger une image.'
      });
      return;
    }

    const userData = {
      ...this.userForm.value,
      avatar: this.imageSrc
    };

    Swal.fire({
      icon: 'success',
      title: 'Utilisateur enregistré',
      text: 'Les informations ont été sauvegardées avec succès.',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      this.dialogRef.close(userData);
    });
  }
    */
}