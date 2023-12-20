import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login : LoginService){

    }

    intercept(authReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        // add the jwt token (localstorage) request
        
        const token = this.login.getToken();
        authReq = authReq.clone({
            setHeaders : {Authorization : `Bearer ${token}`},
        });
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]