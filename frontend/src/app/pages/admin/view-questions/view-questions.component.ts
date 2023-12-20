import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(private _router:ActivatedRoute,private _quiz:QuizService,private _questions:QuestionService) { }
  quizId=0;
  Quiz:any;
  Questions:any;
  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.quizId = params['quizId']
    })
    this._quiz.getQuiz(this.quizId).subscribe((data)=>{
      this.Quiz = data;
    })
    this._questions.getAllQuestionsByQuiz(this.quizId).subscribe((data)=>{
      this.Questions = data;
      console.log(data)
    })
  }

  deleteQuestion(questionId:number){
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
        this._questions.deleteQuestion(questionId).subscribe((data)=>{
          this._questions.getQuestionsByQuiz(this.quizId).subscribe((data)=>{
            this.Questions = data;
        })
        },(error)=>{
          console.log(error);
        })
        Swal.fire({
          icon: 'success',
          title: 'Question Removed',
          timer: 1500
        })
      }
    })
  }



}
