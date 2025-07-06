import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  standalone: false,
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent implements OnInit {
  imageSrc: string = '../assets/images/profile/user-10.jpg'; // default image

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewUserComponent>,
    private userService: UserService
  ) {}

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

  close(): void {
    this.dialogRef.close();
  }
}
