package com.exam.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long>{

	List<Quiz> findByCategory(Category category);
	
	List<Quiz> findByActive(boolean b);
	
	List<Quiz> findByCategoryAndActive(Category category,boolean b);

}
