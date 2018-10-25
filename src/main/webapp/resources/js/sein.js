/*디비에 소개글 필요*/var sein = sein || {};

sein.board ={
	cast : x=>{
		$('#header').empty();
		$('#content').empty();
		$('<div/>').attr({id:'sein_content',style:'background-color: #BDBDBD'}).appendTo($('#content'));

		/*map 테스트*/
		$('<button/>').addClass('btn btn-primary').html('map').appendTo($('#sein_content')).click(e=>{
   			sein.service.map(x);	
		})
		
		/*배너 슬라이드*/
		sein.service.banner($('#sein_content'));

		/*컨텐츠 리스트 전체*/
		$('<div/>').attr({id:'cardlist_rap'}).appendTo($('#sein_content'));
		
		/*글쓰기 버튼*/
		if($.cookie('loginID')){
		$('<div/>').addClass('bt_rap').append(
			$('<span/>').addClass('bt_write').append(
				$('<button>').attr({'data-target':"#layerpop",'data-toggle':"modal"}).addClass('b_all').html('글쓰기'))
		).click(e=>{
			sein.service.modal('캐스트 작성하기');
			sein.service.write();
		})
		.appendTo($('#cardlist_rap'));
		}
		
		$('<div>').attr({style:'margin-top:10px'}).addClass('grid card_type').appendTo($('#cardlist_rap'));
		let page=0;;
		$(window).off("scroll");
		$.ajax({
			url:$.ctx()+'/cast/',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({board_id:'cast',pageNumber:'1'}),
			success:d=>{
				$.each(d.list,(i,j)=>{
					$('<div/>').addClass('grid-item card_inner').append(
							$('<div/>').addClass('card_top').append(
								$('<a/>').attr({href:'#'}).append(
									$('<img/>').attr({src:$.img()+'/cast/'+j.msg_photo})
									.click(e=>{
										sein.service.detail(j);	
									})
								)
							),
							$('<div/>').addClass('card_bottom').append(
								$('<div/>').addClass('user_pic').append(
									$('<img/>').attr({src:$.img()+'/profile/'+j.profileimg}).click(e=>{
										sein.service.caster(j);
									})				
								),
								$('<div/>').addClass('user_info').append(
									$('<a/>').attr({href:'#'}).append($('<strong>'+j.msg_title+'</strong>'))
									.click(e=>{
										sein.service.detail(j);	
									}),
									$('<a/>').attr({href:'#'}).append($('<span>'+j.nickname+'</span>'))
									.click(e=>{
										sein.service.caster(j);
									})
								),
								$('<div/>').addClass('user_cont').append(
									$('<a/>').attr({href:'#'}).append($('<span>'+j.tag+'</span>'))
									.click(e=>{
										sein.service.detail(j);
									})
								),
								$('<div/>').addClass('count').append(
									$('<span/>').addClass('ico_like'),
									$('<b/>').html(j.like_count),
									$('<span/>').addClass('ico_read'),
									$('<b/>').html(j.msg_count)
								)
							)
						).appendTo($('.grid'));
					page=d.page.pageNumber;
				})
				var $grid = $('.grid').isotope({itemSelector:'.grid-item'})
					$grid.imagesLoaded().progress(()=>{$grid.isotope('layout');})
			},
			error:(m1,m2,m3)=>{
				alert(m3);
			}
		})
		$('<div/>').attr({id:'bt_more'}).addClass('bt_rap').append(
				$('<span/>').addClass('bt_more').append(
					$('<button>').addClass('b_all').html('더보기')))
			.appendTo($('#cardlist_rap'))
			.click(e=>{
			$(window).off("scroll");
			$('#bt_more').remove();
			$(window).scroll(()=>{
				if($(document).height() <= $(window).scrollTop()+$(window).height()+1){
					$.ajax({
						url:$.ctx()+'/cast/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({board_id:'cast',pageNumber:++page+""}),
						success:d=>{
							$.each(d.list,(i,j)=>{
								var $grid = $('.grid').isotope({itemSelector:'.grid-item'})
								var $item = $('<div/>').addClass('grid-item card_inner').append(
										$('<div/>').addClass('card_top').append(
												$('<a/>').attr({href:'#'}).append(
													$('<img/>').attr({src:$.img()+'/cast/'+j.msg_photo})
													.click(e=>{
														$.getJSON($.ctx()+'/cast/read/'+j.msg_seq,d=>{
															sein.service.detail(j);	
														})
													})
												)
											),
											$('<div/>').addClass('card_bottom').append(
												$('<div/>').addClass('user_pic').append(
													$('<img/>').attr({src:$.img()+'/profile/'+j.profileimg})				
												),
												$('<div/>').addClass('user_info').append(
													$('<a/>').attr({href:'#'}).append($('<strong>'+j.msg_title+'</strong>'))
													.click(e=>{
														$.getJSON($.ctx()+'/cast/read/'+j.msg_seq,d=>{
															sein.service.detail(j);	
														})
													}),
													$('<a/>').attr({href:'#'}).append($('<span>'+j.nickname+'</span>'))
													.click(e=>{
														sein.service.caster(j);
													})
												),
												$('<div/>').addClass('user_cont').append(
													$('<a/>').attr({href:'#'}).append($('<span>'+j.tag+'</span>'))			
												),
												$('<div/>').addClass('count').append(
													$('<span/>').addClass('ico_like'),
													$('<b/>').html(j.like_count),
													$('<span/>').addClass('ico_read'),
													$('<b/>').html(j.msg_count)
												)
											)
										)
								$grid.append($item).isotope('appended',$item).isotope('layout');
							})
							var $grid = $('.grid').isotope({itemSelector:'.grid-item'})
							$grid.imagesLoaded().progress(()=>{$grid.isotope('layout');})
							if(page>=d.page.pageCount){
								$(window).off("scroll");
							}
						},
						error:(m1,m2,m3)=>{
							alert(m3);
						}
					})
				}
			})
		})
			
	}
}
sein.service ={
		banner : x=>{
			$('<div/>').addClass('banner_rap').attr({id:'div_banner',style:'margin-bottom:10px'}).appendTo($('#sein_content'));
			$('<div/>').attr({id:'carousel','data-ride':'carousel'}).addClass('carousel slide').appendTo($('#div_banner'));
			$('<ol/>').addClass('carousel-indicators').appendTo($('#carousel'));
			$('<div/>').addClass('carousel-inner').appendTo($('#carousel'));
			let k;
			let clazz=['active'];
			for(k=1;k<=3;k++){
				$('<li/>').attr({'data-target':'#carousel', 'data-slide-to':k}).appendTo($('.carousel-indicators'));	
				$('<div/>').addClass('carousel-item '+clazz[k-1]).attr({id:'item'+k}).append($("<img/>").attr({src:$.img()+'/banner/banner_img'+k+'.jpg'}),
				$('<h3/>').addClass('carousel-caption center').append($('<p>테스트 캡션 글자입니다.'+k+'</p>'))).appendTo($('.carousel-inner'));
			}
			
			$('<a/>').addClass('carousel-control-prev').attr({href:'#carousel',role:'button','data-slide':'prev'}).appendTo($('#carousel'));
			$('<span/>').addClass('carousel-control-prev-icon').attr({'aria-hidden':'true'}).appendTo($('.carousel-control-prev'));
			$('<span/>').addClass('sr-only').html('이전').appendTo($('.carousel-control-prev')).appendTo($('.carousel-control-prev'));

			$('<a/>').addClass('carousel-control-next').attr({href:'#carousel',role:'button','data-slide':'next'}).appendTo($('#carousel'));
			$('<span/>').addClass('carousel-control-next-icon').attr({'aria-hidden':'true'}).appendTo($('.carousel-control-next'));
			$('<span/>').addClass('sr-only').html('다음').appendTo($('.carousel-control-next')).appendTo($('.carousel-control-next'));
			$('.carousel').carousel();
		},
		side_menu : x=>{
			let like_count=x.like_count;
			$('<div/>').addClass('').attr({id:'side_menu'}).addClass('side_menu').appendTo($('.con_detail'));
			$('<ul/>').addClass('sein_ul').append(
					$('<li/>').addClass('btnlike').append(
							$('<a/>').attr({href:"#none"}).append(
									$('<span/>').addClass('bl_like'))).click(e=>{
										if($('.btnlike').hasClass('on')){
											if(confirm('좋아요 취소 하시겠습니까?')){
												$.getJSON($.ctx()+'/cast/likeDes/'+x.msg_seq+'/'+$.cookie('loginID'));
												like_count=like_count-1;
												$('.like_count').html(like_count);
												$('.btnlike').removeClass('on');
											}											
										}else{
											if(confirm('좋아요 하시겠습니까?')){
												like_count=like_count+1;
												$.getJSON($.ctx()+'/cast/likeInc/'+x.msg_seq+'/'+$.cookie('loginID'));
												$('.like_count').html(like_count);
												$('.btnlike').addClass('on');
											}	
										}
									}),
					$('<li/>').attr({id:'btnCommnet'}).append(
							$('<a/>').attr({href:"#none"}).addClass('reply').append(
									$('<span/>').addClass('bl_reply reply'))).click(e=>{
											$('html').animate({scrollTop : $('.bt_rap').offset().top},400)
									}),
					$('<li/>').addClass('btnBookmark').append(
							$('<a/>').attr({href:"#none"}).append(
									$('<span/>').addClass('bl_bookmark'))).click(e=>{
										if($('.btnBookmark').hasClass('on')){
											if(confirm('북마크 취소 하시겠습니까?')){
												
												$('.btnBookmark').removeClass('on');
											}											
										}else{
											if(confirm('북마크 하시겠습니까?')){

												$('.btnBookmark').addClass('on');
											}	
										}
									}),
					$('<li/>').append(
						$('<a/>').attr({href:"#none"}).append(
							$('<span/>').addClass('bl_facebook'))).click(e=>{
								sein.service.facebook();
							}),
					$('<li/>').append(
						$('<a/>').attr({href:'#none'}).append(
							$('<span/>').addClass('bl_share'))).click(e=>{
								sein.service.copyURL();
							}),
					$('<li/>').addClass('mg_top').append($('<a/>').attr({href:'#'}).append($('<span/>').addClass('bl_top')))
			).appendTo($('#side_menu'));
		},
		detail : x=>{
			$('#wrapper').scroll(()=>{e.preventDefault()});
			$('#sein_content').empty();
			$('<div/>').addClass('contents').attr({id:'topContent'}).appendTo($('#sein_content'));
			$('<div/>').addClass('con_inner').attr({style:'padding-top:30px'}).appendTo($('#topContent'));
			$('<div/>').addClass('con_detail bord_b').appendTo($('.con_inner'));
			
			$.getJSON($.ctx()+'/cast/read/'+x.msg_seq,d=>{
				let like_count=d.like_count;
				/*개인별 게시글 좋아요 북마크 구독 체크*/
				$.ajax({
					url:$.ctx()+'/cast/check/',
					method:'post',
					contentType:'application/json',
					data:JSON.stringify({msg_seq:x.msg_seq,member_id:$.cookie('loginID')}),
					success:d=>{
						if(d.like_check===1){
							$('.btnlike').addClass('on')
						}
						if(d.bookmark_check===1){
							$('.btnBookmark').addClass('on')
						}
					},
					error:(m1,m2,m3)=>{alert(m3)}
				})
				
				sein.service.side_menu(d);
				$('<div/>').addClass('inner_bg').appendTo($('.con_detail'));
				$('<div/>').addClass('detail_user').appendTo($('.inner_bg'));
				$('<div/>').addClass('user_pic').appendTo($('.inner_bg'));
				$('<a/>').attr({href:'#'})
				.append($('<img src="'+$.img()+'/profile/'+d.member_id+'.jpg"'+' alt="" style="position: static; width: 100%; height: 100%;">'))
				.appendTo($('.user_pic')).click(e=>{
					sein.service.caster(d);
				});
				$('<a/>').attr({href:'#'}).addClass('user_name').append($('<span/>').html(d.nickname))
				.appendTo($('.detail_user')).click(e=>{
					sein.service.caster(d);
				});
				if($.cookie("loginID")===x.member_id){
					$('<div/>').attr({style:'float:right'}).append(
						$('<a/>').addClass('btn btn-danger').attr({'data-target':"#layerpop",'data-toggle':"modal",href:'#',style:'margin-right:10px'}).html('수정')
						.click(e=>{
							sein.service.modal('캐스트 수정하기');
							sein.service.modify(d);
						}),
						$('<a/>').addClass('btn btn-danger').attr({href:'#'}).html('삭제').click(e=>{
							if(confirm('삭제하시겠습니까?')==true){
								$.getJSON($.ctx()+'/cast/delete/'+d.board_id+'/'+d.msg_seq);
								sein.board.cast();
							}
						})
					).appendTo($('.detail_user'))
				}
				let dates = new Date(x.msg_date)
		        let dt = dates.getFullYear()+
		        "-" +(dates.getMonth()+1)
		        + "-" + dates.getDate()+" "
		        + dates.getHours()+ ":"
		        + dates.getMinutes()+":"
		        + dates.getSeconds();
		        
				$('<div/>').addClass('detail_title').appendTo($('.inner_bg'));
				$('<h3/>').addClass('sc_out').appendTo($('.detail_title'));
				$('<p/>').html(d.msg_title).appendTo($('.detail_title'));
				$('<div/>').addClass('count').appendTo($('.detail_title'));
				$('<span/>').addClass('date').html(dt).appendTo($('.count'));
				$('<span/>').addClass('ico_like').appendTo($('.count'));
				$('<b/>').addClass('like_count').html(d.like_count).appendTo($('.count'));
				$('<span/>').addClass('ico_read').appendTo($('.count'));
				$('<b/>').html(d.msg_count).appendTo($('.count'));
				$.getJSON($.ctx()+'/cast/reply/'+x.board_id+'/'+x.msg_seq,d=>{
					$('<a/>').attr({href:'#'}).addClass('reply').append(
						$('<span/>').html('댓글'),$('<b/>').text(d.list.length))
						.appendTo($('.detail_title')).click(e=>{
							var offset = $('.bt_rap').offset();
							$('html').animate({scrollTop : offset.top},400)							
						});	
				})
				
				$('<div/>').addClass('detail_area').appendTo($('.inner_bg'));
				$('<p/>').html('&nbsp').appendTo($('.detail_area'));
				/*--------content시작-------*/
				
				$('<h3>'+d.msg_content+'</h3>').appendTo($('.detail_area'));
				$('<div/>').attr({style:'text-align:center',align:'center'}).append(
						$('<img/>').attr({src:$.img()+'/cast/'+d.msg_photo}))
				.appendTo($('.detail_area'));
				/*----- bottom 시작 -----*/
				$('<div/>').addClass('bt_rap').appendTo($('.inner_bg'));
				$('<div/>').addClass('bt_detail').appendTo($('.bt_rap'));
				$('<ul/>').append(
					$('<li/>').append(
						$('<button/>').addClass('btnlike').attr({type:'button'}).append(
							$('<span/>').addClass('ico_detaillike')),
						$('<span>').addClass('bt_txt').html('좋아요'),
						$('<b/>').addClass('like_count').html(d.like_count)
					).click(e=>{
						if($('.btnlike').hasClass('on')){
							if(confirm('좋아요 취소 하시겠습니까?')){
								like_count=like_count-1;
								$.getJSON($.ctx()+'/cast/likeDes/'+x.msg_seq);
								$('.like_count').html(like_count);
								$('.btnlike').removeClass('on');
							}											
						}else{
							if(confirm('좋아요 하시겠습니까?')){
								like_count=like_count+1;
								$.getJSON($.ctx()+'/cast/likeInc/'+x.msg_seq);
								$('.like_count').html(like_count);
								$('.btnlike').addClass('on');
							}	
						}
					}),
					$('<li/>').append(
						$('<button/>').addClass('btnBookmark').attr({type:'button'}).append(
								$('<span/>').addClass('ico_detailbook')),
								$('<span>').addClass('bt_txt').html('북마크')
					).click(e=>{
						if($('.btnBookmark').hasClass('on')){
							if(confirm('북마크 취소 하시겠습니까?')){
								
								
								$('.btnBookmark').removeClass('on');
							}											
						}else{
							if(confirm('북마크 하시겠습니까?')){
								
								
								$('.btnBookmark').addClass('on');
							}	
						}
					}),
					$('<li/>').append(
						$('<button/>').attr({type:'button'}).append(
							$('<span/>').addClass('ico_detailface')),
							$('<span>').addClass('bt_txt').html('페이스북공유')
					).click(e=>{
						sein.service.facebook();
					}),
					$('<li/>').append(
						$('<button/>').attr({type:'button'}).append(
							$('<span/>').addClass('ico_detaillink link_url')),
							$('<span>').addClass('bt_txt').html('링크공유')
					).click(e=>{
						sein.service.copyURL();
					})
				).appendTo($('.bt_detail'));
				
				$('<div/>').attr({id:'inner_bg_caster',style:'height:140px'}).addClass('inner_bg type').appendTo($('.con_detail'));
				$('<div/>').addClass('inner_box').appendTo($('#inner_bg_caster'));
				$('<div/>').addClass('user_cast').appendTo($('.inner_box'));
				$('<div/>').addClass('user_pic').appendTo($('.user_cast'));
				$('<a/>').attr({href:'#'}).append(
						$('<img/>').attr({src:$.img()+'/profile/'+d.profileimg,style:'position:static;width:100%;height:100%'})
				).appendTo($('.user_pic'));
				$('<div/>').addClass('user_txt').appendTo($('.user_cast'));
				$('<a/>').attr({href:'#'}).addClass('user_name')
				.append(
						$('<strong/>').html(d.member_id)
				).appendTo($('.user_txt'));
				$('<p/>').html('캐스터 소개글').appendTo($('.user_txt'));
				$('<div/>').addClass('count').append(
						$('<span/>').html('구독'),
						$('<b/>').html(d.subscription_count)
				).appendTo($('.user_txt'));
				
				/*bt_read on, bt_read off 로 구독중 조절해야하니 변수 처리 요망*/
				$('<div/>').addClass('bt_read').append(
						$('<button/>').addClass('jsonSubscribedStatus').append($('<span/>').addClass('bt_reading')))
				.appendTo($('.user_cast'));
				
				sein.service.reply(d);
			})
			
		},
		reply : x=>{
			$('<div/>').attr({id:'inner_bg_reply'}).addClass('inner_bg').appendTo($('.con_detail'));
			$('<div/>').addClass('reply_area').appendTo($('#inner_bg_reply'));
			var reply_count;
			$.getJSON($.ctx()+'/cast/reply/'+x.board_id+'/'+x.msg_seq,d=>{
				$('<div/>').addClass('re_txt')
				.append($('<span/>').html('댓글'),$('<b>').html(d.list.length))
				.appendTo($('.reply_area'));	
			})
			$('<div/>').addClass('re_inner').appendTo($('#inner_bg_reply'));
			$('<div/>').addClass('edit_rap').appendTo($('.re_inner'));
			
			$('<div/>').addClass('re_write').attr({style:'height:98px'}).appendTo($('.edit_rap'));
			$('<textarea/>').attr({id:'commentText',rows:'4',cols:'50',placeholder:'댓글을 입력해주세요.'}).appendTo($('.re_write'));
			$('<div/>').addClass('bt_rap')
			.append($('<button/>').attr({type:'submit'}).addClass('btn_saveComment').append($('<b/>').attr({title:'commentWrite'}).html('댓글쓰기')))
			.appendTo($('.re_write'))
			.click(e=>{
				if($.cookie('loginID')!==''){
					$.ajax({
						url:$.ctx()+'/cast/reWrite/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({msg_content:$('#commentText').val(),board_id:x.board_id,msg_seq:x.msg_seq,board_depth:1,member_id:$.cookie("loginID")}),
						success:d=>{
							$('#inner_bg_reply').remove();						
							sein.service.reply(x);
						},
						error:(m1,m2,m3)=>{alert(m3)}
					})
				}else{
					if(confirm('로그인이 필요한 서비스입니다. 로그인 창으로 이동할까요?')){
						app.permision.login();	
					};
				}
			});
			/*댓글 리스트*/
			$('<div/>').addClass('re_box').appendTo($('.re_inner'));
			sein.service.re_list(x);
			
		},
		re_list : x=>{
			$.getJSON($.ctx()+'/cast/reply/'+x.board_id+'/'+x.msg_seq,d=>{
				$.each(d.list,(i,j)=>{
					sein.service.re_read(j);	
					$.getJSON($.ctx()+'/cast/rereply/'+x.board_id+'/'+j.msg_seq,d1=>{
						$.each(d1.list,(i,j)=>{
							sein.service.rereply(j);	
						})
					})
				})
			})
		},
		rere_write : x=>{
			$('#reply_empty'+x.msg_seq).empty();
			$('<div/>').addClass('re_write modify').attr({id:'re_write_add',style:'height:98px'}).append(
				$('<textarea/>').attr({id:'commentMod',placeholder:"대댓글을 입력해주세요."}),
				$('<div/>').addClass('bt_rap')
				.append($('<button/>').attr({type:'submit'}).addClass('btn_saveComment').append($('<b/>').html('대댓글쓰기')))
				.click(e=>{
					$.ajax({
						url:$.ctx()+'/cast/reWrite/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({member_id:$.cookie('loginID'),msg_seq:x.msg_seq,board_id:'cast',board_depth:'2',msg_content:$('#commentMod').val()}),
						success:d=>{
							$('#re_write_add').remove();
							sein.service.detail({msg_seq:x.msg_ref,member_id:$.cookie('loginID')});
								$('html').animate({scrollTop : $('footer').offset().top+1000},400)
						},
						error:(m1,m2,m3)=>{alert(m3);}
					})
				})
			).appendTo($('#reply_empty'+x.msg_seq));
					
		},
		re_modify : x=>{
			$('#re_write_add').remove();
			$('<div/>').addClass('re_write modify').attr({id:'re_write_add',style:'height:98px'}).append(
				$('<textarea/>').attr({id:'commentMod',placeholder:x.msg_content}),
				$('<div/>').addClass('bt_rap')
				.append($('<button/>').attr({type:'submit'}).addClass('btn_saveComment').append($('<b/>').html('수정하기')))
				.click(e=>{
					$.ajax({
						url:$.ctx()+'/cast/reModify/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({msg_seq:x.msg_seq,board_id:'cast',msg_content:$('#commentMod').val()}),
						success:d=>{
							$('#p_re_read'+x.msg_seq).text($('#commentMod').val());
							$('#re_write_add').remove();
						},
						error:(m1,m2,m3)=>{alert(m3);}
					})
				})
			).appendTo($('#reply_empty'+x.msg_seq));
		},
		re_read : x=>{
			let dates = new Date(x.msg_date)
	        let dt = dates.getFullYear()+
	        "-" +(dates.getMonth()+1)
	        + "-" + dates.getDate()+" "
	        + dates.getHours()+ ":"
	        + dates.getMinutes()+":"
	        + dates.getSeconds();
			$('<div/>').attr({id:'re_comment'+x.msg_seq}).addClass('re_comment').appendTo($('.re_box'));
			$('<div/>').addClass('inner').append(
				$('<div/>').addClass('user_pic').append(
					$('<a/>').append(
						$('<img/>').attr({src:$.img()+'/profile/'+x.profileimg,style:'position: static; width: 100%; height: 100%;'})
					)
				),
				$('<div/>').addClass('user_text').append(
					$('<strong/>').html(x.member_id), /*추후 멤버테이블 조인걸어 이름으로 수정*/
					$('<span/>').addClass('date').html(' '+dt)
				),
				$('<div/>').addClass('re_cont').append(
					$('<p/>').attr({id:'p_re_read'+x.msg_seq}).html(x.msg_content)
				),
				$('<div/>').addClass('re_links').append(
					$('<div/>').append(
						$('<div/>').attr({id:'re_inner_write'}).addClass('inner').append(	
							$('<a/>').addClass('link2').attr({style:'color:red;'}).html('대댓글')
							.click(e=>{
								if($.cookie("loginID")==""){
									if(confirm('로그인이 필요한 서비스입니다. 로그인 창으로 이동할까요?')){
										app.permision.login();	
									};
								}else{
									sein.service.rere_write(x);
								}
							}),
							$('<span/>').addClass('bar').html('|').append(
								$('<a/>').addClass('link2 modify').attr({style:'color:red;'}).html('수정')
								.click(e=>{
									sein.service.re_modify(x);
								})		
							),
							$('<span/>').addClass('bar').html('|').append(
								$('<a/>').attr({href:'#'}).addClass('link2').html('삭제')	
								.click(e=>{
									if(confirm('삭제하시겠습니까?')==true){
									$.getJSON($.ctx()+'/cast/reDelete/'+x.board_id+'/'+x.msg_seq);
										var offset = $('#re_comment'+x.msg_seq).offset();
										$('html').animate({scrollTop : offset.top},400)				
										$('#re_comment'+x.msg_seq).remove();
									}
								})		
							)
						)
					)
				),
				$('<div/>').attr({id:'reply_empty'+x.msg_seq}).appendTo($('#re_comment'+x.msg_seq))
			)
			.appendTo($('#re_comment'+x.msg_seq));
			if(x.member_id!==$.cookie("loginID")){
				$('.bar').remove();
			}
		},
		facebook : x=>{
			let url = 'http://www.facebook.com/share.php?u='+window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
			window.open(url);
		},
		copyURL : x=>{
			let copyUrl = prompt('아래 주소복사 후 붙여넣기 하세요.',window.location.protocol + "//" + window.location.host + "/" + window.location.pathname)
		},
		write : x=>{
			$('<div/>').addClass('contents').attr({id:'modalContent'}).appendTo($('.modal-body'));
			$('<div/>').attr({style:'background-color:white'}).addClass('inner_bg').append(
			$('<textarea/>').attr({id:'msg_title',rows:'1',style:'width:100%',placeholder:'제목을 입력해주세요.'}),
			$('<textarea/>').attr({id:'msg_content',style:'width:100%; height:500px',placeholder:'내용을 입력해주세요.'}),
			$('<textarea/>').attr({id:'tag',rows:'1',style:'width:100%',placeholder:'태그를 입력해주세요.'}),
			$('<form/>').attr({name:"uploadForm", id:"uploadForm", enctype:"multipart/form-data", method:"post"}).append(
				$('<div/>').html('첨부할 이미지 파일을 드래그 해주세요.').attr({id:'dropZone',style:'border:3px dotted black;width:100%;height:100px;text-align:center;line-height:90px'})
			),
			$('<div/>').attr({style:'margin-top:10px'}).append($('<button/>').addClass('btn btn-danger').attr({style:'width:100%','data-dismiss':'modal','aria-hidden':'true'}).html('글쓰기')
			.click(e=>{
				// 등록할 파일 리스트
				var uploadFileList = Object.keys(fileList);
		        // 파일이 있는지 체크
		        if(uploadFileList.length == 0){
		            alert("파일이 없습니다.");
		            return;
		        }
		        // 용량을 500MB를 넘을 경우 업로드 불가
		        if(totalFileSize > maxUploadSize){
		            alert("총 용량 초과\n총 업로드 가능 용량 : " + maxUploadSize + " MB");
		            return;
		        }
		        var form = $('#uploadForm');
	            var formData = new FormData(form);
	            for(var i = 0; i < uploadFileList.length; i++){
	                formData.append('files', fileList[uploadFileList[i]]);
	            }
				$.ajax({
	            	url:$.ctx()+'/cast/upload/',
	            	dataType:'text',
	            	type:'post',
	            	data:formData,
	            	processData:false,
	            	contentType:false,
	                success: d=>{
				        if(confirm("등록 하시겠습니까?")){
				            // 등록할 파일 리스트를 formData로 데이터 입력
		                	$.ajax({
		    					url:$.ctx()+'/cast/write/',
		    					method:'post',
		    					contentType:'application/json',
		    					data:JSON.stringify({member_id:$.cookie("loginID"),board_id:'cast',msg_title:$('#msg_title').val(),msg_content:$('#msg_content').val(),tag:$('#tag').val(),msg_photo:d}),
		    					success:d=>{
		    						 $('#layerpop').on('hidden.bs.modal',()=>{
			            				sein.board.cast();
			                		})
		    					},
		    					error:(m1,m2,m3)=>{alert(m3)}
	    					})
				        }
	                },
	                error : e=>{
	                	alert("ERROR");
	                }
	            });
				})
			)
			).appendTo($('#modalContent'));
			
	        
			/*file upload 시작 */
		    // 파일 리스트 번호
		    var fileIndex = 0;
		    // 등록할 전체 파일 사이즈
		    var totalFileSize = 0;
		    // 파일 리스트
		    var fileList = new Array();
		    // 파일 사이즈 리스트
		    var fileSizeList = new Array();
		    // 등록 가능한 파일 사이즈 MB
		    var uploadSize = 1;
		    // 등록 가능한 총 파일 사이즈 MB
		    var maxUploadSize = 5;
		 
		    $(function (){
		        fileDropDown();
		    });
		 
		    // 파일 드롭 다운
		    function fileDropDown(){
		        var dropZone = $("#dropZone");
		        // Drag기능
		        dropZone.on('dragenter',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		            // 드롭다운 영역 css
		            dropZone.attr({style:'border:3px dotted black;width:100%;height:100px;text-align:center;line-height:90px;background-color:#E3F2FC'});
		        });
		        dropZone.on('dragleave',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		            // 드롭다운 영역 css
		            dropZone.attr({style:'border:3px dotted black;width:100%;height:100px;text-align:center;line-height:90px;background-color:#FFFFFF'});
		        });
		        dropZone.on('dragover',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		            // 드롭다운 영역 css
		            dropZone.attr({style:'border:3px dotted black;width:100%;height:100px;text-align:center;line-height:90px;background-color:#E3F2FC'});
		        });
		        dropZone.on('drop',function(e){
		            e.preventDefault();
		            // 드롭다운 영역 css
		            var files = e.originalEvent.dataTransfer.files;
		            if(files != null){
		                if(files.length < 1){
		                    alert("폴더 업로드 불가");
		                    return;
		                }
		                selectFile(files)
		            }else{
		                alert("ERROR");
		            }
		        });
		    }
		 
		    // 파일 선택시
		    function selectFile(fileObject){
		        var files = null;
		        if(fileObject != null){
		            // 파일 Drag 이용하여 등록시
		            files = fileObject;
		            $("#dropZone").attr({style:'border:3px dotted black;width:100%;height:100px;text-align:center;line-height:90px;background-color:#FFFFFF'}).html('파일 드랍 완료');
		        }else{
		            // 직접 파일 등록시
		            files = $('#multipaartFileList_' + fileIndex)[0].files;
		            $("#dropZone").attr({style:'border:3px dotted black;width:100%;height:100px;text-align:center;line-height:90px;background-color:#FFFFFF'}).html('파일 등록 완료');
		        }
		        
		        // 다중파일 등록
		        if(files != null){
		            for(var i = 0; i < files.length; i++){
		                // 파일 이름
		                var fileName = files[i].name;
		                var fileNameArr = fileName.split("\.");
		                // 확장자
		                var ext = fileNameArr[fileNameArr.length - 1];
		                // 파일 사이즈(단위 :MB)
		                var fileSize = files[i].size / 1024 / 1024;
		                
		                if($.inArray(ext, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml']) >= 0){
		                    // 확장자 체크
		                    alert("등록 불가 확장자");
		                    break;
		                }else if(fileSize > uploadSize){
		                    // 파일 사이즈 체크
		                    alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
		                    break;
		                }else{
		                    // 전체 파일 사이즈
		                    totalFileSize += fileSize;
		                    // 파일 배열에 넣기
		                    fileList[fileIndex] = files[i];
		                    // 파일 사이즈 배열에 넣기
		                    fileSizeList[fileIndex] = fileSize;
		                    // 업로드 파일 목록 생성
		                    addFileList(fileIndex, fileName, fileSize);
		                    // 파일 번호 증가
		                    fileIndex++;
		                }
		            }
		        }else{
		            alert("ERROR");
		        }
		    }
		 
		    // 업로드 파일 목록 생성
		    function addFileList(fIndex, fileName, fileSize){
		        var html = "";
		        html += "<tr id='fileTr_" + fIndex + "'>";
		        html += "    <td class='center' id='fileNameLocation'>";
		        html +=         fileName
		        html += "    </td>"
		        html += "</tr>"
		        $('#fileTableTbody').append(html);
		    }
		 
		    // 업로드 파일 삭제
		    function deleteFile(fIndex){
		        // 전체 파일 사이즈 수정
		        totalFileSize -= fileSizeList[fIndex];
		        
		        // 파일 배열에서 삭제
		        delete fileList[fIndex];
		        
		        // 파일 사이즈 배열 삭제
		        delete fileSizeList[fIndex];
		        
		        // 업로드 파일 테이블 목록에서 삭제
		        $("#fileTr_" + fIndex).remove();
		    }
			
	/* file upload 끝 */
		},
		modify : x=>{
			$('#layerpop').draggable();
			$('<div/>').addClass('contents').attr({id:'modalContent'}).appendTo($('.modal-body'));
			$('<div/>').attr({style:'background-color:white'}).addClass('inner_bg').append(
				$('<textarea/>').attr({id:'msg_title',rows:'1',style:'width:100%'}).text(x.msg_title),
				$('<textarea/>').attr({id:'msg_content',style:'width:100%; height:500px'}).text(x.msg_content),
				$('<textarea/>').attr({id:'tag',rows:'1',style:'width:100%'}).text(x.tag),
				$('<div/>').attr({style:'margin-top:10px'}).append($('<button/>').addClass('btn btn-danger').attr({style:'width:100%','data-dismiss':'modal','aria-hidden':'true'}).html('수정하기')
					.click(e=>{
						$.ajax({
							url:$.ctx()+'/cast/modify/',
							method:'post',
							contentType:'application/json',
							data:JSON.stringify({member_id:$.cookie("loginID"),msg_seq:x.msg_seq,board_id:'cast',msg_title:$('#msg_title').val(),msg_content:$('#msg_content').val(),tag:$('#tag').val()}),
							success:d=>{
								$('#layerpop').on('hidden.bs.modal',()=>{
									sein.board.cast();
								})
							},
							error:(m1,m2,m3)=>{alert(m3)}})
						})
					)
			).appendTo($('#modalContent'));
			
		},
		modal : x=>{
			$('#layerpop').remove();
			$('<div class="modal fade" id="layerpop">'
				+'  <div class="modal-dialog">'
				+'    <div class="modal-content">'
				+'      <div class="modal-header">'
				+'        <h4 class="modal-title" id="modalTitle">'+x+'</h4>'
				+'        <button type="button" class="close" data-dismiss="modal">×</button>'
				+'      </div>'
				+'      <div class="modal-body">'
				+'      </div>'
				+'    </div>'
				+'  </div>'
				+'</div>').appendTo('#content');
		},
		rereply:x=>{
			let dates = new Date(x.msg_date)
	        let dt = dates.getFullYear()+
	        "-" +(dates.getMonth()+1)
	        + "-" + dates.getDate()+" "
	        + dates.getHours()+ ":"
	        + dates.getMinutes()+":"
	        + dates.getSeconds();
		$('<div/>').addClass('recomment re').attr({id:'rereply'+x.msg_seq,style:'margin-left:30px'}).append(
			$('<div/>').addClass('inner').append(
				$('<div/>').addClass('user_pic').attr({style:'position:relative;left: -40px;top:35px'}).append(
					$('<a/>').append(
						$('<img/>').attr({src:$.img()+'/profile/'+x.profileimg,style:'position: static; width: 100%; height: 100%;'})
					)
				),
				$('<div/>').addClass('user_text').append(
					$('<strong/>').html(x.member_id), /*추후 멤버테이블 조인걸어 이름으로 수정*/
					$('<span/>').addClass('date').html(' '+dt)
				),
				$('<div/>').addClass('re_cont').append(
					$('<p/>').attr({id:'p_rere_read'+x.msg_seq}).text(x.msg_content)
				),
				$('<div/>').addClass('re_links').append(
					$('<div/>').append(
						$('<div/>').attr({id:'re_inner_write'}).addClass('inner').append(	
							$('<a/>').addClass('link2 modify').attr({style:'color:red;'}).html('수정')
							.click(e=>{
								sein.service.rere_modify(x);
							}),
							$('<span/>').addClass('bar').html('|'),
							$('<a/>').attr({href:'#'}).addClass('link2').html('삭제')	
							.click(e=>{
								if(confirm('삭제하시겠습니까?')==true){
								$.getJSON($.ctx()+'/cast/reDelete/'+x.board_id+'/'+x.msg_seq);
								$('#rereply'+x.msg_seq).remove();
								var offset = $('#re_comment'+x.msg_ref).offset();
								$('html').animate({scrollTop : offset.top},400)				
								}
							})
						)
					)
				),
				$('<div/>').attr({id:'reply_empty'+x.msg_seq}).appendTo($('#re_comment'+x.msg_ref))
			)
		)
		.appendTo($('#re_comment'+x.msg_ref))
	},
	rere_modify : x=>{
		$('#re_write_add').remove();
		$('<div/>').addClass('re_write modify').attr({id:'re_write_add',style:'height:98px'}).append(
			$('<textarea/>').attr({id:'commentMod',placeholder:x.msg_content}),
			$('<div/>').addClass('bt_rap')
			.append($('<button/>').attr({type:'submit'}).addClass('btn_saveComment').append($('<b/>').html('수정하기')))
			.click(e=>{
				$.ajax({
					url:$.ctx()+'/cast/reModify/',
					method:'post',
					contentType:'application/json',
					data:JSON.stringify({msg_seq:x.msg_seq,board_id:'cast',msg_content:$('#commentMod').val()}),
					success:d=>{
						$('#p_rere_read'+x.msg_seq).text($('#commentMod').val());
						$('#re_write_add').remove();
					},
					error:(m1,m2,m3)=>{alert(m3);}
				})
			})
		).appendTo($('#reply_empty'+x.msg_seq));
	},
	caster : x=>{
		$('#sein_content').empty();
		$('<div/>').addClass('contents bg_type2').attr({style:'min-height: 400px;'}).appendTo($('#sein_content'));
		$('<div/>').addClass('caster_rap').appendTo($('.bg_type2'));
		$('<div/>').addClass('caster_inner').append(
			$('<div/>').addClass('caster_c').append(
				$('<div/>').addClass('user_pic').append(
					$('<a/>').attr({href:'#none',src:$.img()+'/profile/'+x.profileimg})
				),
				$('<span/>').addClass('ico_caster'),
				$('<strong/>').html(x.nickname),
				$('<p/>').html(x.nickname), /*디비에 소개글 필요*/
				$('<div/>').addClass('nav_sns').append(
					$('<li/>').addClass('ico_face').attr({style:'display:none'}).append($('<a/>').attr({href:''}).append($('<span/>').addClass('ico_face'))),
					$('<li/>').addClass('ico_blog').attr({style:'display:none'}).append($('<a/>').attr({href:''}).append($('<span/>').addClass('ico_blog'))),
					$('<li/>').addClass('ico_web').attr({style:'display:none'}).append($('<a/>').attr({href:''}).append($('<span/>').addClass('ico_web')))				
				),
				$('<div/>').addClass('bt_read').append(
					$('<button/>').attr({type:'button',title:'구독하기'}).append(
						$('<span/>').addClass('bt_reading')
					)
				)
			),
			$('<div/>').addClass('caster_l').append($('<b/>').html('캐스터'),$('<br/>'),$('<span/>').html('캐스트수')),
			$('<div/>').addClass('caster_r').append($('<b/>').html('구독'),$('<br/>'),$('<span/>').html('구독수'))
		).appendTo($('.caster_rap'));
		$('<div/>').addClass('contents').appendTo($('#sein_content'));
		
		$('<div/>').attr({id:'cardlist_rap'}).appendTo($('#sein_content'));
		$('<div>').attr({style:'margin-top:10px'}).addClass('grid card_type').appendTo($('#cardlist_rap'));
		let page=0;
		$.ajax({
			url:$.ctx()+'/cast/',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({board_id:'cast',pageNumber:'1',member_id:x.member_id}),
			success:d=>{
				$.each(d.list,(i,j)=>{
					$('<div/>').addClass('grid-item card_inner').append(
							$('<div/>').addClass('card_top').append(
								$('<a/>').attr({href:'#'}).append(
									$('<img/>').attr({src:$.img()+'/cast/'+j.msg_photo})
									.click(e=>{
										sein.service.detail(j);	
									})
								)
							),
							$('<div/>').addClass('card_bottom').append(
								$('<div/>').addClass('user_pic').append(
									$('<img/>').attr({src:$.img()+'/profile/'+j.profileimg}).click(e=>{
										sein.service.caster(j);
									})				
								),
								$('<div/>').addClass('user_info').append(
									$('<a/>').attr({href:'#'}).append($('<strong>'+j.msg_title+'</strong>'))
									.click(e=>{
										sein.service.detail(j);	
									}),
									$('<a/>').attr({href:'#'}).append($('<span>'+j.nickname+'</span>'))
									.click(e=>{
										sein.service.caster(j);
									})
								),
								$('<div/>').addClass('user_cont').append(
									$('<a/>').attr({href:'#'}).append($('<span>'+j.tag+'</span>'))
									.click(e=>{
										sein.service.detail(j);
									})
								),
								$('<div/>').addClass('count').append(
									$('<span/>').addClass('ico_like'),
									$('<b/>').html(j.like_count),
									$('<span/>').addClass('ico_read'),
									$('<b/>').html(j.msg_count)
								)
							)
						).appendTo($('.grid'));
					page=d.page.pageNumber;
				})
				var $grid = $('.grid').isotope({itemSelector:'.grid-item'})
					$grid.imagesLoaded().progress(()=>{$grid.isotope('layout');})
			},
			error:(m1,m2,m3)=>{
				alert(m3);
			}
		})
		$('<div/>').attr({id:'bt_more'}).addClass('bt_rap').append(
				$('<span/>').addClass('bt_more').append(
					$('<button>').addClass('b_all').html('더보기')))
			.appendTo($('#cardlist_rap'))
			.click(e=>{
			$('#bt_more').remove();
			$(window).scroll(()=>{
				if($(document).height() <= $(window).scrollTop()+$(window).height()+10){
					$.ajax({
						url:$.ctx()+'/cast/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({board_id:'cast',pageNumber:++page+"",member_id:x.member_id}),
						success:d=>{
							$.each(d.list,(i,j)=>{
								var $grid = $('.grid').isotope({itemSelector:'.grid-item'})
								var $item = $('<div/>').addClass('grid-item card_inner').append(
										$('<div/>').addClass('card_top').append(
												$('<a/>').attr({href:'#'}).append(
													$('<img/>').attr({src:$.img()+'/cast/'+j.msg_photo})
													.click(e=>{
														$.getJSON($.ctx()+'/cast/read/'+j.msg_seq,d=>{
															sein.service.detail(j);	
														})
													})
												)
											),
											$('<div/>').addClass('card_bottom').append(
												$('<div/>').addClass('user_pic').append(
													$('<img/>').attr({src:$.img()+'/profile/'+j.profileimg})
													.click(e=>{
														sein.service.caster(j);
													})
												),
												$('<div/>').addClass('user_info').append(
													$('<a/>').attr({href:'#'}).append($('<strong>'+j.msg_title+'</strong>'))
													.click(e=>{
														$.getJSON($.ctx()+'/cast/read/'+j.msg_seq,d=>{
															sein.service.detail(j);	
														})
													}),
													$('<a/>').attr({href:'#'}).append($('<span>'+j.nickname+'</span>'))
													.click(e=>{
														sein.service.caster(j);
													})
												),
												$('<div/>').addClass('user_cont').append(
													$('<a/>').attr({href:'#'}).append($('<span>'+j.tag+'</span>'))			
												),
												$('<div/>').addClass('count').append(
													$('<span/>').addClass('ico_like'),
													$('<b/>').html(j.like_count),
													$('<span/>').addClass('ico_read'),
													$('<b/>').html(j.msg_count)
												)
											)
										)
								$grid.append($item).isotope('appended',$item).isotope('layout');
							})
							var $grid = $('.grid').isotope({itemSelector:'.grid-item'})
							$grid.imagesLoaded().progress(()=>{$grid.isotope('layout');})
							if(page>=d.page.pageCount){
								$(window).off("scroll");
							}
						},
						error:(m1,m2,m3)=>{
							alert(m3);
						}
					})
				}
			})
		})
	},
	map : x=>{
		$('#sein_content').empty();
		$('<div/>').attr({id:'location',style:'width:100%;min-height:800px'}).appendTo($('#sein_content'));

		var mapContainer = document.getElementById('location'), // 지도를 표시할 div  
	    mapOption = { 
	        center: new daum.maps.LatLng(37.566535,126.97796919999996), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };
		var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
		var positions = new Array();
		var geocoder = new daum.maps.services.Geocoder();
		var addr = [{title:'나나',addr:'제주특별자치도 제주시 첨단로 242'},{title:'가가',addr:'경기도 고양시 일산서구 고양대로 112번길 64'}];
		$.each(addr,(i,j)=>{
			geocoder.addressSearch(j.addr, function(result, status) {
				var coords = new daum.maps.LatLng(result[0].y, result[0].x);
				var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
				// 마커 이미지의 이미지 크기 입니다
			    var imageSize = new daum.maps.Size(34, 60); 
			    
			    // 마커 이미지를 생성합니다    
			    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 
			    
			    // 마커를 생성합니다
			    var marker = new daum.maps.Marker({
			        map: map, // 마커를 표시할 지도
			        position: coords, // 마커를 표시할 위치
			        title : j.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
			        image : markerImage // 마커 이미지 
			    });
			})
			 alert(j.title);
		})

	}
}