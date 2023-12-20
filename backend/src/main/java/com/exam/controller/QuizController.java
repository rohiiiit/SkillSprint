package com.exam.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.CategoryService;
import com.exam.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	@PatchMapping("/")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getQuizzes(){
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	@GetMapping("/{quizId}")
	public Quiz getQuiz(@PathVariable Long quizId) {
		return this.quizService.getQuiz(quizId);
	}
	
	@GetMapping("/category/{categoryId}")
	public List<Quiz> getQuizOfCategory(@PathVariable Long categoryId){
		Category category = this.categoryService.getCategory(categoryId);
		List<Quiz> quizzes = this.quizService.getQuizByCategory(category);
		return quizzes;
	}
	
	@DeleteMapping("/{quizId}")
	public void deleteQuiz(@PathVariable Long quizId) {
		this.quizService.deleteQuiz(quizId);
	}
	
//	get Active Quizzes
	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes(){
		return this.quizService.getActiveQuizzes();
	}
	
	@GetMapping("/category/active/{categoryId}")
	public List<Quiz> getActiveQuizzesByCategory(@PathVariable Long categoryId){
		Category category = new Category();
		category.setCategoryId(categoryId);
		return this.quizService.getActiveQuizzesOfCategory(category);
	}

}
