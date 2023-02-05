import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserComponent } from './features/user/user.component';
import { AddUserComponent } from './features/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './features/view-user/view-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateUserComponent } from './features/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserComponent,
    AddUserComponent,
    ViewUserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
