import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone:false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  userForm: FormGroup;
  imageSrc: string = '../assets/images/profile/user-10.jpg';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      occupation: [data.aboutMe],
      phone: [data.phone],
      location: [data.address]
    });
  }

  ngOnInit(): void {
    this.loadImage(this.data.userId);
  }

  loadImage(userId: string): void {
    this.userService.getProfileImage(userId).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error: () => {
        this.imageSrc = '../assets/images/profile/user-10.jpg';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  submit(): void {
    if (this.userForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs obligatoires.', 'error');
      return;
    }

    const updatedUser = {
      ...this.userForm.value,
      avatar: this.imageSrc,
      id: this.data.userId
    };

    Swal.fire({
      icon: 'success',
      title: 'Utilisateur modifié',
      text: 'Les informations ont été mises à jour avec succès.',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      this.dialogRef.close(updatedUser);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}