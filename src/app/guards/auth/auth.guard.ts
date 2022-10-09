import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Inside auth guard')
      let nextAction : boolean | UrlTree = false;
      this.authService.isLoggedIn().subscribe((isLoggedIn)=>{
        if(isLoggedIn){
          nextAction = true;
        }else{
          nextAction = this.router.parseUrl('/login')
        }
      });
      return nextAction;
  }
  
}
