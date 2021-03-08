package com.app.Project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.Project.model.Category;
import com.app.Project.model.Comment;
import com.app.Project.model.User;
import com.app.Project.model.Video;
import com.app.Project.repository.RegistrationRepository;
import com.app.Project.service.CommentService;
import com.app.Project.service.RegistrationService;

@RestController
public class RegistrationController {
	
	@Autowired
	private RegistrationService service;
	
	@Autowired
	RegistrationRepository regrepo;
	
	@CrossOrigin(origins="http://localhost:4200")
	@PostMapping("/registeruser")
	public User registerUser(@RequestBody User user) throws Exception {
		String tempEmailId= user.getEmailId();
			if( (tempEmailId!=null) && !"".equals(tempEmailId)) {
				if(service.fetchUserByEmailId(tempEmailId)!=null) {
					throw new Exception("User Exists");
					}
				}
		
		User userObj=null;
		userObj=service.saveUser(user);
		return userObj;
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@PostMapping("/login")
	public User loginUser(@RequestBody User user) throws Exception {
			String tempEmailId = user.getEmailId();
			String tempPass = user.getPassword();
			User userObj=null;
			if (tempEmailId !=null && tempPass !=null) {
				userObj= service.fetchUserByEmailIdAndPassword(tempEmailId, tempPass);
			}
			if(userObj == null) {
				throw new Exception("User Does Not Exists!!");
			}
			return userObj;
		}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value="/getUser", produces="application/json")
	public List<User> getUser() {
		return service.getUser();
	}
	
	
	
//	@RequestMapping("/user/comments/{id}")
//	public ResponseEntity<List<Comment>> allCommentsFromUser(@PathVariable("id") int id){
//		//System.out.println("INSIDE: "+id);
//		List<Comment> cObj=cService.fetchCommentByUserId(id);
//		System.out.println(cObj);
//		if(cObj==null) {
//			return new ResponseEntity(HttpStatus.NOT_FOUND);
//		}
//		return new ResponseEntity<List<Comment>>(cObj,HttpStatus.OK);
//	}
	
	
}
