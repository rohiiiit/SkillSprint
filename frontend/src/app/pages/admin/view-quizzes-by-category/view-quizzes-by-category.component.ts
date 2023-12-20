import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes-by-category',
  templateUrl: './view-quizzes-by-category.component.html',
  styleUrls: ['./view-quizzes-by-category.component.css']
})
export class ViewQuizzesByCategoryComponent implements OnInit {

  categoryId=0;
  quizzes:any;
  constructor(private _router:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.categoryId = params['categoryId']
    })
    this._quiz.getQuizzesByCategory(this.categoryId).subscribe((data)=>{
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
