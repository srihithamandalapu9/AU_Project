package com.app.Project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Project.model.Category;
import com.app.Project.model.Comment;
import com.app.Project.repository.CategoryRepository;

@SuppressWarnings("unused")
@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository catRepo;
	
	public Category saveCategory(Category cat) {
		return catRepo.save(cat);
	}
	
	public List<Category> getCategory(){
		return catRepo.findAll();
	}

	public Category fetchCategorybyId(int catId) {
		return catRepo.findById(catId);
	}
	
	public Category findCategoryByName(String name) {
		return catRepo.findByCategoryName(name);
	}

}