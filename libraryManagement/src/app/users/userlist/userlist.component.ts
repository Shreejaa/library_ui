import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApphttpclientService } from 'src/app/apphttpclient.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userColumn=["ID", "FIRSTNAME", "LASTNAME","USERNAME","USEREMAIL","PHONE NUMBER","ROLE"];
  actionColumns = ["DELETE"];
  users: any ={};
  baseUri= environment.apiGatewayUri
  usersUri = environment.userUri;
  isDeleted=false;
  isDeleteFail=false;
  deleteErrorMessage=''

  
  constructor(
    private appClient:ApphttpclientService,
  ) { }


  ngOnInit(){
 
    console.log(this.baseUri+this.usersUri)
    this.appClient.getAll(this.baseUri+this.usersUri).subscribe(
      data => {
        this.users=data
        console.log(data)
      }
    );
  }
  delete(id){
    this.appClient.deleteData(this.baseUri+this.usersUri,id).subscribe(
      data =>{
         this.isDeleted = true
         window.location.reload();
        },
      err => {
        this.deleteErrorMessage= err.error.message,
        this.isDeleteFail= true
      }
    )
  }

}
