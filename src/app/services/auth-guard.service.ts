import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate,CanActivateChild {
  canActivateChild(childRoute: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
      return this.canActivate();
  }
  constructor(private router: Router, private authUser: TokenService) { }
  
  canActivate(): boolean {
      //return true;
      let logged = this.authUser.hasAccessToken();
      if (logged)
          return true;
      else {
          this.router.navigate(['/']);
          return false;
      }

  }

}