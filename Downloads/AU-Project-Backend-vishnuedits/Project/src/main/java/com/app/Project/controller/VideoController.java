package com.app.Project.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.app.Project.service.CategoryService;
import com.app.Project.service.RegistrationService;
import com.app.Project.service.VideoService;


@RestController
public class VideoController {
	
	@Autowired
	private RegistrationService service;
	
	@Autowired
	private CategoryService cservice;
	
	
	@Autowired
	private VideoService vservice;
	
	@CrossOrigin(origins="http://localhost:4200")
	@PostMapping("/upload/{id}/{catName}")
	public Video postRequest(@RequestBody Video video, @PathVariable("id") int userId, @PathVariable("catName") String catName) {
		Video videoObj=null;
		videoObj=vservice.saveVideo(video);
		Category catObj= cservice.findCategoryByName(catName);
		if(catObj==null) {
			catObj=new Category();
			catObj.setCategoryName(catName);
		}
		Set<Category> catOfThisVideo = videoObj.getCat();
		catOfThisVideo.add(catObj);
		videoObj.setCat(catOfThisVideo);
		vservice.saveVideo(videoObj);
		Set<Video> allVideosOfThisCat=catObj.getVid();
		allVideosOfThisCat.add(videoObj);
		catObj.setVid(allVideosOfThisCat);
		Set<User> allUsersOfThisCat=catObj.getUser();
		allUsersOfThisCat.add(service.fetchUserById(userId));
		catObj.setUser(allUsersOfThisCat);
		cservice.saveCategory(catObj);
		service.updateUser(userId, videoObj);
		return videoObj;
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value="/getAllVids", produces="application/json")
	public List<Video> getAllVideos(){
		
		List<Video> approvedVids=vservice.getApprovedVideos();
//		int n=approvedVids.size();
//		System.out.println(n);
		
		return approvedVids;
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value="/play/{id}",produces = "application/json")
	public String read(@PathVariable("id") int videoId) {
		Video vObj= vservice.getVideo(videoId);
		Set<Comment> setOfComments= vObj.getComment();
		if(setOfComments.size()==0) {
			return vObj.toString();
		}
		Comment cObj=setOfComments.iterator().next();
		User uObj=service.getUserByCom(cObj);
		String userNameOnComment= uObj.getFirstName()+" "+uObj.getLastName();
		
		JSONObject jsonObj = new JSONObject( vObj );
		System.out.println("\n\n");
		Iterator<String> keys = jsonObj.keys();
		while(keys.hasNext()) {
		    String key = keys.next();		    
		    if(key.equals("comment")) {
		    	JSONArray modi= (JSONArray) jsonObj.get(key);
		    	int numberOfComments=modi.length();
		    	for(int i=0;i<numberOfComments;i++) {
		    		JSONObject toModi=(JSONObject) modi.get(i);
			    	toModi.put("Commentor", userNameOnComment);
		    	}
		    }
		}
		return jsonObj.toString();
	}
}