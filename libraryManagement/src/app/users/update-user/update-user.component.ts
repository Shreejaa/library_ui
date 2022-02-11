import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApphttpclientService } from 'src/app/apphttpclient.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  baseUri=environment.apiGatewayUri;
  usersUri=environment.userUri;
  isSuccessful=false;
  isFailed=false;
  errorMessage=''
  id;
  role;
  user=this.token.getUserDetails()
  form:any={}

  constructor(
    private appClient : ApphttpclientService,
    private token : TokenStorageService
  ) { }


  ngOnInit(): void {
    this.id=this.user.userid
    this.role=this.token.getRole()
  }

  onSubmit(){
    this.appClient.updateData(this.baseUri+this.usersUri,this.id,
      {
        "userid": this.id,
        "firstname": this.form.firstname,
        "lastname": this.form.lastname,
        "username": this.form.username,
        "useremail": this.form.useremail,
        "phoneno": this.form.phoneno,
        "password": this.form.password,
        "role": this.role
    }).subscribe(
      data=>{
        console.log(this.form)
        this.isSuccessful=true
        window.location.reload()
      },
      err=>{
        this.errorMessage=err.error.message
        this.isFailed=true
      }
    )
  }

}
