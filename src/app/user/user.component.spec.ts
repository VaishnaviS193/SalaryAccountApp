import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from '../services/data.service';
import { UserComponent } from './user.component';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not set user details for invalid password', () => {
    const mockPassword = 'invalidPassword';
    const mockUsers = [{ password: 'otherPassword', firstname: 'Jane' }];
  
    spyOn(sessionStorage, 'getItem').and.returnValue(mockPassword);
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['getAllUsers']);
    dataServiceSpy.getAllUsers.and.returnValue(of(mockUsers));
  
    // Override the provider before creating the component
    TestBed.overrideProvider(DataService, { useValue: dataServiceSpy });
  
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
    expect(component.userName).toBe('');
    expect(component.userDetails).toEqual({});
  });
});
