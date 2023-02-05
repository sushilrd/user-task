import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() users: any;
  @Input() i: any;
  @Output() usersDelete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteUser(users: any) {
    this.usersDelete.emit(users);
  }

}