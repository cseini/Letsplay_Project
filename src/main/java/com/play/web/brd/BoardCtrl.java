package com.play.web.brd;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.play.web.cmm.Util;
import com.play.web.cmm.Util2;
import com.play.web.page.Pagination;
import com.play.web.tx.TxService;

@RestController
public class BoardCtrl {
	static final Logger logger = LoggerFactory.getLogger(BoardCtrl.class);
	@Autowired Util2 util2;
	@Autowired Board brd;
	@Autowired BoardMapper brdMap;
	@Autowired Pagination page;
	@Autowired TxService tx;
	@Autowired Map<String,Object> map;
	@Autowired HashMap<String,Object> smap;
	@Resource(name="castUploadPath")
	private String castUploadPath;
	
	@PostMapping("/cast/write/")
	public void write(@RequestBody Board cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","write()");
		cast.setMsg_photo(cast.getMsg_photo());
		brdMap.write(cast);
	}
	
	@PostMapping("/cast/")
	public Map<String,Object> list(@RequestBody Map<String,Object>cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","list");
		map.clear();
		Util.log.accept(cast.get("member_id")+"");
		int count = brdMap.count();
		map.put("countRow",count);
		Util.log.accept("전체카운트"+count);
		if(Integer.parseInt((String) cast.get("pageNumber"))<count) {
			Util.log.accept("페이지 : "+cast.get("pageNumber")+"");
			map.put("pageNumber",Integer.parseInt((String) cast.get("pageNumber")));
			page.carryOut(map);
			map.clear();
			map.put("beginRow", page.getBeginRow());
			map.put("endRow", page.getEndRow());
			map.put("board_id", cast.get("board_id"));
			map.put("member_id", cast.get("member_id"));
			List<Board> ls = brdMap.list(map);
			map.put("list", ls);
			map.put("page", page);
		}
		return map;
	}
	
	@GetMapping("/cast/read/{seq}")
	public HashMap<String, Object> read(@PathVariable int seq){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","read()");
		brd.setMsg_seq(seq);
		brdMap.readInc(seq);
		return brdMap.read(brd);
	}
	
	@PostMapping("/cast/modify/")
	public void modify(@RequestBody Board cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","modify()");
		Util.log.accept("msg_title : "+cast.getMsg_title()+"");
		brdMap.modify(cast);;
	}
	
	@GetMapping("/cast/delete/{board_id}/{msg_seq}")
	public void delete(@PathVariable String board_id, @PathVariable int msg_seq){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","replyDelete()");
		brd.setBoard_id(board_id);
		brd.setMsg_seq(msg_seq);
		brdMap.delete(brd);;
	}

	@PostMapping("/cast/reWrite/")
	public void reWrite(@RequestBody Board cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","replyWrite()");
		Util.log.accept(cast+"");
		/*brdMap.reSeqInc();*/
		brdMap.reWrite(cast);;
	}
	
	@GetMapping("/cast/reply/{board_id}/{seq}")
	public Map<String,Object> replyRead(@PathVariable String board_id, @PathVariable int seq){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","replyRead()");
		brd.setMsg_ref(seq);
		brd.setBoard_id(board_id);
		brd.setBoard_depth(1);
		List<Board> ls = brdMap.reply(brd);
		map.clear();
		map.put("list", ls);
		return map;
	}
	
	@GetMapping("/cast/rereply/{board_id}/{seq}")
	public Map<String,Object> rereplyRead(@PathVariable String board_id, @PathVariable int seq){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","rereplyRead()");
		brd = new Board();
		brd.setMsg_ref(seq);
		brd.setBoard_id(board_id);
		brd.setBoard_depth(2);
		List<Board> ls = brdMap.reply(brd);
		map.clear();
		map.put("list", ls);
		return map;
	}
	
	@PostMapping("/cast/reModify/")
	public void reModify(@RequestBody Board cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","replyModify()");
		Util.log.accept(cast+"");
		brdMap.reModify(cast);
	}
	
	
	@GetMapping("/cast/reDelete/{board_id}/{msg_seq}")
	public void reDelete( @PathVariable String board_id, @PathVariable int msg_seq){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","replyDelete()");
		brd.setBoard_id(board_id);
		brd.setMsg_seq(msg_seq);
		brdMap.reDelete(brd);;
	}
	
	@GetMapping("/cast/likeInc/{msg_seq}/{member_id}")
	public void likeInc(@PathVariable int msg_seq,@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","likeInc()");
		brdMap.likeInc(msg_seq);
		smap.clear();
		smap.put("member_id", member_id);
		smap.put("msg_seq", msg_seq);
		smap.put("saved_unique", member_id+'_'+msg_seq);
		brdMap.likeInc(msg_seq);
		brdMap.saveLike(smap);
	}
	
	@GetMapping("/cast/likeDes/{msg_seq}/{member_id}")
	public void likeDes(@PathVariable int msg_seq,@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","likeDes()");
		smap.clear();
		smap.put("member_id", member_id);
		smap.put("msg_seq", msg_seq);
		smap.put("saved_unique", member_id+'_'+msg_seq);
		brdMap.likeDes(msg_seq);
		brdMap.deleteLike(smap);
	}
	
	@PostMapping("/cast/upload/")
	public String uploadProfile(MultipartFile files) throws Exception {
		logger.info("\n--------- BoardCtrl {} !!-----","upload()");
		map.clear();
		String msg_photo = uploadPhoto(files.getOriginalFilename(), files.getBytes());
		brd.setMsg_photo(msg_photo);
		return msg_photo;
	}
	
	private String uploadPhoto(String originalName, byte[] fileData) throws Exception {
		logger.info("\n--------- BoardCtrl {} !!-----","uploadFile()");
		String savedName ="";
		UUID uuid = UUID.randomUUID();
		savedName = uuid + "." + originalName.split("\\.")[1];		
		FileCopyUtils.copy(fileData, new File(castUploadPath, savedName));
		Util.log.accept(castUploadPath+savedName);
		return savedName;
	}
	
	@PostMapping("/cast/check/")
	public HashMap<String, Object> check(@RequestBody HashMap<String, Object> x){
		logger.info("\n--------- BoardCtrl {} !!-----","check()");
		return brdMap.check(x);
	}

}
