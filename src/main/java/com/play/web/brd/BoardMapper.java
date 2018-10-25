package com.play.web.brd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface BoardMapper {
	public void write(Board vo);
	public List<Board> list(Map<String,Object>map);
	public HashMap<String,Object> read(Board vo);
	public void modify(Board vo);
	public void delete(Board vo);
	
	public List<Board> reply(Board vo);
	public void reWrite(Board vo);
	public void reModify(Board vo);
	public void reDelete(Board vo);
	public int count();
	
	public void readInc(int seq);
	public void likeInc(int seq);
	public void likeDes(int seq);
	public void saveLike(HashMap<String, Object>map);
	public void deleteLike(HashMap<String, Object>map);
  
	public HashMap<String,Object> check(HashMap<String, Object>map);
	
	public void room(Board vo);
}
