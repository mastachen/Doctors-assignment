import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DoctorsService } from 'src/app/service';

import { UserDetailsComponent } from './user-details.component';
import { Observable, of } from 'rxjs';
import { UserDetails } from './user-details.model';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      providers: [{ provide: DoctorsService, useClass: MockDoctorsService }],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user details', () => {
    expect(component.userDetails.id > 0).toBeTruthy();
  });

  it('should display user details', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div.user-details');
    expect(div.textContent).toContain('Johnny Walker');
    expect(div.textContent).toContain('jwalk');
    expect(div.textContent).toContain('johnny@email.com');
    expect(div.textContent).toContain('Elm street 1');
    expect(div.textContent).toContain('Apt. 1');
    expect(div.textContent).toContain('Elm city');
    expect(div.textContent).toContain('1111-222');
    expect(div.textContent).toContain('11.11');
    expect(div.textContent).toContain('22.22');
    expect(div.textContent).toContain('+386-31-111-333');
    expect(div.textContent).toContain('johnnywalker.org');
    expect(div.textContent).toContain('Walker Inc.');
    expect(div.textContent).toContain('Join us now!');
    expect(div.textContent).toContain('Softfware solutions');
  });
});

class MockDoctorsService {
  fetchUserDetails(id: number): Observable<UserDetails> {
    const userDetails: UserDetails = {
      id: 1,
      name: 'Johnny Walker',
      username: 'jwalk',
      email: 'johnny@email.com',
      address: {
        street: 'Elm street 1',
        suite: 'Apt. 1',
        city: 'Elm city',
        zipcode: '1111-222',
        geo: {
          lat: '-11.11',
          lng: '22.22',
        },
      },
      phone: '+386-31-111-333',
      website: 'johnnywalker.org',
      company: {
        name: 'Walker Inc.',
        catchPhrase: 'Join us now!',
        bs: 'Softfware solutions',
      },
    };

    return of(userDetails);
  }
}