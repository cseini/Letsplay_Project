package com.play.web.mbr;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.play.web.cmm.Util2;
import com.play.web.img.Image;

@RestController
@RequestMapping("/member")
public class MemberCtrl {
	static final Logger logger = LoggerFactory.getLogger(MemberCtrl.class);
	@Autowired Member mbr;
	@Autowired MemberMapper mbrMap;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	
	@PostMapping("/join")
	public void join(@RequestBody Member param) {
		logger.info("\n--------- MemberController {} !!-----","join()");
		if(param.getBirthdate()!=null) {
			param.setAge(util2.ageAndGender(param).getAge());
			param.setGender(util2.ageAndGender(param).getGender());
			mbrMap.post(param);
		} else {
			mbrMap.post(param);
		}
	}
	
	@PostMapping("/auth")
	public Map<String,Object> auth(
			@RequestBody Member pm){
		logger.info("\n--------- MemberController {} !!-----","auth()");
		map.clear();
		map.put("mbr", mbrMap.get(pm));
		logger.info("mbrMap.get(pm)" + mbrMap.get(pm));
		return map;
	}
	@PostMapping("/login")
	public Map<String,Object> login(
			@RequestBody Member pm) {
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
	
	@PostMapping("/fileUpload")
	public Map<String,Object> login(
			@RequestBody Image img) {
		logger.info("\n--------- MemberController {} !!-----","fileUpload()");
		logger.info("img " + img);
		Map<String,Object> rm =  new HashMap<>();
		rm.put("img", img);
		return rm;
	 }
}
