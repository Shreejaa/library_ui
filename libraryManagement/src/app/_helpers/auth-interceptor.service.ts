import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private token: TokenStorageService
  ) { }

  intercept(req, next) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        setHeaders: { 
            Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(authReq);
  }
}
