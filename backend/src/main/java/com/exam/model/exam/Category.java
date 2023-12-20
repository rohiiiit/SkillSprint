package com.exam.model.exam;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long categoryId;
	private String title;
	@Column(length = 5000)
	private String description;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	@JsonIgnore
	private Set<Quiz> quizzes = new LinkedHashSet<>();
	
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Category(String title, String description) {
		super();
		this.title = title;
		this.description = description;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Set<Quiz> getQuizzes() {
		return quizzes;
	}
	public void setQuizzes(Set<Quiz> quizzes) {
		this.quizzes = quizzes;
	}
	
	
	

}
