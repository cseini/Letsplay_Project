package com.play.web.img;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.play.web.cmm.Util;
import com.play.web.cmm.Util2;
import com.play.web.img.Image;
import com.play.web.mbr.Member;
import com.play.web.mbr.MemberMapper;

@RestController
@RequestMapping("/image")
public class ImageCtrl {
	static final Logger logger = LoggerFactory.getLogger(ImageCtrl.class);
	@Autowired Image img;
	@Autowired MemberMapper mbrMap;
	@Autowired Member mbr;
	@Autowired Util2 util2;
	@Autowired HashMap<String, Object> map;
	@Resource(name="uploadPath")
	private String uploadPath;

	@PostMapping("/profile/{member_id}")
	public String uploadProfile(MultipartFile files, @PathVariable String member_id) throws Exception {
		logger.info("\n--------- ImageController {} !!-----","profile()");
		map.clear();
		String savedName = uploadPhoto(files.getOriginalFilename(), files.getBytes(), member_id);
		mbr.setProfileimg(savedName);
		mbr.setMember_id(member_id);
		mbrMap.update(mbr);
		return savedName;
	}
	
	private String uploadPhoto(String originalName, byte[] fileData, String member_id) throws Exception {
		logger.info("\n--------- ImageController {} !!-----","uploadFile()");
		String savedName ="";
		savedName = member_id + "." + originalName.split("\\.")[1];		
		Util.log.accept("savedName: " + savedName);
		FileCopyUtils.copy(fileData, new File(uploadPath, savedName));
		return savedName;
	}
}
