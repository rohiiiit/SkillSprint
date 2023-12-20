import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any;
  constructor(private login:LoginService,private router:Router,private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

}
