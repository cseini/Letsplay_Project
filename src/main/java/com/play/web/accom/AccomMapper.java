package com.play.web.accom;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public interface AccomMapper {
	public Map<String, Object> retrieveAcom(HeeTaeBean p);
	public List<Object> listRoom(HeeTaeBean p);
	public List<Object> listReview(HeeTaeBean p);
	public int count(HeeTaeBean p);
	public boolean retrieveReservationStartDate(HeeTaeBean p);
	public boolean retrieveReservationEndDate(HeeTaeBean p);
	public void insertReview(HeeTaeBean p);
	public void delete(HeeTaeBean p);
}
