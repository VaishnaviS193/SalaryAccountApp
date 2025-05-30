import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddAgentComponent } from './add-agent.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
describe('AddAgentComponent', () => {
  let component: AddAgentComponent;
  let fixture: ComponentFixture<AddAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAgentComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
