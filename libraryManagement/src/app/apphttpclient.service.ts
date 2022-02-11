import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApphttpclientService {

  hash='/'

  constructor(
    private http: HttpClient
  ) { }

  getAll(uri): Observable<any>{
    return this.http.get(uri,httpOptions)
  }

  getDataById(uri,id): Observable<any>{
    return this.http.get(uri+this.hash+id,httpOptions)
  }

  saveData(uri,data): Observable<any>{
    return this.http.post(uri,data,httpOptions)
  }

  updateData(uri,id,data): Observable<any>{
    return this.http.put(uri+this.hash+id,data,httpOptions)
  }

  deleteData(uri,id) : Observable<any>{
    return this.http.delete(uri+this.hash+id)
  }


}
