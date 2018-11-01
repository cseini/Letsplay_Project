package com.play.web.accom;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.play.web.cmm.Util;
import com.play.web.cmm.Util2;

@RestController
@RequestMapping("/accom")
public class AccomCtrl {
	static final Logger logger = LoggerFactory.getLogger(AccomCtrl.class);
	@Autowired AccomMapper mpr;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	@Autowired List<Object>lst;
	
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
	@RequestMapping("/review/{accom_seq}")
	public @ResponseBody Map<String,Object> listReview(@PathVariable String accom_seq){
		map.clear();
		lst.clear();
		map.put("accom_seq", accom_seq);
		lst = mpr.listReview(map);
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
	public @ResponseBody Map<String,Object> addReview(@RequestBody Map<String,Object> p){
		
		return map;
	}
	@PostMapping("/payment/")
	public void addPayment(@RequestBody Map<String, Object> p) {
		map.clear();
		mpr.insertReservation(p);
	}
}
