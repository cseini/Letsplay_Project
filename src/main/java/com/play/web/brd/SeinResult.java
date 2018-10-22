package com.play.web.brd;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class SeinResult {
	private Integer msg_seq;
	private String msg_title;
	private String msg_photo;
	private String msg_date;
	private Integer msg_count;
	private String msg_content;
	private Integer bookmark_count;
	private Integer subscription_count;
	private Integer board_depth;
	private String board_id;
	private String member_id;
	private String pay_no;
	private String tag;
	private Integer like_count;
	private Integer reply_count;
	private String name, password, birthdate, joindate, gender, age, phone, customer_grade, point, nickname, address, zipcode, profileimg;
	int countRow, pageNumber,beginRow, endRow, pageSize, blockSize, pageCount, blockCount, beginPage, endPage, prevBlock, nextBlock, lastBlockPage;
	boolean existPrev, existNext;
}
