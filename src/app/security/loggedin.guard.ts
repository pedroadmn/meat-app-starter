import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {
    
    constructor(private loginService: LoginService){

    }

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn();
        if(!loggedIn) {
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedIn;
    }

    canLoad(route: Route): boolean {
        console.log('Entrou CanLoad');
        return this.checkAuthentication(route.path);
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('Entrou CanActivate');
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}