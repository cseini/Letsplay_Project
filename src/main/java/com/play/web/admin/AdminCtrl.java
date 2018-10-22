package com.play.web.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminCtrl {
	@Autowired MemberAge mbrAge;
	@Autowired AdminMapper admMap;
	@Autowired Map<String, Object> map;
	
	@RequestMapping("/count")
	public Map<String, Object> byAgeList(){
		map.clear();
		//System.out.println("admin controller 진입");
		List<MemberAge> byAge = admMap.getAgeCnt();
		//System.out.println("연령대별 회원 리스트 " + byAge);
		map.put("list", byAge);
		return map;
		
	}
}
