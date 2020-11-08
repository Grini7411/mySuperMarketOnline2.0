import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  myEventEmitter: EventEmitter<any> = new EventEmitter();

  userID = '';
  isConnected = false;
  userConnected: any = {};

  // changeUserStatus(): Observable<any> {
  //   if (this.isConnected) {
  //     let retObj = {userConnected:this.userConnected,isConnected:this.isConnected}
  //     return new Observable()
  //   }
  // }

  // check if user logged-in
  checkUserLogin(loginUser: any): Observable<any> {
    const url = `http://localhost:3000/smousers/login`;
    return this.http.post(url, loginUser, httpOptions);
  }
  // log-out:
  logOut(): Observable<any> {
    const url = `http://localhost:3000/smousers/logout`;
    return this.http.get(url);
  }

  // add a new User (REGISTER)
  addUserToDB(value: any): Observable<any> {
    const url = `http://localhost:3000/smousers/adduser`;
    return this.http.post(url, value, httpOptions);
  }

  // delete a user
  deleteUser(id: string): Observable<any> {
    return  this.http.delete('http://localhost:3000/smousers/deluser/' + id);
}

  checkUser(): Observable<any> {
    const url = 'http://localhost:3000/smousers/checkuser';
    return this.http.get(url);
  }

  downloadTypes(): Observable<any> {
    const url = 'http://localhost:3000/smousers/getusertypes';
    return this.http.get(url);

  }
}
