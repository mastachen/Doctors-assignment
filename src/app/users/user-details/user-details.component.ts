import { UserDetails } from './user-details.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DoctorsService } from 'src/app/service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  isFetching = false;
  error = null;
  id: number = 0;
  userDetails: UserDetails = new UserDetails();
  success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      //get user id for parameters
      this.id = params['id'];

      //call http service and fetch data for user with specified id
      this.isFetching = true;
      this.doctorsService.fetchUserDetails(this.id).subscribe({
        next: (userDetails) => {
          this.isFetching = false;
          this.userDetails = userDetails;
          this.success = this.userDetails.id > 0;
        },
        error: (error) => {
          this.isFetching = false;
          this.error = error.message;
        },
      });
    });
  }

  onHandleError() {
    this.error = null;
  }
}
