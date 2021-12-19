import { UserList } from './users-list.model';
import { RouterTestingModule } from '@angular/router/testing';
import { DoctorsService } from 'src/app/service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [{ provide: DoctorsService, useClass: MockDoctorsService }],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of users', () => {
    expect(component.users.length > 1).toBeTruthy();
  });

  it('should display list of users', () => {
    const ul: HTMLElement = fixture.nativeElement.querySelector('ul');
    expect(ul.textContent).toContain('Johnny Walker');
    expect(ul.textContent).toContain('Ryan Styles');
  });

  it('should see details link', () => {
    expect(
      fixture.debugElement.query(By.css('.btn-details')).nativeElement
    ).toBeTruthy();
  });

  it('should see tasks link', () => {
    expect(
      fixture.debugElement.query(By.css('.btn-tasks')).nativeElement
    ).toBeTruthy();
  });
});

class MockDoctorsService {
  fetchUsers(): Observable<UserList[]> {
    const users: UserList[] = [
      {
        id: 1,
        name: 'Johnny Walker',
        username: 'jwalk',
        email: 'johnny@email.com',
      },
      {
        id: 2,
        name: 'Ryan Styles',
        username: 'ryamstyles',
        email: 'ryamstyles@email.com',
      },
    ];

    return of(users);
  }
}
