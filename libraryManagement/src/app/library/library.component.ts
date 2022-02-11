import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApphttpclientService } from '../apphttpclient.service';
import { TokenStorageService } from '../_services/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  libraryColumn=["ID","BOOK TITLE","USERNAME","RELEASE BOOK"]
  baseUri=environment.apiGatewayUri
  libUri=environment.libraryUri
  userurl=environment.userUri
  bookurl=environment.bookUri
  libData ;
  userid;
  bookid;
  isBookReleased;
  isBookReleasedFail;
  title : string [];
  username : string [];
  

  constructor(
    private http:HttpClient,
    private appClient:ApphttpclientService,
    private tokenStorage:TokenStorageService
  ) { }

  ngOnInit(){

    this.appClient.getAll(this.baseUri+this.libUri).subscribe(
      data=>{
        this.libData = data;
      }
    )

  }

  getTitle(bookid){
    let title 
    this.appClient.getDataById(this.baseUri+this.bookurl,bookid).subscribe(
      data=>{
        title= data.title   
      }
    )
  }

  getUsername(userid){
    let username
    this.appClient.getDataById(this.baseUri+this.userurl,this.libData.userid).subscribe(
      data => {
        username=data.username
      }
    )
  }
  
  
  release(bookid,userid){
    this.http.delete(this.baseUri+this.libUri+"/books/"+bookid+"/users/"+userid,httpOptions).subscribe(
      data=> this.isBookReleased=true,
      err => this.isBookReleasedFail=true
    )
    window.location.reload()
  }

}
