import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getCategories(){
    return this.http.get(`${baseUrl}/category/`)
  }

  public addCategories(category:any){
    return this.http.post(`${baseUrl}/category/`,category)
  }

  public removeCategory(categoryId:any){
    return this.http.delete(`${baseUrl}/category/${categoryId}`)
  }

  public updateCategory(category:any){
    return this.http.patch(`${baseUrl}/category/`,category);
  }
}
