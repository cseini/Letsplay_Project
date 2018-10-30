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
		Util.log.accept("체크인 날짜 : "+p.get("checkin_date"));
		Util.log.accept("체크아웃 날짜 : "+p.get("checkout_date"));
		Util.log.accept("숙소 시퀀스  : "+p.get("accom_seq"));
		lst = mpr.retrieveReservation(p);
		Util.log.accept("담긴 lst"+lst.toString());
		map.put("list", lst);
		return map;
	}
	@PostMapping("/reservation/room/")
	public @ResponseBody Map<String,Object> retriveReservationRoom
	(@RequestBody Map<String, Object> p){
		lst.clear();
		map.clear();
		Util.log.accept("체크인 날짜 : "+p.get("checkin_date"));
		Util.log.accept("체크아웃 날짜 : "+p.get("checkout_date"));
		Util.log.accept("객실 시퀀스  : "+p.get("room_seq"));
		map = mpr.retrieveReservationRoom(p);
		Util.log.accept("담긴 room_map"+map.toString());
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
	@RequestMapping("/addReview/")
	public @ResponseBody Map<String,Object> addReview(@RequestBody Map<String,String> p){
		
		return map;
	}
	@PostMapping("/payment/")
	public void addPayment(@RequestBody Map<String, Object> p) {
		map.clear();
		Util.log.accept("페이먼트 들어온 맵"+p.toString());
		mpr.insertReservation(p);
	}
}
