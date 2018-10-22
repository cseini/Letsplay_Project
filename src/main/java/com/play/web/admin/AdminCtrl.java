package com.play.web.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminCtrl {
	//@Autowired MemberAge mbrAge;
	@Autowired AdminMapper admMap;
	@Autowired Map<String, Object> map;
	
	@RequestMapping("/count")
	public Map<String, Object> byAgeList(){
		map.clear();
		//System.out.println("admin controller 진입");
		List<HashMap<String, Object>> byAge = admMap.getAgeCnt();
		//System.out.println("연령대별 회원 리스트 " + byAge);
		//map.put("memberAge", byAge.get(0).get("memberAge"));
		map.put("list", byAge);
		return map;
	}
	
	@RequestMapping("/payTypeCount")
	public Map<String, Object> payTypeList(){
		map.clear();
		List<HashMap<String,Object>> byPayType = admMap.getPayType();
		map.put("payType", byPayType);
		return map;
	}
	
	@RequestMapping("/quarter")
	public Map<String, Object> byBookQuarter(){
		map.clear();
		List<HashMap<String, Object>> byQuarter = admMap.getQuarter();
		System.out.println(byQuarter);
		System.out.println(byQuarter.get(0).get("bookCount"));
		System.out.println(byQuarter.get(1).get("bookCount"));
		System.out.println(byQuarter.get(2).get("bookCount"));
		System.out.println(byQuarter.get(3).get("bookCount"));
		System.out.println(byQuarter.get(4).get("bookCount"));
		map.put("booked", byQuarter);
		return map;
	}
	
	@RequestMapping("/accomCount")
	public Map<String, Object> byAccomType(){
		map.clear();
		List<HashMap<String, Object>> byAccom = admMap.getAccomCnt();
		map.put("accomType", byAccom);
		return map;
	}
	
	@RequestMapping("/genderCount")
	public Map<String, Object> byGenderType(){
		map.clear();
		List<HashMap<String, Object>> byGender = admMap.getGenderCnt();
		System.out.println(byGender);
		map.put("genderType", byGender);
		return map;
	}
}
