import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private login:LoginService, private router:Router) { }

  ngOnInit(): void {
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.login.logout();
        this.login.loginStatusSubject.next(false);
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
