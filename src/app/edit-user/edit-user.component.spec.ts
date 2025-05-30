import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EditUserComponent } from './edit-user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'edituserId') {
        return '3'; // any dummy user ID
      }
      return null;
    });

    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
