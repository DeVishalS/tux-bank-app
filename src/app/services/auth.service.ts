import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

export enum APP_ROLE {
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

  LS_ROLES_KEY: string = 'loggedInUserRoles';
  LS_USER_KEY: string = 'loggedInUser';
  LS_USER_NAME_KEY: string = 'loggedInUserName';

  constructor() { }

  private userDirectory: Array<any> =
    [
      { userName: 'Vishal', userLogin: 'vishal', password: 'power', roles: [APP_ROLE._ADMIN] },
      { userName: 'John', userLogin: 'john', password: 'power', roles: [APP_ROLE._USER] },
      { userName: 'Shalaka', userLogin: 'shalaka', password: 'power', roles: [APP_ROLE._USER] },
      { userName: 'Bruno', userLogin: 'bruno', password: 'power', roles: [APP_ROLE._USER] },
    ];

  login(userCreds: UserCreds) {
    console.log(userCreds);
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
