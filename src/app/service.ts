import { TaskList } from './tasks/tasks-list/tasks-list.model';
import { UserTask } from './users/user-tasks/user-tasks.model';
import { UserDetails } from './users/user-details/user-details.model';
import { UserList } from './users/users-list/users-list.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http
      .get<{ [key: string]: UserList }>(
        'https://jsonplaceholder.typicode.com/users'
      )
      .pipe(
        map((responseData) => {
          const usersArray: UserList[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              //pull out all key value pairs from object and push new object to array
              usersArray.push({ ...responseData[key] });
            }
          }
          return usersArray;
        })
      );
  }

  fetchUserDetails(id: number) {
    return this.http
      .get<UserDetails>('https://jsonplaceholder.typicode.com/users/' + id)
      .pipe(
        map((responseData) => {
          return { ...responseData };
        })
      );
  }

  fetchUserTasks(id: number) {
    return this.http
      .get<{ [key: string]: UserTask }>(
        'https://jsonplaceholder.typicode.com/users/' + id + '/todos'
      )
      .pipe(
        map((responseData) => {
          const userTasksArray: UserTask[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              //pull out all key value pairs from object and push new object to array
              userTasksArray.push({ ...responseData[key] });
            }
          }
          return userTasksArray;
        })
      );
  }

  fetchTasks() {
    return this.http
      .get<{ [key: string]: TaskList }>(
        'https://jsonplaceholder.typicode.com/todos'
      )
      .pipe(
        map((responseData) => {
          const tasksArray: TaskList[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              //pull out all key value pairs from object and push new object to array
              tasksArray.push({ ...responseData[key] });
            }
          }
          return tasksArray;
        })
      );
  }
}
