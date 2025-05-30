import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  accountForm: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  documents: any[] = [];
  homeTypes: any[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.accountForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addressType: ['', Validators.required],
      line1: ['', Validators.required],
      line2: [''],
      line3: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{6}$/)]],
      documentType: ['', Validators.required],
      documentNumber: [''],
      aadharNumber: ['', Validators.pattern(/^\d{12}$/)],
      panNumber: ['', Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]
    });
  }

  ngOnInit(): void {
    this.loadCountries();
    this.loadDocuments();
    this.loadHomeTypes();
  }

  loadCountries(): void {
    this.dataService.getAllCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  onCountryChange(event: Event): void {
    const countryId = (event.target as HTMLSelectElement).value;
    const selectedCountry = this.countries.find((country) => country.id === countryId);
    this.states = selectedCountry ? selectedCountry.states : [];
    this.cities = [];
    this.accountForm.patchValue({ state: '', city: '' });
  }

  onStateChange(event: Event): void {
    const stateId = (event.target as HTMLSelectElement).value;
    const selectedState = this.states.find((state) => state.id === stateId);
    this.cities = selectedState ? selectedState.cities : [];
    this.accountForm.patchValue({ city: '' });
  }

  loadDocuments(): void {
    this.dataService.getAllDocuments().subscribe((documents) => {
      this.documents = documents;
    });
  }

  loadHomeTypes(): void {
    this.dataService.getAllHomeTypes().subscribe((homeTypes) => {
      this.homeTypes = homeTypes;
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const formData = this.accountForm.value;

      const selectedCountry = this.countries.find(country => country.id === formData.country);
      const selectedState = this.states.find(state => state.id === formData.state);
      const selectedCity = this.cities.find(city => city.id === formData.city);
      const selectedDocument = this.documents.find(document => document.id === formData.documentType);
      const selectedHomeType = this.homeTypes.find(homeType => homeType.id === formData.addressType);

      const userData = {
        ...formData,
        country: selectedCountry ? selectedCountry.name : '',
        state: selectedState ? selectedState.name : '',
        city: selectedCity ? selectedCity.name : '',
        addressType: selectedHomeType ? selectedHomeType.name : '',
        documentType: selectedDocument ? selectedDocument.name : '',
        aadharNumber: formData.aadharNumber, // Store original Aadhar number
        panNumber: formData.panNumber // Store original PAN number
      };

      console.log('Form submitted:', userData);
      this.dataService.addUser(userData).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          alert('User added successfully!');
          this.accountForm.reset();
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

  onCancel(): void {
    if (confirm('Are you sure you want to reset the form?')) {
      this.accountForm.reset();
    }
  }
}
