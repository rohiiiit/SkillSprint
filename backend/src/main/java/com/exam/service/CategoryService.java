package com.exam.service;

import java.util.Optional;
import java.util.Set;

import com.exam.model.exam.Category;

public interface CategoryService {

	public Category addCategory(Category category);

	public Category updateCategory(Category category);

	public Set<Category> getCategories();

	public Category getCategory(Long categoryId);

	public Category getCategoryByTitle(String title);

	public void deleteCategory(Long categoryId);
}
