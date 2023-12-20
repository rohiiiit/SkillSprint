import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private _router:ActivatedRoute,private _quiz:QuizService) { }
  categoryId=0;
  Quiz:any;
  ngOnInit(): void {
    this._router.params.subscribe((params)=>{
      this.categoryId = params['categoryId'];
      if(this.categoryId==0){
        this._quiz.getActiveQuizzes().subscribe((data)=>{
          this.Quiz = data;
        })
      }else{
        this._quiz.getActiveQuizzesByCategory(this.categoryId).subscribe((data)=>{
          this.Quiz = data;
          console.log(data);
        })
      }
    })
    
  }

}
