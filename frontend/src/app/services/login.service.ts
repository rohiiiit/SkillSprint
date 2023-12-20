import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  // To generate token
  public generateToken(logindata : any){
    return this.http.post(`${baseUrl}/generate-token`,logindata)
  }

  // get Current USer
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // login user: To set in local storage
  public loginUser(token:any){
    window.sessionStorage.setItem('token',token);
  }

  // isLogin : user is Login or not
  public isLoggedIn(){
    let tokenstr = window.sessionStorage.getItem("token");
    if(tokenstr==undefined || tokenstr=='' || tokenstr==null){
      return false;
    }else{
      return true;
    }
  }

  // logout : remove token from localstorage
  public logout(){
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    window.sessionStorage.clear();
    return true;
  }

  // get Token
  public getToken(){
    return window.sessionStorage.getItem("token");
  }

  // set userDetails
  public setUser(user:any){
    window.sessionStorage.setItem("user",JSON.stringify(user));
  }

  // get user
  public getUser(){
    let userstr = window.sessionStorage.getItem("user");
    if(userstr!=null){
      return JSON.parse(userstr);
    }else{
      this.logout();
      return null;
    }
  }

  // get user Role
  public getUserRole(){
    let user=this.getUser()
    return user.authorities[0].authority;
  }


  

}
