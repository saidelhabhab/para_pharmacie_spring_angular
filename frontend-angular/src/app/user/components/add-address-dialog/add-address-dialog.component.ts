import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAddressRequestDTO } from 'src/app/interface/user-address-request-dto';
import { UserAddressService } from 'src/app/services/user-address.service';

@Component({
  selector: 'app-add-address-dialog',
  standalone: false,
  templateUrl: './add-address-dialog.component.html',
  styleUrl: './add-address-dialog.component.scss'
})
export class AddAddressDialogComponent implements OnInit {
  addressForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private addressService: UserAddressService,
    private dialogRef: MatDialogRef<AddAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{4,10}$/)]],
      userPhone: ['', [Validators.required, Validators.pattern(/^\+[1-9]\d{1,14}$/)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const dto: UserAddressRequestDTO = {
      userId: this.data.userId,
      ...this.addressForm.value
    };
    this.addressService.addAddress(this.data.userId, dto).subscribe({
      next: (saved) => {
        this.dialogRef.close(saved);
      },
      error: (err) => {
        console.error('Failed to save address', err);
        this.loading = false;
      }
    });
  }
}