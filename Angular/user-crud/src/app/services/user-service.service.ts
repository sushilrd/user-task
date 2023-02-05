import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const  host = "http://localhost:3000/user";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }

  getAlluser() {
    return this.http.get(`${host}/all`);
  }

  getUser(id : boolean) {
    return this.http.get(`${host}/${id}`);
  }

  deleteUser(id : boolean) {
    return this.http.delete(`${host}/${id}`);
  }

  addUser(body:any) {
    return this.http.post(`${host}/create`, body);
  }

  updateUser(id:any , body:any) {
    return this.http.put(`${host}/${id}`, body);
  }
}
