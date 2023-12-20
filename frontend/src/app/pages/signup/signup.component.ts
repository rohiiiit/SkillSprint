import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private _snackBar: MatSnackBar,private router:Router) { }
  durationInSeconds=5;
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };
  
  ngOnInit(): void {
  }
  formSubmit(){
    if(this.user.username=="" || this.user.username==null){
      this._snackBar.open("user name is required",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    
    // add user
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('success','user Successfully Registered','success');
        this.router.navigate(['login']);
      },
      (error)=>{
        console.log(error);
        this._snackBar.open("Something went Wrong",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      }
    )

  }
}
