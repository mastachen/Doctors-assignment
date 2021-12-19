import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DoctorsService } from 'src/app/service';

import { UserTasksComponent } from './user-tasks.component';
import { Observable, of } from 'rxjs';
import { UserTask } from './user-tasks.model';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  let fixture: ComponentFixture<UserTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTasksComponent],
      providers: [{ provide: DoctorsService, useClass: MockDoctorsService }],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
    //set history state
    history.pushState({'name': 'Johnny Walker'}, '', '');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of user tasks', () => {
    expect(component.userTasks.length > 1).toBeTruthy();
  });

  it('should display list of user tasks', () => {
    const h3: HTMLElement = fixture.nativeElement.querySelector('h3');
    fixture.detectChanges();
    expect(h3.textContent).toContain('Tasks for user Johnny Walker');
    const ul: HTMLElement = fixture.nativeElement.querySelector('ul');
    expect(ul.textContent).toContain('Send reports');
    expect(ul.textContent).toContain('Analyze data');
  });
});

class MockDoctorsService {
  fetchUserTasks(id: number): Observable<UserTask[]> {
    const tasks: UserTask[] = [
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
