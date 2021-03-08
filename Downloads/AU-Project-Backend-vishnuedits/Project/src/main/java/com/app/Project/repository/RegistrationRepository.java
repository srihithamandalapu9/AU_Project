package com.app.Project.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.Project.model.Comment;
import com.app.Project.model.Likes;
import com.app.Project.model.ReportedComments;
import com.app.Project.model.User;

import org.springframework.stereotype.Repository;

import com.app.Project.model.Likes;
import com.app.Project.model.User;

@Repository
public interface RegistrationRepository extends JpaRepository<User, Integer> {

	public User findByEmailId(String emailId);
	public User findByEmailIdAndPassword(String emailId, String password);
	public User findById(int id);
//	@Query( "select o from MyObject o where inventoryId in :ids" )
//	List<MyObject> findByInventoryIds(@Param("ids") List<Long> inventoryIdList);
//	@Query("select * from User where :comment in :ids")
//	User findByCommentIn(@Param("ids") Set<Comment> commentSet, @Param("comment") Comment com);
	
	public User findByComment(Comment com);
	//public User findByReportedComments(ReportedComments com);
	//public List<User> findByReportedComments(ReportedComments com);
	public List<User> findByReportedCom(ReportedComments com);
	
//	 @Query("select id,emailId,firstName from User")
//	    List<User> getUser();
}
