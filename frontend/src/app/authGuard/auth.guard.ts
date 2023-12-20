import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private login:LoginService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isLoggedIn()){
        if(this.login.getUserRole()=="ADMIN"){
          this.router.navigate(["admin"]);
        }if(this.login.getUserRole()=="NORMAL"){
          this.router.navigate(["user/load-quiz/0"]);
        }
        return false;
      }
      // if(this.login.isLoggedIn() && this.login.getUserRole()=="ADMIN"){
      //   this.router.navigate(['/admin'])
      //   return true;
      // }
      // if(this.login.isLoggedIn() && this.login.getUserRole()=="NORMAL"){
      //   this.router.navigate(['/user'])
      //   return true;
      // }
      
    return true;
  }
  
}
