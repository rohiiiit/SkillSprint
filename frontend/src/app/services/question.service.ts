import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsByQuiz(quizId:number){
    return this.http.get(`${baseUrl}/Question/quiz/${quizId}`)
  }

  public getAllQuestionsByQuiz(quizId:number){
    return this.http.get(`${baseUrl}/Question/admin/quiz/${quizId}`)
  }

  public addQuestion(Question:any){
    return this.http.post(`${baseUrl}/Question/`,Question);
  }

  public deleteQuestion(questionId:number){
    return this.http.delete(`${baseUrl}/Question/${questionId}`)
  }

  public evalQuiz(Questions:any){
    return this.http.post(`${baseUrl}/Question/eval-quiz`,Questions);
  }
}
