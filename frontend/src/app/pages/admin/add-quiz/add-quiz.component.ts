import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  Quiz={
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestion:"",
    active:true,
    category : {
      categoryId:'',
    }
  }
  categories:any;
  constructor(private _category:CategoryService,private _quiz:QuizService,private router:Router,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe((data:any)=>{
      this.categories = data;
      // console.log(data);
    },(error)=>{
      Swal.fire("Error !!","Error in loading data",'error')
    }
    )
  }

  addQuiz(){
    if(this.Quiz.title=="" || this.Quiz.title==null){
      this._snackBar.open("Title is required",'ok',{duration:1500,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    this._quiz.addQuiz(this.Quiz).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['admin/quizzes'])
    })
  }
}
