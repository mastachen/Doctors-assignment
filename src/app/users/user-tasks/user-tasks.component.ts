import { UserTask } from './user-tasks.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DoctorsService } from '../../service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.sass'],
})
export class UserTasksComponent implements OnInit {
  isFetching = false;
  error = null;
  id: number = 0;
  userTasks: UserTask[] = [];
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    //on reload, history state will be lost, so we store it in localStorage
    if (history.state.name) {
      localStorage.setItem('curUserName', history.state.name);
      this.name = history.state.name;
    } else {
      const savedName = localStorage.getItem('curUserName');
      //null check
      if (savedName) {
        this.name = savedName;
      }
    }
    this.route.params.subscribe((params: Params) => {
      //get user id for parameters
      this.id = params['id'];
      //call http service and fetch tasks for user with specified id
      this.isFetching = true;
      this.doctorsService.fetchUserTasks(this.id).subscribe({
        next: (tasks) => {
          this.isFetching = false;
          this.userTasks = tasks;
        },
        error: (error) => {
          this.isFetching = false;
          this.error = error.message;
        }
      });
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    //clear saved name from local storage
    localStorage.removeItem('curUserName');
  }
}
