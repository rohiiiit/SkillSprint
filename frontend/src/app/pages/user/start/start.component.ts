import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from 'angular-disable-browser-back-button';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private login:LoginService,private _router:ActivatedRoute,private _quiz:QuizService,private _questions:QuestionService,private locationSt:LocationStrategy,private router:Router) { }
  quizId = 0;
  Questions:any;
  marksGot = 0;
  CorrectAns = 0;
  AttemptedQue = 0;
  timer:any;
  isSubmit = false;
  percentage = 0;
  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.quizId = params['quizId'];
    })
    this.loadQuestions();
    this.preventBackButton();
    window.onbeforeunload = function(event) {
      return 'By refreshing this page you may lost all data.';
    }
  }
  loadQuestions(){
    this._questions.getQuestionsByQuiz(this.quizId).subscribe(data=>{
      this.Questions = data;
      console.log(this.Questions);
      this.timer =  this.Questions[0].quiz.numberOfQuestion * 1 * 60;
      // this.Questions.forEach((q:any) => {
      //  q['givenAnswer'] = '';
      // });
    })
    // document.querySelector('html')?.addEventListener('contextmenu',(e)=>{
    //   e.preventDefault();
    // })
    this.startTimer();
  }
  preventBackButton(){
    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Are you Sure?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'submit'
    }).then((result) => {
      if (result.isConfirmed) {
        document.exitFullscreen();
        this.evalution();
      }
    })
  }
  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalution();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTimer(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalution(){
    this._questions.evalQuiz(this.Questions).subscribe((data:any)=>{
      this.isSubmit = true;
      this.CorrectAns = data.CorrectAns;
      this.AttemptedQue = data.AttemptedQue;
      let singleQueMarks = this.Questions[0].quiz.maxMarks/this.Questions[0].quiz.numberOfQuestion;
      this.marksGot = singleQueMarks*this.CorrectAns;
      this.percentage = (this.marksGot/this.Questions[0].quiz.maxMarks)*100;
      console.log(data);
      this.router.navigate(['/certificate/'+this.quizId+"/"+this.AttemptedQue+"/"+this.CorrectAns+"/"+this.percentage]);
    })
    // this.isSubmit = true;
    //     this.marksGot = 0;
    //     this.AttemptedQue =0;
    //     this.Questions.forEach((que:any)=>{
    //       if(que.givenAnswer.trim()!=''){
    //         this.AttemptedQue++;
    //       }
    //       if(que.answer == que.givenAnswer){
    //         this.CorrectAns++;
    //       }
    //     })
    //     console.log(this.Questions[0]);
    //     let singleQueMarks = this.Questions[0].quiz.maxMarks/this.Questions[0].quiz.numberOfQuestion;
    //     this.marksGot = singleQueMarks*this.CorrectAns;
    //     this.percentage = (this.marksGot/this.Questions[0].quiz.maxMarks)*100;
    //     console.log("attemplted = >"+this.AttemptedQue);
    //     console.log("Correct Answer => "+this.CorrectAns);
    //     console.log(this.marksGot+"/"+this.Questions[0].quiz.maxMarks);
  }
  
}
