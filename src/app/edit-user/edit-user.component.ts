import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  accountForm: FormGroup;
  userId: string | null = null;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  documents: any[] = [];
  homeTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addressType: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{6}$/)]],
      documentType: ['', Validators.required],
      documentNumber: [''],
      aadharNumber: ['', Validators.pattern(/^\d{12}$/)],
      panNumber: ['', Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)],
    });
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('edituserId');
    if (this.userId) {
      this.loadDropdownData();
      this.loadUserData(this.userId);
    } else {
      alert('No user selected for editing.');
      this.router.navigate(['/agent']);
    }
  }

  // Load dropdown data
  loadDropdownData(): void {
    this.dataService.getAllCountries().subscribe((countries) => (this.countries = countries));
    this.dataService.getAllDocuments().subscribe((documents) => (this.documents = documents));
    this.dataService.getAllHomeTypes().subscribe((homeTypes) => (this.homeTypes = homeTypes));
  }

  // Load user data by ID
  loadUserData(userId: string): void {
    this.dataService.getUserById(userId).subscribe((user) => {
      if (user) {
        this.accountForm.patchValue({
          ...user,
          country: this.countries.find((c) => c.name === user.country)?.id || '',
          state: this.states.find((s) => s.name === user.state)?.id || '',
          city: user.city,
        });

        // Load states and cities based on the user's country and state
        this.onCountryChange({ target: { value: this.accountForm.value.country } });
        this.onStateChange({ target: { value: this.accountForm.value.state } });
      }
    });
  }

  // Handle country change
  onCountryChange(event: any): void {
    const countryId = event.target.value;
    const selectedCountry = this.countries.find((country) => country.id === countryId);
    this.states = selectedCountry ? selectedCountry.states : [];
    this.cities = [];
    this.accountForm.patchValue({ state: '', city: '' });
  }

  // Handle state change
  onStateChange(event: any): void {
    const stateId = event.target.value;
    const selectedState = this.states.find((state) => state.id === stateId);
    this.cities = selectedState ? selectedState.cities : [];
    this.accountForm.patchValue({ city: '' });
  }

  // Submit the updated user data
  onSubmit(): void {
    if (this.accountForm.valid && this.userId) {
      const formData = this.accountForm.value;
  
      // Map IDs to names for dropdown fields
      const selectedCountry = this.countries.find((country) => country.id === formData.country);
      const selectedState = this.states.find((state) => state.id === formData.state);
      const selectedCity = this.cities.find((city) => city.id === formData.city);
      const selectedDocument = this.documents.find((document) => document.id === formData.documentType);
      const selectedHomeType = this.homeTypes.find((homeType) => homeType.id === formData.addressType);
  
      const updatedUser = {
        ...formData,
        id: this.userId, // Include the user ID
        country: selectedCountry ? selectedCountry.name : '',
        state: selectedState ? selectedState.name : '',
        city: selectedCity ? selectedCity.name : '',
        addressType: selectedHomeType ? selectedHomeType.name : '',
        documentType: selectedDocument ? selectedDocument.name : '',
      };
  
      console.log('Updated User:', updatedUser);
  
      this.dataService.updateUser(updatedUser).subscribe(() => {
        alert('User updated successfully!');
        this.router.navigate(['/agent']);
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Cancel and navigate back
  onCancel(): void {
    this.router.navigate(['/agent']);
  }
}
