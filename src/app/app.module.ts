import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AgentComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    AddUserComponent,
    AddAgentComponent,
    UserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
