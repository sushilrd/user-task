import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  localItem: any;
  users: any[];
  subscriptions: Subscription[] = [];

  constructor(private userService : UserServiceService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.subscriptions.push(
      this.userService.getAlluser()
      .subscribe((res :any)=>{
        if(res && res.data.length) {
          this.users = res.data;
        } else {
          this.users = [];
        }
      },(error)=>{
        console.log(error);
        this.users = [];
      }
      )
    )
  }

  deleteUser(user: any) {
    this.subscriptions.push(
      this.userService.deleteUser(user.id)
      .subscribe((res :any)=>{
        if(res.success) {
        this.getData();
        } 
      },(error)=>{
        console.log(error);
      }
      )
    )
  }
  addUser(user: any) {
    this.subscriptions.push(
      this.userService.addUser(user)
      .subscribe((res :any)=>{
        if(res && res.success) {
          this.getData();
        } 
      },(error)=>{
        console.log(error);
        alert(error.error.message);
      }
      )
    )
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }
}
