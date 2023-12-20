import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  data:any;
  constructor(private user:UserService,private snackBar: MatSnackBar) {
    this.user.getUserList().subscribe(data=>{
        this.data=data;
      })
   }

  ngOnInit(): void {
    this.user.getUserList().subscribe(data=>{
      this.data=data;
    })
  }

  deleteUser(id:number){
    Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.deleteUser(id).subscribe(()=>{
          this.user.getUserList().subscribe(data=>{
            this.data=data;
          })
          console.log("user deleted");
        })
        Swal.fire({
          icon: 'success',
          title: 'Successfully logout',
          timer: 1500
        })
      }
    })  
  }

  addAdmin(username:string){
    this.user.addAdmin(username).subscribe(()=>{
      this.user.getUserList().subscribe(data=>{
        this.data=data;
      })
    })
  }

  removeAdmin(username:string){
    this.user.removeAdmin(username).subscribe(()=>{
      this.user.getUserList().subscribe(data=>{
        this.data=data;
      })
    })
  }
}
