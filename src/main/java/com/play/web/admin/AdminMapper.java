package com.play.web.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository
public interface AdminMapper {
	public List<HashMap<String,Object>> getAgeCnt ();
	public List<HashMap<String,Object>> getPayType ();
	public List<HashMap<String,Object>> getQuarter ();
	public List<HashMap<String,Object>> getAccomCnt ();
	public List<HashMap<String,Object>> getGenderCnt ();
	public List<HashMap<String,Object>> getTopLocal ();
}
