import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _router:ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,private router:Router,private _snackBar:MatSnackBar) {
   }

  quizId=0;
  Quiz:any;
  categories:any;
  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.quizId = params['quizId']
    })
    this._quiz.getQuiz(this.quizId).subscribe((data)=>{
      this.Quiz = data;
    });
    this._category.getCategories().subscribe((data)=>{
      this.categories = data;
    })
  }

  updateQuiz(){
    this._quiz.updateQuiz(this.Quiz).subscribe((data)=>{
      this.router.navigate(['admin/quizzes']);
      Swal.fire({
        icon: 'success',
        title: 'Successfully updated',
        timer: 1500
      })
    },(error)=>{
      this._snackBar.open("Something went Wrong",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
    })
  }

}
