import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-agent',
  standalone: false,
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements OnInit {
  agentName: string = '';
  users: UserInfo[] = [];
  filteredUsers: UserInfo[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUsers();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.agentName = params['name'] || 'Agent';
    });
  }

  // Load all users
  loadUsers(): void {
    this.dataService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = [...this.users];
    });
  }

  searchUsers(): void {
    if (this.searchQuery.trim()) {
      this.filteredUsers = this.users.filter((user) =>
        `${user.firstname} ${user.middlename || ''} ${user.lastname}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  sortUsers(): void {
    this.filteredUsers.sort((a, b) =>
      `${a.firstname} ${a.middlename || ''} ${a.lastname}`.localeCompare(
        `${b.firstname} ${b.middlename || ''} ${b.lastname}`
      )
    );
  }

  get paginatedUsers(): UserInfo[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  editUser(id: string): void {
    sessionStorage.setItem('edituserId', id);
    this.router.navigate(['/edit-user']);
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dataService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.filteredUsers = this.filteredUsers.filter((user) => user.id !== userId);
        alert('User deleted successfully.');
      });
    }
  }

  redirectToAddUser(): void {
    this.router.navigate(['/add-user']);
  }
}
