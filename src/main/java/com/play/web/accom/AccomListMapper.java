package com.play.web.accom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface AccomListMapper {
	public List<TaehyeongResult> list(Map<String,Object> searchMap);
}
