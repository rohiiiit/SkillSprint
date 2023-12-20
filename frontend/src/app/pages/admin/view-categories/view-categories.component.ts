import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any;
  quizzes:any;
  constructor(private _category:CategoryService,private _quiz:QuizService,private router:Router) { 
    
  }

  ngOnInit(): void {
    this._category.getCategories().subscribe((data:any)=>{
      this.categories = data;
      // console.log(data);
    },(error)=>{
      Swal.fire("Error !!","Error in loading data",'error')
    }
    )
  }
  removeCategory(categoryId:number){
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
        this._category.removeCategory(categoryId).subscribe(()=>{
          this._category.getCategories().subscribe((data)=>{
            this.categories = data;
          });
          console.log("Category Deleted");
        })
        Swal.fire({
          icon: 'success',
          title: 'Category Removed',
          timer: 1500
        })
      }
    })
  }

  getQuizzes(categoryId:number){
    this._quiz.getQuizzesByCategory(categoryId).subscribe((data)=>{
      this.quizzes=data;
      console.log(data);
      this.router.navigate(['admin/quizzes'],this.categories.categoryId);
    })
  }

}
