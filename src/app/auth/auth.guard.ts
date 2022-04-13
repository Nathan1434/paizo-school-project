import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.checkAuthState(route);
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.checkAuthState(route);
    }

    private checkAuthState(route: ActivatedRouteSnapshot | Route): UrlTree | boolean {
        // Ensures that the user in no logged in when accessing login and signup routes
        if (route.data?.['requiresUnauth'] && this.auth.isLoggedIn) return this.router.parseUrl('/');

        // Ensures that users are logged in when accessing that resource
        if (route.data?.['requiresAuth'] && !this.auth.isLoggedIn) return this.router.parseUrl('/login');

        // Default
        return true;
    }
}
