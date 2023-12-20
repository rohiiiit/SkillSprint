import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private _router:ActivatedRoute,private _question:QuestionService,private router:Router,private _snackBar:MatSnackBar,private _quiz:QuizService) { }
  Question={
    quetionId:"",
    content:"",
    image:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
    quiz:{
      quizId:"",
    }
  }
  quiz:any;
  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.Question.quiz.quizId = params['quizId']
    })
    this._quiz.getQuiz(this.Question.quiz.quizId).subscribe(data=>{
     this.quiz = data;
    })
  }

  addQuestion(){

    if(this.Question.content=="" || this.Question.content==null){
      this._snackBar.open("content is required",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    if(this.Question.option1=="" || this.Question.option1==null){
      this._snackBar.open("Minimum 2 option required",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    if(this.Question.option2=="" || this.Question.option2==null){
      this._snackBar.open("Minimum 2 option required",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    if(this.Question.answer=="" || this.Question.answer==null){
      this._snackBar.open("Enter Correct Answer for this Question",'ok',{duration:3000,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    
    this._question.addQuestion(this.Question).subscribe((data)=>{
      this.router.navigate(["/admin/view-questions-by-quiz/"+this.Question.quiz.quizId])
    })
  }
}
