package com.app.Project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Project.model.Likes;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Integer>  {


}
