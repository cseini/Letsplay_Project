package com.play.web.accom;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public interface AccomMapper {
	public Map<String, Object> retrieveAcom(Map<String, Object> p);
	public Map<String,Object> retrieveretrieveAcomReservation(Map<String, Object> p);
	public boolean retrieveReservationStartDate(Map<String, Object> p);
	public boolean retrieveReservationEndDate(Map<String, Object> p);
	public List<Object> listRoom(Map<String, Object> p);
	public List<Object> listReview(Map<String, Object> p);
	public int count(Map<String, Object> p);
	public void insertReview(Map<String, Object> p);
	public void insertReservation(Map<String, Object> p);
	public void insertPayment(Map<String, Object> p);
	public void delete(Map<String, Object> p);
}
