import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  //add user
  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user);
  }
  
  public updateUser(user:any){
    return this.http.put(`${baseUrl}/user/update`,user);
  }

  public getUserList(){
    return this.http.get(`${baseUrl}/user/get`)
  }

  public deleteUser(id:number){
    return this.http.delete(`${baseUrl}/user/${id}`)
  }

  public addAdmin(username:string){
    return this.http.patch(`${baseUrl}/admin/add/${username}`,username)
  }

  public removeAdmin(username:string){
    return this.http.patch(`${baseUrl}/admin/remove/${username}`,username)
  }
}
