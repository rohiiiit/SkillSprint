import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata={
    username:'',
    password:''
  }
  public showPassword: boolean = false;

  constructor(private snackBar:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.logindata.username.trim()=='' || this.logindata.username==null){
      this.snackBar.open("username is required",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
      
    }if(this.logindata.password.trim()=='' || this.logindata.password==null){
      this.snackBar.open("password is required",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    
    //request to server to generate the token
    this.login.generateToken(this.logindata).subscribe(
      (data:any)=>{
        console.log("success");
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            // redirect : ADMIN -> admin dashboard
            // redirect : User -> User dashboard
            if(this.login.getUserRole()=="ADMIN"){
              // admin dashboard
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=="NORMAL"){
              // mormal user dashboard
              this.router.navigate(['user/load-quiz/0']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
            }
          }
        );
      },(error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password..!',
          timer: 1000
        })
      }
    )

  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
