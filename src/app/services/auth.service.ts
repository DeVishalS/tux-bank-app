import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

export enum ROLE {
  _USER,
  _ADMIN
}

export interface UserCreds {
  userLogin: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //TO BE Maintained in environment property or from window location
  LOGIN_URL:string="http://localhost:8080/api/user";

  LS_ROLES_KEY: string = 'loggedInUserRoles';
  LS_USER_KEY: string = 'loggedInUser';
  LS_USER_NAME_KEY: string = 'loggedInUserName';

  constructor(private http: HttpClient) { }

  private userDirectory: Array<any> =
    [
      { userName: 'admin', userLogin: 'admin', password: 'admin', roles: [ROLE._ADMIN] },
      { userName: 'user1', userLogin: 'user1', password: 'user1', roles: [ROLE._USER] },
      { userName: 'user2', userLogin: 'user2', password: 'user2', roles: [ROLE._USER] },
      { userName: 'bruno', userLogin: 'bruno', password: 'bruno', roles: [ROLE._USER] },
    ];

  login(userCreds: UserCreds) {
    let matchingUser = this.userDirectory.find((user) => user.password === userCreds.password && user.userLogin.toLowerCase() === userCreds.userLogin.toLowerCase());
    if (matchingUser) {
      localStorage.setItem(this.LS_USER_KEY, matchingUser.userLogin);
      localStorage.setItem(this.LS_ROLES_KEY, matchingUser.roles);
      localStorage.setItem(this.LS_USER_NAME_KEY, matchingUser.userName);
      return of({ isSuccess: true});
    }else{
      return throwError(()=> new Error("UserName or Passcode is incorrect. Please try again"));
    }
  }

  realLogin(userCreds: UserCreds):Observable<any>{
    let body = new URLSearchParams();
    body.set("userName",userCreds.userLogin);
    body.set("password",userCreds.password);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    let options = {headers:headers}
    return this.http.post(
      this.LOGIN_URL,
      body,
      options
    ).pipe(
        delay(5000),
        map(
          ()=>this.login(userCreds)
        ),
    );
  }

  logout() {
    localStorage.removeItem(this.LS_ROLES_KEY);
    localStorage.removeItem(this.LS_ROLES_KEY);
    localStorage.removeItem(this.LS_USER_NAME_KEY);
    return of({isSuccess:true}).pipe(delay(1000));
  }

  getRoles() {
    return of(localStorage.getItem(this.LS_ROLES_KEY) || [])
  }

  getLoggedInUser() {
    return of(localStorage.getItem(this.LS_USER_KEY));
  }

  getUserName(){
    return of(localStorage.getItem(this.LS_USER_NAME_KEY));
  }

  isLoggedIn() :Observable<boolean>{
    return of(localStorage.getItem(this.LS_USER_KEY)!==null && localStorage.getItem(this.LS_ROLES_KEY)!==null);
  }


}
