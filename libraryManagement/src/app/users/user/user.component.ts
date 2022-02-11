import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userColumn=["FIRSTNAME", "LASTNAME","USERNAME","USEREMAIL","PHONE NUMBER","PASSWORD"];
  actionColumns = ["CHANGES"];
 
  constructor(
    private token: TokenStorageService
  ) { }

  user=this.token.getUserDetails();
  
  ngOnInit(): void {
  }

}
