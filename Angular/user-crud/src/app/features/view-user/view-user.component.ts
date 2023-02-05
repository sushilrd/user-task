import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, OnDestroy {
  user: any
  user_id :any
  subscriptions: Subscription[] = [];

  constructor(private userService : UserServiceService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((x:any)=>{
      this.user_id = x.id
    })

    if(this.user_id) {
    this.subscriptions.push(

      this.userService.getUser(this.user_id)
      .subscribe((res :any)=>{
        if(res && res.data.length) {
          this.user = res.data[0];
        } else {
          this.user = {};
        }
      },(error)=>{
        console.log(error);
        this.user = {};
      }
      )
    )
      
    }
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

}
