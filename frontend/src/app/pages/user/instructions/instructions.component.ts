import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  quizId=0;
  Quiz:any;
  element = document.documentElement;
  constructor(private _router:ActivatedRoute,private _quiz:QuizService,private router:Router) { }

  ngOnInit(): void {
    this._router.params.subscribe((params)=>{
      this.quizId = params['quizId']
    })
    this._quiz.getQuiz(this.quizId).subscribe(data=>{
      this.Quiz = data;
    })
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you Want Start the Test?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'start'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/start/"+this.quizId])
        this.element.requestFullscreen();
      }
    })
   
  }
}
