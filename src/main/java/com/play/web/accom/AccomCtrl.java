package com.play.web.accom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.play.web.cmm.Util2;

@RestController
@RequestMapping("/accom")
public class AccomCtrl {
	static final Logger logger = LoggerFactory.getLogger(AccomCtrl.class);
	@Autowired HeeTaeBean hht;
	@Autowired AccomMapper mpr;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	@Autowired List<Object>lst;
	
	@RequestMapping("/detail/{accom_seq}/")
	public @ResponseBody Map<String,Object> retriveAccom(@PathVariable String accom_seq) {
		hht.setAccom_seq(accom_seq);
		map = (HashMap<String, Object>) mpr.retrieveAcom(hht);
		return map;
	}
	@RequestMapping("/room/{accom_seq}/")
	public @ResponseBody Map<String,Object> listRoom(@PathVariable String accom_seq) {
		hht.setAccom_seq(accom_seq);
		lst = mpr.listRoom(hht);
		map.put("list", lst);
		return map;
	}
	@RequestMapping("/review/{accom_seq}")
	public @ResponseBody Map<String,Object> listtReview(@PathVariable String accom_seq){
		hht.setAccom_seq(accom_seq);
		lst = mpr.listRoom(hht);
		map.put("list", lst);
		return map;
	}
	@RequestMapping("/addReview/")
	public @ResponseBody Map<String,Object> addReview(@RequestBody Map<String,String> p){
		
		return map;
	}
}
