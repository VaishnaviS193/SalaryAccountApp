import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminName: string = '';
  agents: any[] = [];
  contactus: any[] = [];

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadAgents();
    this.loadContactUsList();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.adminName = params['name'] || 'Admin';
    });
    
  }

  loadAgents(): void {
    this.dataService.getAllAgents().subscribe((agents) => {
      this.agents = agents;
    });
  }

  loadContactUsList(): void {
    this.dataService.getContactUsList().subscribe((contactus) => {
      this.contactus = contactus;
    });
  }
  redirectToAddAgent(): void {
    this.router.navigate(['/add-agent']);
  }
}
