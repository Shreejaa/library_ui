import { Component, OnInit } from '@angular/core';
import { ApphttpclientService } from 'src/app/apphttpclient.service';
import { environment } from '../../../environments/environment'
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  bookColumns=["ID", "BOOK TITLE", "GENRE","AUTHOR NAME","ISBN","PRICE"];
  actionColumns = [ "EDIT" , "DELETE"];
  actionColumns2=[ "REQUEST BOOK"];
  books: any ={};
  baseUri= environment.apiGatewayUri
  bookUri = environment.bookUri;
  libUri=environment.libraryUri
  updateBook = {};
  updateBookid;
  issuedUser;
  isDeleted=false;
  isDeleteFail=false;
  deleteErrorMessage=''
  isEdit=false;
  isRoleAdmin=false;
  isRequested=false;
  isRequestFail=false;


  constructor(
    private appClient:ApphttpclientService,
    private token : TokenStorageService,
    private http : HttpClient
  ) { }

  ngOnInit() {

    this.issuedUser=this.token.getUserDetails().userid;
    this.isRoleAdmin=this.token.isRoleAdminTrue();
      console.log(this.baseUri+this.bookUri)
      this.appClient.getAll(this.baseUri+this.bookUri).subscribe(
        data => {
          this.books=data
          console.log(data)
        }
      );
  }

  create(){
    this.isEdit=false;
  }

  update(book,id){
    this.updateBook=book;
    this.updateBookid=id;
    this.isEdit=true;
  }

  delete(id){
    this.appClient.deleteData(this.baseUri+this.bookUri,id).subscribe(
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

  saveBookAck(event){
    document.getElementById("closePopup").click();
    console.log(event);
  }

  requestBook(bookid){
      this.http.put(this.baseUri+this.libUri+"/books/"+bookid+"/users/"+this.issuedUser,httpOptions).subscribe(
        data => this.isRequested=true,
        err => this.isRequestFail=true
      )
      window.location.reload()
  }

}
