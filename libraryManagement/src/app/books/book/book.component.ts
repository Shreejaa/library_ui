import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { environment } from '../../../environments/environment'
import { ApphttpclientService } from 'src/app/apphttpclient.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  baseUri=environment.apiGatewayUri+environment.bookUri
  errorMessage = ''
  isFailCreate=false
  isFailUpdate=false
  isBookForm;

  @Input()
  isEdit : boolean =false;

  @Input()
  book;

  @Input()
  id;

  @Output()
  saveEvent = new EventEmitter<any>();
  
  constructor(
    private appClient : ApphttpclientService
  ) { }

  ngOnInit(){
    this.isBookForm=true
  }

  saveBook(){
    if(this.isEdit){
      console.log("update book")
      this.appClient.updateData(this.baseUri,this.id,this.book).subscribe(
        data => {
          console.log(data)
          this.isBookForm=false
          window.location.reload();
        },
        err => this.isFailUpdate=true
      )
    }
    else{
      console.log("create a book")
      this.appClient.saveData(this.baseUri,this.book).subscribe(
        data => {
          console.log(data)
          this.isBookForm=false
          window.location.reload();
        },
        err => this.isFailCreate = true
      )
    }
  }

}
