import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  userName:string = 'Unknown';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService, private router:Router) {}

  ngOnInit(){
    this.getUserName();
  }

  getUserName(){
    this.authService.getUserName().subscribe((userName)=> this.userName = userName || 'Unknown' )
  }

  logout(){
    this.authService.logout().subscribe(
      ()=>{ this.router.navigateByUrl('/login'); }
    );
  }

}
