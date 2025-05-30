import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  captcha: string = '';
  captchaCombinations: string[] = [
    'A1B2C3','A7GY2J','X9Y8Z7','P4Q5R6','M1N2O3','K7L8M9','T3U4V5',
    'H6I7J8','W1X2Y3','D4E5F6','G7H8I9','Q1R2S3','Z4A5B6','C7D8E9',
    'F1G2H3','J4K5L6','N7O8P9','R1S2T3','U4V5W6','X7Y8Z9','A2B3C4',
    'D5E6F7','G8H9I0','J1K2L3','M4N5O6','P7Q8R9','S1T2U3','V4W5X6',
    'Y7Z8A9','B1C2D3','E4F5G6','H7I8J9','K1L2M3','N4O5P6','Q7R8S9',
    'T1U2V3','W4X5Y6','Z7A8B9','C1D2E3','F4G5H6','I7J8K9','L1M2N3',
    'O4P5Q6','R7S8T9','U1V2W3','X4Y5Z6','A7B8C9','D1E2F3','G4H5I6',
    'J7K8L9','M1N2O3','P4Q5R6','S7T8U9','V1W2X3','Y4Z5A6','B7C8D9',
    'E1F2G3','H4I5J6','K7L8M9','N1O2P3','Q4R5S6','T7U8V9','W1X2Y3',
    'Z4A5B6','C7D8E9','F1G2H3','I4J5K6','L7M8N9','O1P2Q3','R4S5T6',
    'U7V8W9','X1Y2Z3','A4B5C6','D7E8F9','G1H2I3','J4K5L6','M7N8O9',
    'P1Q2R3','S4T5U6','V7W8X9','Y1Z2A3','B4C5D6','E7F8G9','H1I2J3',
    'K4L5M6','N7O8P9','Q1R2S3','T4U5V6','W7X8Y9','Z1A2B3','C4D5E6',
    'F7G8H9','I1J2K3','L4M5N6','O7P8Q9','R1S2T3','U4V5W6','X7Y8Z9',
    'A2B3C4','D5E6F7','G8H9I0','J1K2L3','M4N5O6','P7Q8R9','S1T2U3',
    'V4W5X6','Y7Z8A9','B1C2D3','E4F5G6','H7I8J9','K1L2M3','N4O5P6',
    'Q7R8S9','T1U2V3','W4X5Y6','Z7A8B9','C1D2E3','F4G5H6','I7J8K9',
    'L1M2N3','O4P5Q6','R7S8T9','U1V2W3','X4Y5Z6','A7B8C9','D1E2F3',
  ]; 

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      captchaInput: ['', Validators.required]
    });
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const randomIndex = Math.floor(Math.random() * this.captchaCombinations.length);
    this.captcha = this.captchaCombinations[randomIndex];
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password, captchaInput } = this.loginForm.value;

      if (captchaInput !== this.captcha) {
        this.errorMessage = 'Invalid captcha. Please try again.';
        this.generateCaptcha();
        return;
      }

      this.dataService.getAllAdmins().subscribe((admins) => {
        const admin = admins.find((a: any) => a.email === email && a.password === password);

        if (admin) {
          this.router.navigate(['/admin'],{ queryParams: { name: admin.name } });
        } else {
          this.dataService.getAllAgents().subscribe((agents) => {
            const agent = agents.find((a: any) => a.email === email && a.password === password);

            if (agent) {
              this.router.navigate(['/agent'],{ queryParams: { name: agent.name } });
            } else {
              this.dataService.getAllUsers().subscribe((users) => {
                const user = users.find((u: any) => u.email === email && u.password === password);

                if (user) {
                    sessionStorage.setItem('userPassword', password);
                    this.router.navigate(['/user']);
                } else {
                  this.errorMessage = 'Invalid email or password.';
                }
              });
            }
          });
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
