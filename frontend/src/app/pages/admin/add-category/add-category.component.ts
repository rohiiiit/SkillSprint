import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category={
      title:'',
      description:'',
  }
  

  constructor(private _category:CategoryService,private router:Router,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  public addCategory(){
    if(this.category.title=="" || this.category.title==null){
      this._snackBar.open("Title is required",'ok',{duration:1500,verticalPosition:'top',horizontalPosition:'right'});
      return;
    }
    this._category.addCategories(this.category).subscribe((data)=>{
      this.router.navigate(["admin/categories"])
      this._snackBar.open("Added Successfully",'ok',{duration:1500,verticalPosition:'top',horizontalPosition:'right'});
    })
  }
}
