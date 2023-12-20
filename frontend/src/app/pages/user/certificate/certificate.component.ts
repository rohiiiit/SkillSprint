import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  user:any;
  percentage = 0;
  quizId = 0;
  Quiz:any;
  Questions:any;
  marksGot = 0;
  CorrectAns = 0;
  AttemptedQue = 0;
  constructor(private login:LoginService,private _router:ActivatedRoute,private _quiz:QuizService,private _questions:QuestionService) { }

  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.quizId = params['quizId'];
    })
    this._router.params.subscribe(params=>{
      this.CorrectAns = params['CorrectAns'];
    })
    this._router.params.subscribe(params=>{
      this.AttemptedQue = params['AttemptedQue'];
    })
    this._router.params.subscribe(params=>{
      this.percentage = params['percentage'];
    })
    this._quiz.getQuiz(this.quizId).subscribe(data=>{
      this.Quiz = data;
    })
    this.user = this.user = this.login.getUser();
  }
  
}
