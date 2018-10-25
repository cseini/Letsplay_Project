package com.play.web.accom;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccomListController {
@Autowired AccomListMapper acm;
@Autowired HashMap<String,Object> map;
@Autowired TaehyeongResult tr;


@PostMapping("/taehyeong/search")
public @ResponseBody HashMap<String,Object> search(@RequestBody HashMap<String,Object>searchMap){
	map.clear();
	List<TaehyeongResult> list = acm.list(searchMap);
	System.out.println(list.size());
	System.out.println(list.get(0));
	searchMap.clear();
	searchMap.put("list", list);
	return searchMap;
	}
}
