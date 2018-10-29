package com.play.web.brd;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
	@Autowired SeinResult sr;
	@Autowired TxService tx;
	@Autowired Map<String,Object> map;
	@Autowired HashMap<String,Object> smap;
	@Resource(name="castUploadPath")
	private String castUploadPath;
	
	@PostMapping("/cast/write/")
	public void write(@RequestBody Board cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","write()");
		brdMap.write(cast);
	}
	
	@PostMapping("/cast/")
	public Map<String,Object> list(@RequestBody Map<String,Object>cast){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","list");
		map.clear();
		Util.log.accept(cast.get("member_id")+"");
		int count = brdMap.count();
		map.put("countRow",count);
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
		Util.log.accept(cast+"");
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
		smap.put("saved_unique", member_id+'_'+msg_seq);
		brdMap.likeDes(msg_seq);
		brdMap.deleteLike(smap);
	}
	
	@GetMapping("/cast/saveBookmark/{msg_seq}/{member_id}")
	public void saveBookmark(@PathVariable int msg_seq,@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","saveBookmark()");
		smap.clear();
		smap.put("member_id", member_id);
		smap.put("msg_seq", msg_seq);
		smap.put("saved_unique", member_id+'_'+msg_seq);
		brdMap.saveBookmark(smap);
	}
	
	@GetMapping("/cast/deleteBookmark/{msg_seq}/{member_id}")
	public void deleteBookmark(@PathVariable int msg_seq,@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","deleteBookmark()");
		smap.clear();
		smap.put("saved_unique", member_id+'_'+msg_seq);
		brdMap.deleteBookmark(smap);
	}
	
	@GetMapping("/cast/subInc/{member_id}/{sub_mem_id}")
	public void subInc(@PathVariable String member_id,@PathVariable String sub_mem_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","subInc()");
		sr.setMember_id(member_id);
		sr.setSub_mem_id(sub_mem_id);
		sr.setSaved_unique(member_id+"_"+sub_mem_id);
		brdMap.subInc(sr);
	}
	
	@GetMapping("/cast/subDes/{member_id}/{sub_mem_id}")
	public void subDes(@PathVariable String member_id,@PathVariable String sub_mem_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","subDes()");
		sr.setMember_id(member_id);
		sr.setSub_mem_id(sub_mem_id);
		sr.setSaved_unique(member_id+"_"+sub_mem_id);
		brdMap.subDes(sr);
	}
	
	@GetMapping("/cast/subcheck/{member_id}/{sub_mem_id}")
	public int subcheck(@PathVariable String member_id,@PathVariable String sub_mem_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","subcheck()");
		sr.setMember_id(member_id);
		sr.setSub_mem_id(sub_mem_id);
		return brdMap.subcheck(sr); 
	}
	
	@GetMapping("/cast/subcount/{member_id}/")
	public int subcount(@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","subcount()");
		sr.setSub_mem_id(member_id);
		return brdMap.subcount(sr); 
	}
	
	@GetMapping("/cast/castcount/{member_id}/")
	public int castcount(@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","castcount()");
		sr.setMember_id(member_id);
		return brdMap.castcount(sr); 
	}
	
	
	
	@PostMapping("/cast/upload/")
	public String uploadImg(MultipartHttpServletRequest multipartRequest) {
		logger.info("\n BoardCtrl :::::::::: {} !!-----","uploadImg()");
		 Iterator<String> itr =  multipartRequest.getFileNames();
		 String savedName="";
		 while (itr.hasNext()) { //받은 파일들을 모두 돌린다.
            MultipartFile mpf = multipartRequest.getFile(itr.next());
      
            String originalFilename = mpf.getOriginalFilename(); //파일명
      
            try {
                //파일 저장
                UUID uuid = UUID.randomUUID();
                savedName = uuid + originalFilename.substring(originalFilename.lastIndexOf('.'));
        		Util.log.accept(castUploadPath+savedName);
        		FileCopyUtils.copy(mpf.getBytes(), new File(castUploadPath, savedName));
                System.out.println("originalFilename => "+originalFilename);
                System.out.println("fullpath => "+castUploadPath+savedName);
      
            } catch (Exception e) {
                e.printStackTrace();
            }
		 }
		return savedName;
	}
	
	@PostMapping("/cast/uploadMod/{oldfile}/{oldfile1}")
	public String uploadMod(MultipartHttpServletRequest multipartRequest, @PathVariable String oldfile, @PathVariable String oldfile1) {
		logger.info("\n BoardCtrl :::::::::: {} !!-----","uploadMod()");
		 Iterator<String> itr =  multipartRequest.getFileNames();
		 String savedName="";
		 new File(castUploadPath,oldfile).delete();
		 new File(castUploadPath,oldfile1).delete();
		 Util.log.accept(castUploadPath+oldfile);
		 Util.log.accept(castUploadPath+oldfile1);
		 while (itr.hasNext()) { //받은 파일들을 모두 돌린다.
           MultipartFile mpf = multipartRequest.getFile(itr.next());
           String originalFilename = mpf.getOriginalFilename(); //파일명
           try {
               //파일 저장
               UUID uuid = UUID.randomUUID();
               savedName = uuid + originalFilename.substring(originalFilename.lastIndexOf('.'));
       		Util.log.accept(castUploadPath+savedName);
       		FileCopyUtils.copy(mpf.getBytes(), new File(castUploadPath, savedName));
               System.out.println("originalFilename => "+originalFilename);
               System.out.println("fullpath => "+castUploadPath+savedName);
     
           } catch (Exception e) {
               e.printStackTrace();
           }
		 }
		return savedName;
	}
	
	@PostMapping("/cast/check/")
	public HashMap<String, Object> check(@RequestBody HashMap<String, Object> x){
		logger.info("\n--------- BoardCtrl {} !!-----","check()");
		return brdMap.check(x);
	}
	
	@GetMapping("/mysub/{member_id}/")
	public HashMap<String, Object> recent(@PathVariable String member_id) {
		logger.info("\n--------- BoardCtrl {} !!-----","mysub()");
		Util.log.accept(member_id+"");
		smap.clear();
		smap.put("member_id", member_id);
		List<SeinResult> list = brdMap.mysub(smap);
		Util.log.accept(list+"");
		smap.clear();
		smap.put("list", list);
		return smap;
	}
	
	@GetMapping("/myBookmark/{member_id}/")
	public HashMap<String, Object> myBookmark(@PathVariable String member_id){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","deleteBookmark()");
		smap.clear();
		smap.put("member_id", member_id);
		List<SeinResult> list = brdMap.myBookmark(smap);
		smap.clear();
		smap.put("list", list);
		return smap;
	}
	
	@GetMapping("/rankLike/")
	public HashMap<String, Object> rankLike(){
		logger.info("\n BoardCtrl :::::::::: {} !!-----","rankLike()");
		List<SeinResult> list = brdMap.rankLike();
		smap.clear();
		smap.put("list", list);
		return smap;
	}
	
}
