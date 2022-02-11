import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { environment } from '../environments/environment'
import { ApphttpclientService } from './apphttpclient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'LibraryManagement';
  role='';
  isLoggedIn = false;
  username: string;
  isRoleAdmin: boolean=false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private appClient : ApphttpclientService
    ) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user;
      this.isRoleAdmin=this.tokenStorageService.isRoleAdminTrue()
}
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
