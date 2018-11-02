package com.play.web.accom;

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

import com.play.web.cmm.Util2;

@RestController
public class AccomCtrl {
	static final Logger logger = LoggerFactory.getLogger(AccomCtrl.class);
	@Autowired AccomMapper mpr;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	@Autowired List<Object>lst;
	
	@RequestMapping("/accom/detail/{accom_seq}/")
	public @ResponseBody Map<String,Object> retriveAccom(@PathVariable String accom_seq) {
		map.clear();
		map.put("accom_seq", accom_seq);
		map = (HashMap<String, Object>) mpr.retrieveAccommodation(map);
		
		
		return map;
	}
	@PostMapping("/accom/reservation/")
	public @ResponseBody Map<String,Object> retriveReservation
	(@RequestBody Map<String, Object> p){
		lst.clear();
		map.clear();
		lst = mpr.retrieveReservation(p);
		map.put("list", lst);
		return map;
	}
	@PostMapping("/accom/reservation/room/")
	public @ResponseBody Map<String,Object> retriveReservationRoom
	(@RequestBody Map<String, Object> p){
		lst.clear();
		map.clear();
		map = mpr.retrieveReservationRoom(p);
		return map;
	}
	@RequestMapping("/accom/room/{accom_seq}/")
	public @ResponseBody Map<String,Object> listRoom(@PathVariable String accom_seq) {
		map.clear();
		lst.clear();
		map.put("accom_seq", accom_seq);
		lst = mpr.listRoom(map);
		map.put("list", lst);
		return map;
	}
	@RequestMapping("/accom/review/{accom_seq}")
	public @ResponseBody Map<String,Object> listReview(@PathVariable String accom_seq){
		map.clear();
		lst.clear();
		map.put("accom_seq", accom_seq);
		lst = mpr.listReview(map);
		map.put("list", lst);
		return map;
	}
	
	@RequestMapping("/accom/review/accom/")
	public @ResponseBody Map<String,Object> retrieveRoomSeq(@RequestBody Map<String,Object> p){
		lst = mpr.retrieveReviewRoomSeq(p);
		map.put("list", lst);
		return map;
	}
	
	@RequestMapping("/accom/review/add/")
	public @ResponseBody Map<String,Object> addReview(@RequestBody Map<String,Object> p){
		
		return map;
	}
	@PostMapping("/accom/payment/")
	public void addPayment(@RequestBody Map<String, Object> p) {
		map.clear();
		mpr.insertReservation(p);
	}
	@PostMapping("/taehyeong/search")
	public @ResponseBody HashMap<String,Object> search(@RequestBody HashMap<String,Object>searchMap){
	map.clear();
	map.put("list", mpr.list(searchMap));
	map.put("checkin_date", searchMap.get("checkin_date"));
	map.put("checkout_date", searchMap.get("checkout_date"));
	map.put("accom_addr", searchMap.get("accom_addr"));
	map.put("accom_type", searchMap.get("accom_type"));
	map.put("imageSrc", searchMap.get("imageSrc"));
	return map;
	}

	@PostMapping("/taehyeong/lowPriceList")
	public @ResponseBody HashMap<String,Object> lowPriceList(@RequestBody HashMap<String,Object> priceMap){
		map.clear();
		map.put("list", mpr.lowList(priceMap));
		map.put("accom_type", priceMap.get("accom_type"));
		map.put("accom_addr", priceMap.get("accom_addr"));
		map.put("checkin_date", priceMap.get("checkin_date"));
		map.put("checkout_date", priceMap.get("checkout_date"));
		map.put("imageSrc", priceMap.get("imageSrc"));
		System.out.println(priceMap);
		System.out.println(map.get("list"));
		return map;
	}
}
