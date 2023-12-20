package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import com.fasterxml.jackson.annotation.JsonIgnore;


@RestController
@RequestMapping("/Question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	@PutMapping("/")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	@GetMapping("/admin/quiz/{quizId}")
	public ResponseEntity<?> getAllQuestionOfQuiz(@PathVariable Long quizId){
		Quiz quiz = this.quizService.getQuiz(quizId);
		Set<Question> questions = this.questionService.getQuestionsOfQuiz(quiz);
		List list = new ArrayList(questions);
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getQuestionOfQuiz(@PathVariable Long quizId){
		Quiz quiz = this.quizService.getQuiz(quizId);
		Set<Question> questions = this.questionService.getQuestionsOfQuiz(quiz);
		List<Question> list = new ArrayList(questions);
		if(list.size()>Integer.parseInt(quiz.getNumberOfQuestion())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion()));
		}
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/{questionId}")
	public Question getQuestion(@PathVariable Long questionId) {
		return this.questionService.getQuestion(questionId);
	}
	
	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable Long questionId) {
		this.questionService.deleteQuestion(questionId);
	}
	
//	Evalution of Quiz Server side
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalution(@RequestBody List<Question> questions){
		Integer CorrectAns = 0;
		Integer AttemptedQue = 0;
		for(Question q : questions) {
			if(q.getAnswer().equalsIgnoreCase(q.getGivenAnswer())) {
				CorrectAns++;
			}
			if(q.getGivenAnswer()!=null) {
				AttemptedQue++;
			}
		}
		Map<String, Object> map = Map.of("CorrectAns",CorrectAns,"AttemptedQue",AttemptedQue); 
		return ResponseEntity.ok(map);
	}
}
