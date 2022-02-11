import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ApphttpclientService } from '../apphttpclient.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUri = environment.apiGatewayUri;
  userUri=environment.userUri;
  usernameUri='/username';
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username='';

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private appClient:ApphttpclientService
  ) { }

  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser();
    
    this.appClient.getDataById(this.baseUri+this.userUri+this.usernameUri,this.username).subscribe(
      data =>{
        console.log(data.username +" "+data.role+" "+data)
        this.tokenStorage.saveRole(data.role)
        this.tokenStorage.setUserDetails(data)
      }
    )
  }
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(this.form.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
