import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AgentInfo } from '../agent-info';

@Component({
  selector: 'app-add-agent',
  standalone: false,
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {
  agentForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.agentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.agentForm.valid) {
      const agentData: AgentInfo = this.agentForm.value;
      console.log('Form submitted:', agentData);

      this.dataService.addAgent(agentData).subscribe({
        next: (response) => {
          console.log('Agent added successfully:', response);
          alert('Agent added successfully!');
          this.agentForm.reset();
        },
        error: (error) => {
          console.error('Error adding agent:', error);
          alert('Failed to add agent. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
