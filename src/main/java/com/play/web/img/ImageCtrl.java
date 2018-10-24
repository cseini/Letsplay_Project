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

	@PostMapping("/fileUpload")
	public Map<String, Object> login(@RequestBody Image img) {
		logger.info("\n--------- MemberController {} !!-----", "fileUpload()");
		logger.info("img " + img);
		Map<String, Object> rm = new HashMap<>();
		rm.put("img", img);
		return rm;
	}

	@PostMapping("/boards/fileupload")
	public Object fileupload(@ModelAttribute("uploadForm") FileForm uploadForm) throws IOException {
		Util.log.accept(":: BoardCtrl :: fileupload() ");
		List<MultipartFile> files = uploadForm.getFiles();

		// success.jsp 로 보낼 파일 이름 저장
		List<String> fileNames = new ArrayList<String>();
		if (null != files && files.size() > 0) {
			for (MultipartFile multipartFile : files) {
				String fileName = multipartFile.getOriginalFilename();
				String path = uploadPath + fileName;

				File f = new File(path);

				multipartFile.transferTo(f);

				fileNames.add(fileName);
				Util.log.accept("fileupload SUCCESS !! ");
			}
		}
		// map.addAttribute("files", fileNames);
		return "success";
	}

	class FileForm {
		private List<MultipartFile> files;
		public List<MultipartFile> getFiles() {
			return files;
		}
		public void setFiles(List<MultipartFile> files) {
			this.files = files;
		}
	}

	@PostMapping("/profile/{member_id}")
	public String uploadProfile(MultipartFile files, @PathVariable String member_id) throws Exception {
		logger.info("\n--------- ImageController {} !!-----","profile()");
		map.clear();
		String flag ="";
		flag = "profile";
		String savedName = uploadPhoto(files.getOriginalFilename(), files.getBytes(), member_id, flag);
		mbr.setProfileimg(savedName);
		mbr.setMember_id(member_id);
		mbrMap.update(mbr);
		return savedName;
	}
	@PostMapping("/thumbnail/{member_id}")
	public String uploadThumbnail(MultipartFile files, @PathVariable String member_id) throws Exception {
		logger.info("----------------{}",">>>>>");
		logger.info("\n--------- ImageController {} !!-----","thumbnail()");
		map.clear();
		String flag ="";
		flag = "thumbnail";
		System.out.println("member_id : " + member_id);
		System.out.println("files : " + files);
		Util.log.accept("OriginalFilename: " + files.getOriginalFilename());
		Util.log.accept("size: " + files.getSize());
		Util.log.accept("contentType: " + files.getContentType());
		Util.log.accept("getInputStream: " + files.getInputStream());
		Util.log.accept("getName: " + files.getName());
		Util.log.accept("getClass: " + files.getClass());
		String savedName = uploadPhoto(files.getOriginalFilename(), files.getBytes(), member_id, flag);
		Util.log.accept("savedName: " + savedName);
		mbr.setProfileimg(savedName);
		mbr.setMember_id(member_id);
		mbrMap.update(mbr);
		System.out.println("mbr : " + mbr);
		return savedName;
	}
	
	private String uploadPhoto(String originalName, byte[] fileData, String member_id, String flag) throws Exception {
		logger.info("\n--------- ImageController {} !!-----","uploadFile()");
		String savedName ="";
		savedName = member_id + "." + originalName.split("\\.")[1];		
		if(new File(uploadPath, savedName)!=null) {
			new File(uploadPath, savedName).delete();
		} 
		Util.log.accept("savedName: " + savedName);
		FileCopyUtils.copy(fileData, new File(uploadPath, savedName));
		return savedName;
	}
}
