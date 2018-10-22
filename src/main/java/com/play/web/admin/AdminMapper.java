package com.play.web.admin;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository
public interface AdminMapper {
	public List<MemberAge> getAgeCnt ();
}
