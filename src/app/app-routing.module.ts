import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: UsersListComponent },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'user',
    children: [
      { path: ':id', component: UserDetailsComponent },
      { path: ':id/tasks', component: UserTasksComponent },
    ],
  },
  {
    path: 'tasks',
    component: TasksListComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
