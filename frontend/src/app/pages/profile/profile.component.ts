import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };
  readData=false;

  constructor(private login:LoginService,private userService:UserService,private snackBar: MatSnackBar,private router:Router) { 
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
  }
  read(){
    this.readData=true;
  }

  updateProfile(user:any){
    this.userService.updateUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('success','Successfully Updated','success');
        window.sessionStorage.setItem("user",JSON.stringify(user));
        if(this.login.getUserRole()=="ADMIN"){
          this.router.navigate(['admin']);
        }if(this.login.getUserRole()=="NORMAL"){
          this.router.navigate(['user']);
        }
      },
      (error)=>{
        console.log(error);
        this.snackBar.open("Something went Wrong",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      }
    )
  }

}
