package com.play.web.mbr;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.play.web.brd.Board;
import com.play.web.cmm.Util2;

@RestController
@RequestMapping("/member")
public class MemberCtrl {
	static final Logger logger = LoggerFactory.getLogger(MemberCtrl.class);
	@Autowired Member mbr;
	@Autowired MemberMapper mbrMap;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	@Autowired List<HashMap<String, Object>> rlist;
	
	@PostMapping("/join")
	public void join(@RequestBody Member param) {
		logger.info("\n--------- MemberController {} !!-----","join()");
		if(param.getBirthdate()!=null) {
			param.setAge(util2.ageAndGender(param).getAge());
			param.setGender(util2.ageAndGender(param).getGender());
			param.setProfileimg("default.jpg");
			mbrMap.post(param);
		} else {
			mbrMap.post(param);
		}
	}
	
	@PostMapping("/auth")
	public Map<String,Object> auth(@RequestBody Member pm){
		logger.info("\n--------- MemberController {} !!-----","auth()");
		map.clear();
		logger.info("member_id :" + pm.getMember_id());
		logger.info("pw : " + pm.getPassword());
		map.put("mbr", mbrMap.get(pm));
		logger.info("mbrMap.get(pm)" + mbrMap.get(pm));
		return map;
	}
	@PostMapping("/login")
	public Map<String,Object> login(@RequestBody Member pm) {
		logger.info("\n--------- MemberController {} !!-----","login()");
		Map<String,Object> rm =  new HashMap<>();
		String pwValid = "WRONG";
		String idValid ="WRONG";
		if(mbrMap.count(pm)!=0) {
			idValid ="CORRECT";
			Function<Member,Member> f = (t)->{
				return mbrMap.get(t);
			};
			mbr = f.apply(pm);
			System.out.println(mbr);
			pwValid = (mbr != null) ?"CORRECT":"WRONG";
			mbr = (mbr != null)?mbr:new Member();
		}
		rm.put("id_valid",idValid);
		rm.put("pw_valid", pwValid);
		rm.put("mbr", mbr);
		return rm;
	}
	@PostMapping("/delete")
	public Map<String,Object> delete(
			@RequestBody Member pm) {
		logger.info("\n--------- MemberController {} !!-----","delete()");
		map.clear();
		logger.info("Member pm : "+ pm);
		logger.info("getMember_id() : "+ pm.getMember_id());
		logger.info("getPassword() : "+ pm.getPassword());
		String deleteMsg = "비밀번호오류";
		logger.info("mbrMap.count(pm) : " + mbrMap.count(pm));
		if(mbrMap.count(pm)!=0) {
			mbrMap.delete(pm);
			deleteMsg="탈퇴완료";
		};
		logger.info("deleteMsg  " + deleteMsg);
		map.put("deleteMsg", deleteMsg);
		map.put("mbr", mbr);
		return map;
	}
	
	@PostMapping("/update")
	public void modify(@RequestBody Member pm) {
		logger.info("\n--------- MemberController {} !!-----","modify()");
		map.clear();
		mbrMap.update(pm);
	}
	
	@GetMapping("/list/{member_id}")
	public HashMap<String, Object> rlist(@PathVariable String member_id){
		logger.info("\n--------- MemberController {} !!-----","list()");
		map.clear();
		rlist = mbrMap.rlist(member_id);
		System.out.println("rlist.size : " + rlist.size());
		map.put("rlist", rlist);
		return map;
	}
	
	@GetMapping("/cancel/{member_id}")
	public String result(@PathVariable String member_id){
		logger.info("\n--------- MemberController {} !!-----","list()");
		map.clear();
		rlist = mbrMap.rlist(member_id);
		System.out.println("rlist.size : " + rlist.size());
		map.put("rlist", rlist);
		return "";
	}
}
