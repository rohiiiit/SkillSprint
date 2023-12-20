import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  user:any=null;
  element = document.documentElement;
  constructor(public login:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    })
  }
  logout(){
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'logout'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.login.logout();
        this.login.loginStatusSubject.next(false);
        if(document.fullscreenElement){
          document.exitFullscreen();
        }
        this.router.navigate(['login']);
        Swal.fire({
          icon: 'success',
          title: 'Successfully logout',
          timer: 1500
        })
      }
    })
  } 
}
