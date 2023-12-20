import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getQuiz(quizId:any){
    return this.http.get(`${baseUrl}/quiz/${quizId}`)
  }

  public getQuizzesByCategory(categoryId:number){
    return this.http.get(`${baseUrl}/quiz/category/${categoryId}`)
  }

  public getAllQuiz(){
    return this.http.get(`${baseUrl}/quiz/`)
  }

  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public removeQuiz(quizId:number){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`)
  }

  public updateQuiz(Quiz:any){
    return this.http.patch(`${baseUrl}/quiz/`,Quiz)
  }

  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`)
  }

  public getActiveQuizzesByCategory(categoryId:number){
    return this.http.get(`${baseUrl}/quiz/category/active/${categoryId}`)
  }
}
