package com.play.web.accom;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class HeeTaeBean {
	private String accom_seq, accom_name, accom_addr, 
	accom_phone, accom_business_no, accom_type, accom_date, accom_grade,
	room_seq ,room_name ,room_no ,room_price, 
	room_image1 ,room_image2, room_image3, msg_seq, msg_title,
	msg_content, msg_photo, msg_date, board_id, member_id,
	name, accom_reco, pay_no,
	res_no,checkin_date,checkout_date;
}

