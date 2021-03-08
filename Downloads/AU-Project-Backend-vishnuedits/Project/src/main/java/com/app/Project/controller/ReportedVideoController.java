package com.app.Project.controller;

import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.Project.model.Comment;
import com.app.Project.model.ReportedComments;
import com.app.Project.model.ReportedVideos;
import com.app.Project.model.User;
import com.app.Project.model.Video;
import com.app.Project.service.RegistrationService;
import com.app.Project.service.ReportedVideoService;
import com.app.Project.service.VideoService;

@RestController
public class ReportedVideoController {
	@Autowired
	private ReportedVideoService repvidservice;
	
	@Autowired
	RegistrationService rservice;
	
	@Autowired
	VideoService vservice;
	
	@CrossOrigin(origins="http://localhost:4200")
	@PostMapping("/reportcomment")
	public ReportedVideos uploadReportedVideo(@RequestBody ReportedVideos repvid) {
		ReportedVideos repvidObj=null;
		repvidObj=repvidservice.saveReportedVideos(repvid);
		return repvidObj;
	}
	/*
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping(value="/getReportedVideos", produces="application/json")
	public String getReportedComments() {
		
		List<ReportedVideos> allReportedCom=repvidservice.getReportedVideos();
		
		JSONArray ja = new JSONArray();
		for(ReportedComments reportedCom: allReportedCom) {
			List<User> uObj=(List<User>) rservice.getUserByRepCom(reportedCom);
			Comment comObj=cservice.getCommentByRepComId(reportedCom);
			Video videoObj=vservice.getVideoByComment(comObj);
			for(User u: uObj) {
				String userNameWhoReportedComments= u.getFirstName()+" "+u.getLastName();
				int comment=comObj.getCommentId();
				System.out.println(u.getFirstName()+" "+comObj.getCommentDesc()+" ");
				JSONObject obj = new JSONObject();
				obj.put("firstName",u.getFirstName());
				obj.put("lastName",u.getLastName());
				obj.put("commentDesc", comObj.getCommentDesc());
				obj.put("commentId", comObj.getCommentId());
				obj.put("videoId", videoObj.getVideoId());
				obj.put("videoTitle", videoObj.getVideoTitle());
				obj.put("videoLink", videoObj.getVideoLink());
				ja.put(obj);
				
				
			}
		}
		System.out.println(ja);
		return ja.toString();
	}*/
		/*
		 //Set<Comment> setOfComments= ;
		List<Comment> comObj=cservice.fetchAllComment();
		System.out.println(comObj);
		List<User> userObj=rservice.getUser();
		Set<ReportedComments> setOfReportedComments = null; 
		for(User u: userObj) {
			if(u.getReportedCom().size()>0) {
				for(ReportedComments rep: u.getReportedCom()) {
					User uObj=rservice.getUserByRepCom(rep);
					
						
				}
				//setOfReportedComments.addAll(u.getReportedCom());
				//System.out.println("a"+u.getReportedCom());
			}
		}
		
		//Comment cObj=setOfComments.iterator().next();
		return repcomObj;*/
	
	
	
	@CrossOrigin(origins="http://localhost:4200")
	@GetMapping("/reportVideo/{videoId}/{userId}")
	public void postRequest(@PathVariable("videoId") int videoId, @PathVariable("userId") int userId) {
		ReportedVideos repvidObj=new ReportedVideos();
		User uObj=rservice.fetchUserById(userId);
		Video vObj=vservice.getVideo(videoId);
		Set<ReportedVideos> setOfReportedVideoByUser=uObj.getReportedVid();
		Set<ReportedVideos> setOfReportedVideo=vObj.getReportedVid();
		setOfReportedVideoByUser.retainAll(setOfReportedVideo);
		int isReported=setOfReportedVideoByUser.size();
		//System.out.println(isLiked);
		if(isReported==0) {
			repvidservice.saveReportedVideos(repvidObj);
			rservice.updateReportedVideo(userId, repvidObj);
			vservice.updateReportedVideo(videoId,repvidObj);
		}
	
	}
	
	
}
