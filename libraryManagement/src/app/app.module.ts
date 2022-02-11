import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooklistComponent } from './books/booklist/booklist.component';
import { BookComponent } from './books/book/book.component';
import { UserlistComponent } from './users/userlist/userlist.component';
import { UserComponent } from './users/user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptorService } from './_helpers/auth-interceptor.service';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { UpdateUserComponent } from './users/update-user/update-user.component'
@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
    BookComponent,
    UserlistComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LibraryComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
