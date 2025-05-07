import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountForm: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  documents: any[] = [];
  homeTypes: any[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      document: ['', Validators.required],
      homeType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    // Fetch countries
    this.dataService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
    });

    // Fetch states
    this.dataService.getAllStates().subscribe((states) => {
      this.states = states;
    });

    // Fetch cities
    this.dataService.getAllCities().subscribe((cities) => {
      this.cities = cities;
    });

    // Fetch documents
    this.dataService.getAllDocuments().subscribe((documents) => {
      this.documents = documents;
    });

    // Fetch home types
    this.dataService.getAllHomeTypes().subscribe((homeTypes) => {
      this.homeTypes = homeTypes;
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const userData = this.accountForm.value;

      this.dataService.addUser(userData).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          alert('User added successfully!');
          this.accountForm.reset(); // Reset the form
          this.loadDropdownData(); // Refresh the page data
        },
        error: (error) => {
          console.error('Error adding user:', error);
          alert('Failed to add user. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
