import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import Swal from 'sweetalert2';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from '../view-user/view-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserResponseDTO } from 'src/app/interface/user-response-dto';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  allUsers: UserResponseDTO[] = []; // for search filtering
  users: UserResponseDTO[] = [];    // displayed users
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  searchTerm: string = '';
  imageMap: { [userId: string]: string } = {};
  searchForm!: FormGroup;


  constructor(private dialog: MatDialog, 
              private userService: UserService,
              private fb: FormBuilder) {}

 ngOnInit(): void {
  this.searchForm = this.fb.group({
    searchTerm: ['']
  });

  this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
    this.searchTerm = value;
    this.onSearchChange();
  });

  this.loadUsers();
}

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      this.applySearchAndPagination();
      this.loadUserImages(this.users);
    });
  }

  applySearchAndPagination(): void {
    let filtered = this.allUsers;
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter(user =>
        user.lastName?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.address?.toLowerCase().includes(term) ||
        user.phone?.toLowerCase().includes(term) ||
        user.aboutMe?.toLowerCase().includes(term)
      );
    }

    this.totalElements = filtered.length;
    this.totalPages = Math.ceil(this.totalElements / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages - 1);
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.users = filtered.slice(start, end);
  }

  onSearchChange(): void {
    this.currentPage = 0;
    this.applySearchAndPagination();
    this.loadUserImages(this.users);
  }

  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.applySearchAndPagination();
    this.loadUserImages(this.users);
  }

  private loadUserImages(users: UserResponseDTO[]): void {
    users.forEach(user => {
      this.userService.getProfileImage(user.userId).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageMap[user.userId] = reader.result as string;
          };
          reader.readAsDataURL(blob);
        },
        error: () => {
          this.imageMap[user.userId] = '../assets/images/profile/user-10.jpg';
        }
      });
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: () => {
            Swal.fire('Success', 'Utilisateur ajouté avec succès', 'success');
            this.loadUsers();
          },
          error: () => {
            Swal.fire('Erreur', 'Une erreur est survenue', 'error');
          }
        });
      }
    });
  }

  openViewUserDialog(user: any): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
      }
    });
  }

  openEditUserDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.users.findIndex(u => u.userId === result.id);
        if (index !== -1) {
          this.users[index] = result;
        }
      }
    });
  }

  deleteItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  deleteAllItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  getAboutMePreview(aboutMe: string | undefined): string {
    if (!aboutMe) return '';
    const words = aboutMe.trim().split(/\s+/);
    const trimmed = words.slice(0, 2).join(' ');
    return words.length > 2 ? trimmed + '...' : trimmed;
  }
}

