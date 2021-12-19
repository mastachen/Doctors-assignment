import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DoctorsService } from 'src/app/service';

import { TasksListComponent } from './tasks-list.component';
import { TaskList } from './tasks-list.model';
import { Observable, of } from 'rxjs';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      providers: [{ provide: DoctorsService, useClass: MockDoctorsService }],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of user tasks', () => {
    expect(component.tasks.length > 1).toBeTruthy();
  });

  it('should display list of user tasks', () => {
    const ul: HTMLElement = fixture.nativeElement.querySelector('ul');
    expect(ul.textContent).toContain('Send reports');
    expect(ul.textContent).toContain('Analyze data');
  });
});

class MockDoctorsService {
  fetchTasks(): Observable<TaskList[]> {
    const tasks: TaskList[] = [
      {
        userId: 1,
        id: 1,
        title: 'Send reports',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'Analyze data',
        completed: true,
      },
    ];

    return of(tasks);
  }
}