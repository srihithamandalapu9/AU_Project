package com.app.Project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Project.model.Comment;
import com.app.Project.model.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {
	public Video save(Video video);
	public Video findById(int id);
	public List<Video> findByIsApproved(String s);
	public Video findByComment(Comment comObj);
}
