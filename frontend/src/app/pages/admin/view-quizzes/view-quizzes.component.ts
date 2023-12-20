import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any;
  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.getAllQuiz().subscribe((data)=>{
      this.quizzes = data;
    })
  }

  removeQuiz(quizId:number){
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
        this._quiz.removeQuiz(quizId).subscribe(()=>{
          this._quiz.getAllQuiz().subscribe((data)=>{
            this.quizzes = data;
          })
        },(error)=>{
          console.log(error);
        })
        Swal.fire({
          icon: 'success',
          title: 'Quiz Removed',
          timer: 1500
        })
      }
    })
  }
  

}
