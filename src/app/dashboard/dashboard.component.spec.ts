import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { DataService } from '../services/data.service';
 
describe('DashboardComponent', () => {
let component: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;
let mockDataService: jasmine.SpyObj<DataService>;
 
beforeEach(async () => {
mockDataService = jasmine.createSpyObj('DataService', ['addUser', 'getAllCountries']);
mockDataService.getAllCountries.and.returnValue(of([{ id: '1', name: 'United States' }]));
 
await TestBed.configureTestingModule({
declarations: [DashboardComponent],
imports: [ReactiveFormsModule],
providers: [{ provide: DataService, useValue: mockDataService }],
}).compileComponents();
 
fixture = TestBed.createComponent(DashboardComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
 
it('should call addUser on form submit', () => {
component.accountForm.setValue({
name: 'John Doe',
email: 'john@example.com',
phone: '1234567890',
country: 'United States',
state: 'California',
city: 'Los Angeles',
document: 'Passport',
homeType: 'Home',
});
 
mockDataService.addUser.and.returnValue(of({ success: true }));
component.onSubmit();
 
expect(mockDataService.addUser).toHaveBeenCalledWith(component.accountForm.value);
});
});