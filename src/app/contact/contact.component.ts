import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ContactUsInfo } from '../contactus-info';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData: ContactUsInfo = this.contactForm.value;

      this.dataService.saveContactUs(contactData).subscribe({
        next: (response) => {
          console.log('Contact details saved successfully:', response);
          alert('Thank you for contacting us! We will get back to you soon.');
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error saving contact details:', error);
          alert('Failed to submit your message. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
