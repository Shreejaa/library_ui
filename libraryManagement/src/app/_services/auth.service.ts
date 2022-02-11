import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseuri = environment.apiGatewayUri;
  authUri =environment.authUri;
  registerUri = environment.registerUri;

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(this.baseuri+this.authUri, {
      "username": credentials.username,
      "password": credentials.password
    }, httpOptions);
  }
  register(user): Observable<any> {
    return this.http.post(this.baseuri+this.registerUri, {
      "firstname":user.firstname,
      "lastname":user.lastname,
      "username": user.username,
      "useremail": user.useremail,
      "phoneno":user.phoneno,
      "password": user.password
    }, httpOptions);
  }
}
