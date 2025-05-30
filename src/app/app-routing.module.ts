import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'agent', component: AgentComponent},
  { path: 'user', component: UserComponent},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'add-agent', component: AddAgentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }