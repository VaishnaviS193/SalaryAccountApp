import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userName: string = '';
  accountBalance: number = 50000;
  spentThisMonth: number = 10000;
  spentThisYear: number = 120000;
  interestEarned: number = 5000;
  userDetails: any = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const password = sessionStorage.getItem('userPassword'); // Retrieve password from sessionStorage
    console.log('Retrieved password:', password); // Debugging

    if (password) {
      this.dataService.getAllUsers().subscribe((users) => {
        const user = users.find((u) => u.password === password); // Match password
        if (user) {
          this.userDetails = user;
          this.userName = user.firstname;
          console.log('User details:', this.userDetails); // Debugging
        } else {
          console.error('No user found with the provided password.');
          alert('User not found. Please log in again.');
        }
      });
    } else {
      alert('Password not found in sessionStorage. Please log in again.');
    }
  }
}