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
	@PostMapping("/reservation/")
	public @ResponseBody Map<String,Object> retriveReservation
	(@RequestBody Map<String, Object> p){
		lst.clear();
		try {
			int count = 0;
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date start = df.parse((String)p.get("start"));
			Date end = df.parse((String)p.get("end"));
			Calendar cal = Calendar.getInstance();
			long diff = end.getTime() - start.getTime();
			long diffDays = diff/(24 * 60 * 60 * 1000);
			hht.setCheckout_date((String)p.get("end"));
			
			for (Object i : ((List<Object>) p.get("room_seq"))) {
				cal.setTime(start);
				hht.setCheckin_date(df.format(cal.getTime()));
				hht.setRoom_seq(String.valueOf(i));
				lst.add(true);
				for(int j=0; j<diffDays; j++) {
					boolean s = mpr.retrieveReservationStartDate(hht);
					boolean e = mpr.retrieveReservationEndDate(hht);
					Util.log.accept("룸 시퀀스 : "+hht.getRoom_seq());
					
					if(s && e) {
						lst.set(count, true);
					}else {
						lst.set(count, false);
						Util.log.accept("멈춤");
						break;
					}
					cal.add(Calendar.DATE, 1);
				}
				count++;
				Util.log.accept("실행중인 날짜 : "+df.format(cal.getTime()));
			}
			map.put("reservation",lst);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
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
	public @ResponseBody Map<String,Object> listReview(@PathVariable String accom_seq){
		hht.setAccom_seq(accom_seq);
		lst = mpr.listReview(hht);
		map.put("list", lst);
		return map;
	}
	@RequestMapping("/addReview/")
	public @ResponseBody Map<String,Object> addReview(@RequestBody Map<String,String> p){
		
		return map;
	}
}
