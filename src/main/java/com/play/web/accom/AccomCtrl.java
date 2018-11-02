package com.play.web.accom;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.play.web.cmm.Util;
import com.play.web.cmm.Util2;
import com.play.web.mbr.Member;
import com.play.web.mbr.MemberMapper;

@RestController
@RequestMapping("/accom")
public class AccomCtrl {
	static final Logger logger = LoggerFactory.getLogger(AccomCtrl.class);
	@Autowired AccomMapper mpr;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	@Autowired List<Object>lst;
	@Autowired Member mbr;
	@Autowired MemberMapper mbrMap;
	@Resource(name="accomUploadPath")
	private String uploadPath;
	String savedName ="";
	
	@RequestMapping("/detail/{accom_seq}/")
	public @ResponseBody Map<String,Object> retriveAccom(@PathVariable String accom_seq) {
		map.clear();
		map.put("accom_seq", accom_seq);
		map = (HashMap<String, Object>) mpr.retrieveAccommodation(map);
		
		
		return map;
	}
	@PostMapping("/reservation/")
	public @ResponseBody Map<String,Object> retriveReservation
	(@RequestBody Map<String, Object> p){
		lst.clear();
		map.clear();
		lst = mpr.retrieveReservation(p);
		map.put("list", lst);
		return map;
	}
	@PostMapping("/reservation/room/")
	public @ResponseBody Map<String,Object> retriveReservationRoom
	(@RequestBody Map<String, Object> p){
		lst.clear();
		map.clear();
		map = mpr.retrieveReservationRoom(p);
		return map;
	}
	@RequestMapping("/room/{accom_seq}/")
	public @ResponseBody Map<String,Object> listRoom(@PathVariable String accom_seq) {
		map.clear();
		lst.clear();
		map.put("accom_seq", accom_seq);
		lst = mpr.listRoom(map);
		map.put("list", lst);
		return map;
	}
	@RequestMapping("/review/{accom_seq}/{review_count}/")
	public @ResponseBody Map<String,Object> listReview(@PathVariable String accom_seq, @PathVariable int review_count ){
		map.clear();
		lst.clear();
		map.put("accom_seq", accom_seq);
		map.put("review_count_up", String.valueOf((review_count+4)));
		map.put("review_count_down", String.valueOf((review_count)));
		Util.log.accept("이쪽 나오는중"+map.get("review_count_up"));
		Util.log.accept("이쪽 나오는중"+map.get("review_count_down"));
		lst = mpr.listReview(map);
		Util.log.accept("이쪽 나오는중"+lst.toString());
		
		map.put("list", lst);
		return map;
	}
	
	@RequestMapping("/review/accom/")
	public @ResponseBody Map<String,Object> retrieveRoomSeq(@RequestBody Map<String,Object> p){
		lst = mpr.retrieveReviewRoomSeq(p);
		map.put("list", lst);
		return map;
	}
	
	@RequestMapping("/review/add/")
	public void addReview(@RequestBody Map<String,Object> p){
		p.put("board_id", "review");
		mpr.insertReview(p);
	}
	@PostMapping("/payment/")
	public void addPayment(@RequestBody Map<String, Object> p) {
		map.clear();
		mpr.insertReservation(p);
	}
	@PostMapping("/profile/{member_id}")
	public String uploadProfile(MultipartFile files, @PathVariable String member_id) throws Exception {
		map.clear();
		String savedName = uploadPhoto(files.getOriginalFilename(), files.getBytes(), member_id);
		mbr.setProfileimg(savedName);
		mbr.setMember_id(member_id);
		mbrMap.update(mbr);
		return savedName;
	}
	private String uploadPhoto(String originalName, byte[] fileData, String member_id) throws Exception {
		savedName = UUID.randomUUID() + "." + originalName.split("\\.")[1];		
		FileCopyUtils.copy(fileData, new File(uploadPath, savedName));
		return savedName;
	}
}
