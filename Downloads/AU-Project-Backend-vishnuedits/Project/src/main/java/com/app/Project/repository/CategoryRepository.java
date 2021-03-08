package com.app.Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Project.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	public Category findById(int catId);
	public Category findByCategoryName(String name);
}
