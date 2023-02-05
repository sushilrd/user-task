import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './features/update-user/update-user.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { ViewUserComponent } from './features/view-user/view-user.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'view/:id', component: ViewUserComponent },
  { path: 'update/:id', component: UpdateUserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
