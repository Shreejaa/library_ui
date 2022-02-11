import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const ROLE ='role';
const USER_DETAILS='user_details'
const ADMIN ='ADMIN'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public setUserDetails(user){
    window.sessionStorage.removeItem(USER_DETAILS);
    window.sessionStorage.setItem(USER_DETAILS, JSON.stringify(user));
  }

  public getUserDetails() {
    return JSON.parse(sessionStorage.getItem(USER_DETAILS));
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveRole(role) {
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(ROLE, JSON.stringify(role));
  }

  public getRole() {
    return JSON.parse(sessionStorage.getItem(ROLE));
  }

  public isRoleAdminTrue(): boolean{
    return this.getRole() == ADMIN
  }

}