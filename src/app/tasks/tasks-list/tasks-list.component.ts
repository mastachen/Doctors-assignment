import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DoctorsService } from '../../service';
import { TaskList } from './tasks-list.model';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  isFetching = false;
  error = null;
  tasks: TaskList[] = [];

  constructor(private doctorsService: DoctorsService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.doctorsService.fetchTasks().subscribe({
      next: (tasks) => {
        this.isFetching = false;
        this.tasks = tasks
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    });
  }

  onHandleError() {
    this.error = null;
  }
}