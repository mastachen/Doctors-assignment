import { Component, OnInit } from '@angular/core';
import { UserList } from './users-list.model';
import { DoctorsService } from '../../service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent implements OnInit {
  isFetching = false;
  error = null;
  users: UserList[] = [];

  constructor(private doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.doctorsService.fetchUsers().subscribe({
      next: (users) => {
        this.isFetching = false;
        this.users = users;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      },
    });
  }

  onHandleError() {
    this.error = null;
  }
}
