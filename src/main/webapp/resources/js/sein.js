"use strict";
var sein = sein || {};

sein.board ={
	cast : x=>{

		$.cookie.json=true;
		$('#header').empty();
		$('#content').empty();
		$('<div/>').attr({id:'sein_content',style:'background-color: #BDBDBD'}).appendTo($('#content'));

		/*mycast*/
		$('<button/>').addClass('btn btn-primary').html('mycast').appendTo($('#sein_content')).click(e=>{
   			sein.service.mycast();	
		})
		
		/*검색창*/
		$('<div/>').addClass('search_rap').append(
			$('<div/>').addClass('input-group').append(
				$('<input/>').attr({id:'search',type:'text',placeholder:'검색어를 입력하세요.',style:'text-align:center;'}).addClass('form-control'),
				$('<div/>').addClass('input-group-btn').append(
					$('<button/>').addClass('btn btn-danger').attr({type:'button'}).text('통합검색').click(e=>{
						sein.service.search($('#search').val())
					})
				)
			)
		).appendTo($('#sein_content'));
		
		/*배너 슬라이드*/
		sein.service.banner($('#sein_content'));

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
		/*컨텐츠 리스트 전체*/
		$('<div/>').attr({id:'cardlist_rap'}).appendTo($('#sein_content'));
		$('<div>').attr({style:'margin-top:10px'}).addClass('grid card_type').appendTo($('#cardlist_rap'));
		$.ajax({
			url:$.ctx()+'/cast/',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({board_id:'cast',pageNumber:1}),
			success:d=>{
				$.each(d.list,(i,j)=>{
					console.log('캐스트 리스트 진입')
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
									$('<img/>').attr({src:$.img()+'/profile/'+j.profileimg,style:'cursor:pointer'}).click(e=>{
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
					if(!d.page.nextBlock){
						$('#bt_more').empty();
					}
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
			let page=1;
			$(window).off("scroll");
			$('#bt_more').remove();
			$(window).scroll(()=>{
				if($(document).height() <= $(window).scrollTop()+$(window).height()+1){
					$.ajax({
						url:$.ctx()+'/cast/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({board_id:'cast',pageNumber:++page}),
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
													$('<img/>').attr({src:$.img()+'/profile/'+j.profileimg,style:'cursor:pointer'}).click(e=>{
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
													$('<a/>').attr({href:'#'}).append($('<span>'+j.tag+'</span>'))	.click(e=>{
														$.getJSON($.ctx()+'/cast/read/'+j.msg_seq,d=>{
															sein.service.detail(j);	
														})
													})		
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
							if(d.page.pageNumber>=d.page.pageCount){
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
			console.log('배너 진입');
			$('<div/>').addClass('banner_rap').attr({id:'div_banner',style:'margin-bottom:10px'}).appendTo($('#sein_content'));
			$('<div/>').attr({id:'carousel','data-ride':'carousel'}).addClass('carousel slide').appendTo($('#div_banner'));
			$('<ol/>').addClass('carousel-indicators').appendTo($('#carousel'));
			$('<div/>').addClass('carousel-inner').appendTo($('#carousel'));
			let clazz=['active'];
			$.getJSON($.ctx()+'/rankLike/',d=>{
				$.each(d.list,(i,j)=>{
					$('<li/>').attr({'data-target':'#carousel', 'data-slide-to':i}).addClass(clazz[i]).appendTo($('.carousel-indicators'));	
					$('<div/>').attr({style:'cursor:pointer'}).addClass('carousel-item '+clazz[i]).append(
						$('<img/>').attr({src:$.img()+'/cast/'+j.msg_photo,style:'width:1300px;height:500px'}),
						$('<h3/>').addClass('carousel-caption center').append(
							$('<p>'+j.msg_title+'</p>')
						)
					).appendTo($('.carousel-inner')).click(e=>{
						sein.service.detail(j);
					});
				})
			})
			
			$('<a/>').addClass('carousel-control-prev').attr({href:'#carousel',role:'button','data-slide':'prev'}).appendTo($('#carousel'));
			$('<span/>').addClass('carousel-control-prev-icon').attr({'aria-hidden':'true'}).appendTo($('.carousel-control-prev'));
			$('<span/>').addClass('sr-only').html('이전').appendTo($('.carousel-control-prev')).appendTo($('.carousel-control-prev'));

			$('<a/>').addClass('carousel-control-next').attr({href:'#carousel',role:'button','data-slide':'next'}).appendTo($('#carousel'));
			$('<span/>').addClass('carousel-control-next-icon').attr({'aria-hidden':'true'}).appendTo($('.carousel-control-next'));
			$('<span/>').addClass('sr-only').html('다음').appendTo($('.carousel-control-next')).appendTo($('.carousel-control-next'));
			$('.carousel').carousel({
				interval: 2000
			});
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
												$.getJSON($.ctx()+'/cast/deleteBookmark/'+x.msg_seq+'/'+$.cookie('loginID'));
												$('.btnBookmark').removeClass('on');
											}											
										}else{
											if(confirm('북마크 하시겠습니까?')){
												$.getJSON($.ctx()+'/cast/saveBookmark/'+x.msg_seq+'/'+$.cookie('loginID'));
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
			$(window).off("scroll");
			let recent = new Array();
			$.each($.cookie('recent'),(i,j)=>{
				recent.unshift(j);
			})
			recent.unshift(x);
			$.cookie('recent',recent);
			
			$('#wrapper').scroll(()=>{e.preventDefault()});
			$('#sein_content').empty();
			$('<div/>').addClass('contents').attr({id:'topContent'}).appendTo($('#sein_content'));
			$('<div/>').addClass('con_inner').attr({style:'padding-top:30px'}).appendTo($('#topContent'));
			$('<div/>').addClass('con_detail bord_b').appendTo($('.con_inner'));
			
			$.getJSON($.ctx()+'/cast/read/'+x.msg_seq,d=>{
				let like_count=d.like_count;
				/*개인별 게시글 좋아요 북마크  체크*/
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
				/*구독중체크*/
				$.getJSON($.ctx()+'/cast/subcheck/'+$.cookie('loginID')+'/'+x.member_id,d=>{
					if(d===1){
						$('.bt_read').addClass('on')						
					}
				})
				/*구독수체크*/
				$.getJSON($.ctx()+'/cast/subcount/'+$.cookie('loginID')+'/',d=>{
					$('#sub_count').html(d);
				})
				
				sein.service.side_menu(d);
				$('<div/>').addClass('inner_bg').appendTo($('.con_detail'));
				$('<div/>').addClass('detail_user').appendTo($('.inner_bg'));
				$('<div/>').addClass('user_pic').appendTo($('.inner_bg'));
				$('<a/>').attr({href:'#'})
				.append(
					$('<img/>').attr({src:$.img()+'/profile/'+d.profileimg,style:'position: static; width: 100%; height: 100%'})
				)
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
		        
				$('<div/>').addClass('detail_title').append(
					$('<h3/>').addClass('sc_out'),
					$('<p/>').html(d.msg_title)		
				).append(
					$('<div/>').addClass('count').append(
						$('<span/>').addClass('date').html(dt),
						$('<span/>').addClass('ico_like'),
						$('<b/>').addClass('like_count').html(d.like_count),
						$('<span/>').addClass('ico_read'),
						$('<b/>').html(d.msg_count)
					)	
				).appendTo($('.inner_bg'));
				
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
				$('<div/>').attr({id:'imgAdd',style:'text-align:center',align:'center'}).append(
						$('<img/>').attr({src:$.img()+'/cast/'+d.msg_photo})
				)
				.appendTo($('.detail_area'));
				if(d.msg_photo1!==undefined){
					$('<img/>').attr({src:$.img()+'/cast/'+d.msg_photo1}).appendTo($('#imgAdd'));
				}
				
				/*해당 주소 지도*/
				if(!d.msg_addr==''||!d.msg_addr==undefined){
					sein.service.map({detail:d,appendTo:'.inner_bg'});
				}
					
					
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
					$('<li/>').append(
						$('<button/>').addClass('btnBookmark').attr({type:'button'}).append(
								$('<span/>').addClass('ico_detailbook')),
								$('<span>').addClass('bt_txt').html('북마크')
					).click(e=>{
						if($('.btnBookmark').hasClass('on')){
							if(confirm('북마크 취소 하시겠습니까?')){
								$.getJSON($.ctx()+'/cast/deleteBookmark/'+x.msg_seq+'/'+$.cookie('loginID'));								
								$('.btnBookmark').removeClass('on');
							}											
						}else{
							if(confirm('북마크 하시겠습니까?')){
								$.getJSON($.ctx()+'/cast/saveBookmark/'+x.msg_seq+'/'+$.cookie('loginID'));
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
				).appendTo($('.user_pic')).click(e=>{
					sein.service.caster(d);
				});
				$('<div/>').addClass('user_txt').appendTo($('.user_cast'));
				$('<a/>').attr({href:'#'}).addClass('user_name')
				.append(
						$('<strong/>').html(d.nickname)
				).appendTo($('.user_txt')).click(e=>{
					sein.service.caster(d);
				});
				$('<p/>').html(d.comment).appendTo($('.user_txt'));
				$('<div/>').addClass('count').append(
						$('<span/>').html('구독'),
						$('<b/>').attr({id:'sub_count'})
				).appendTo($('.user_txt'));
				
				$('<div/>').addClass('bt_read').append(
					$('<button/>').addClass('jsonSubscribedStatus').append($('<span/>').addClass('bt_reading'))
				).appendTo($('.user_cast')).click(e=>{
					if($('.bt_read').hasClass('on')){
						if(confirm('구독을 해지 하시겠습니까?')){
							$.getJSON($.ctx()+'/cast/subDes/'+$.cookie('loginID')+'/'+d.member_id+'/')
							$('.bt_read').removeClass('on');
						}											
					}else{
						if(confirm(d.nickname+'님의 글을 구독하시겠습니까?')){
							$.getJSON($.ctx()+'/cast/subInc/'+$.cookie('loginID')+'/'+d.member_id+'/')
							$('.bt_read').addClass('on');
						}	
					}
				});
				if($.cookie('loginID')==d.member_id){
					$('.bt_read').remove();
				}
				sein.service.reply(d);
			})
			$('<div/>').attr({style:'padding-top:30px'}).addClass('bottomContent contents bg_type').appendTo('#sein_content').append(
				$('<div/>').addClass('con_inner').append(
					$('<div/>').addClass('cast_area').append(
						$('<strong/>').attr({style:'text-align:center;font-size:30px'}).html('최근 본 캐스트'),
						$('<div/>').addClass('list_hidden').append(
							$('<ul/>').attr({style:'width:1100px;margin:0 auto'}).addClass('recentUl')	
						)
					)
				)	
			);
			$.each($.cookie('recent'),(i,j)=>{
				if(i<4){
					$('<li/>').append(
						$('<a/>').attr({href:'#'}).append(
							$('<span/>').append(
								$('<img/>').attr({src:$.img()+'/cast/'+j.msg_photo}).addClass('view_img')	
							),
							$('<div/>').addClass('place_txt').append(
								$('<strong/>').html(j.msg_title),
								$('<div/>').addClass('count').append(
									$('<span/>').addClass('ico_like'),
									$('<b/>').html(j.like_count),
									$('<span/>').addClass('ico_read'),
									$('<b/>').html(j.msg_count)
								)
							)
						)
					).appendTo('.recentUl');
				}
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
				$('<textarea/>').attr({id:'msg_addr',rows:'1',style:'width:100%',placeholder:'주소를 입력해주세요.'}),
				$('<form/>').addClass('dragAndDropDiv').attr({name:"uploadForm", id:"uploadForm", enctype:"multipart/form-data", method:"post",style:'font-size:12px'}).text('이미지를 드래그해주세요. 최대 2개. 첫번째가 대표이미지입니다.'),
				$('<div/>').attr({style:'margin-top:10px'}).append(
					$('<button/>').addClass('btn btn-danger').attr({id:'write_submit',style:'width:100%','data-dismiss':'modal','aria-hidden':'true'}).html('글쓰기')
				)
			).appendTo('#modalContent');
			 var objDragAndDrop = $(".dragAndDropDiv");
             
			  $(document).on("dragenter",".dragAndDropDiv",function(e){
                e.stopPropagation();
                e.preventDefault();
                $(this).attr('style','border:2px solid #0B85A1;font-size:12px');
            });
            $(document).on("dragover",".dragAndDropDiv",function(e){
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on("drop",".dragAndDropDiv",function(e){
                 
                $(this).attr('style','border:2px dotted #0B85A1;font-size:12px');
                e.preventDefault();
                var files = e.originalEvent.dataTransfer.files;
             
                handleFileUpload(files,objDragAndDrop);
            });
             
            $(document).on('dragenter', function (e){
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on('dragover', function (e){
              e.stopPropagation();
              e.preventDefault();
              objDragAndDrop.attr('style','border:2px dotted #0B85A1;font-size:12px');
            });
             $(document).on('drop', function (e){
                 e.stopPropagation();
                 e.preventDefault();
             });
              
             function handleFileUpload(files,obj)
             {
                for (var i = 0; i < files.length; i++) 
                {
                     var fd = new FormData();
                     fd.append('file', files[i]);
               
                     var status = new createStatusbar(obj); //Using this we can set progress.
                     status.setFileNameSize(files[i].name,files[i].size);
                     sendFileToServer(fd,status);
               
                }
             }
             
             var savedName=[];
             var rowCount=0;
             var row="odd";
             function createStatusbar(obj){
                      
                 rowCount++;
                 if(rowCount %2 ==0) row ="even";
                 this.statusbar = $("<div class='statusbar "+row+"'></div>");
                 this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
                 this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
                 this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
                 this.abort = $("<div class='abort'>중지</div>").appendTo(this.statusbar);
                 this.cancel = $('<div id=cancelbtn class="abort">취소</div>').appendTo(this.statusbar).click(e=>{
            	 	alert(savedName);
                	 this.statusbar.remove();
                	 $.getJSON($.ctx()+'/cast/removeImg/'+savedName+'/');
                 });
           			 
                 obj.after(this.statusbar);
               
                 this.setFileNameSize = function(name,size){
                     var sizeStr="";
                     var sizeKB = size/1024;
                     if(parseInt(sizeKB) > 1024){
                         var sizeMB = sizeKB/1024;
                         sizeStr = sizeMB.toFixed(2)+" MB";
                     }else{
                         sizeStr = sizeKB.toFixed(2)+" KB";
                     }
               
                     this.filename.html(name);
                     this.size.html(sizeStr);
                 }
                  
                 this.setProgress = function(progress){       
                     var progressBarWidth =progress*this.progressBar.width()/ 100;  
                     this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
                     if(parseInt(progress) >= 100)
                     {
                         this.abort.hide();
                     }
                 }
                  
                 this.setAbort = function(jqxhr){
                     var sb = this.statusbar;
                     this.abort.click(function()
                     {
                         jqxhr.abort();
                         sb.hide();
                     });
                 }
             }
        	  function sendFileToServer(formData,status) {
                	  var extraData ={}; //Extra Data.
                      var jqXHR=$.ajax({
                              xhr: function() {
                              var xhrobj = $.ajaxSettings.xhr();
                              if (xhrobj.upload) {
                                      xhrobj.upload.addEventListener('progress', function(event) {
                                          var percent = 0;
                                          var position = event.loaded || event.position;
                                          var total = event.total;
                                          if (event.lengthComputable) {
                                              percent = Math.ceil(position / total * 100);
                                          }
                                          //Set progress
                                          status.setProgress(percent);
                                      }, false);
                                  }
                              return xhrobj;
                          },
                          url: $.ctx()+'/cast/upload/',
                          type: "POST",
                          contentType:false,
                          processData: false,
                          cache: false,
                          data: formData,
                          success: d=>{
                              status.setProgress(100);
                              savedName.push(d);
                          }
                      }); 
                    
                      status.setAbort(jqXHR);
              }
        	  
        	  $('#write_submit').click(e=>{
            	  $.ajax({
    					url:$.ctx()+'/cast/write/',
    					method:'post',
    					contentType:'application/json',
    					data:JSON.stringify({member_id:$.cookie("loginID"),board_id:'cast',msg_title:$('#msg_title').val(),msg_content:$('#msg_content').val(),tag:$('#tag').val(),msg_photo:savedName[0],msg_photo1:savedName[1],msg_addr:$('#msg_addr')}),
    					success:d=>{
    						 $('#layerpop').on('hidden.bs.modal',()=>{
	            				sein.board.cast();
	                		})
    					},
    					error:(m1,m2,m3)=>{alert(m3)}
					})
              })
			
		},
		modify : x=>{
			$('#layerpop').draggable();
			$('<div/>').addClass('contents').attr({id:'modalContent'}).appendTo($('.modal-body'));
			$('<div/>').attr({style:'background-color:white'}).addClass('inner_bg').append(
				$('<textarea/>').attr({id:'msg_title',rows:'1',style:'width:100%'}).text(x.msg_title),
				$('<textarea/>').attr({id:'msg_content',style:'width:100%; height:500px'}).text(x.msg_content),
				$('<textarea/>').attr({id:'tag',rows:'1',style:'width:100%'}).text(x.tag),
				$('<textarea/>').attr({id:'msg_addr',rows:'1',style:'width:100%'}).text(x.msg_addr),
				$('<form/>').addClass('dragAndDropDiv').attr({name:"uploadForm", id:"uploadForm", enctype:"multipart/form-data", method:"post",style:'font-size:12px'}).text('수정할 이미지를 드래그해주세요. 최대 2개. 첫번째가 대표이미지입니다.'),
				$('<div/>').attr({style:'margin-top:10px'}).append(
					$('<button/>').addClass('btn btn-danger').attr({id:'mod_submit',style:'width:100%','data-dismiss':'modal','aria-hidden':'true'}).html('수정하기')
				)
			).appendTo('#modalContent');
			
			var objDragAndDrop = $(".dragAndDropDiv");
            
            $(document).on("dragenter",".dragAndDropDiv",function(e){
                e.stopPropagation();
                e.preventDefault();
                $(this).attr('style','border:2px solid #0B85A1');
            });
            $(document).on("dragover",".dragAndDropDiv",function(e){
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on("drop",".dragAndDropDiv",function(e){
                 
                $(this).attr('style','border:2px dotted #0B85A1');
                e.preventDefault();
                var files = e.originalEvent.dataTransfer.files;
             
                handleFileUpload(files,objDragAndDrop);
            });
             
            $(document).on('dragenter', function (e){
                e.stopPropagation();
                e.preventDefault();
            });
            $(document).on('dragover', function (e){
              e.stopPropagation();
              e.preventDefault();
              objDragAndDrop.attr('style','border:2px dotted #0B85A1');
            });
            $(document).on('drop', function (e){
                e.stopPropagation();
                e.preventDefault();
            });
             
            function handleFileUpload(files,obj)
            {
               for (var i = 0; i < files.length; i++) 
               {
                    var fd = new FormData();
                    fd.append('file', files[i]);
              
                    var status = new createStatusbar(obj); //Using this we can set progress.
                    status.setFileNameSize(files[i].name,files[i].size);
                    sendFileToServer(fd,status);
              
               }
            }
            var savedName=[];
            var rowCount=0;
            function createStatusbar(obj){
                     
                rowCount++;
                var row="odd";
                if(rowCount %2 ==0) row ="even";
                this.statusbar = $("<div class='statusbar "+row+"'></div>");
                this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
                this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
                this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
                this.abort = $("<div class='abort'>중지</div>").appendTo(this.statusbar);
                this.cancel = $('<div id=cancelbtn class="abort">취소</div>').appendTo(this.statusbar).click(e=>{
            	 	alert(savedName);
                	 this.statusbar.remove();
                	 $.getJSON($.ctx()+'/cast/removeImg/'+savedName+'/');
                 });
                 
                obj.after(this.statusbar);
              
                this.setFileNameSize = function(name,size){
                    var sizeStr="";
                    var sizeKB = size/1024;
                    if(parseInt(sizeKB) > 1024){
                        var sizeMB = sizeKB/1024;
                        sizeStr = sizeMB.toFixed(2)+" MB";
                    }else{
                        sizeStr = sizeKB.toFixed(2)+" KB";
                    }
              
                    this.filename.html(name);
                    this.size.html(sizeStr);
                }
                 
                this.setProgress = function(progress){       
                    var progressBarWidth =progress*this.progressBar.width()/ 100;  
                    this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
                    if(parseInt(progress) >= 100)
                    {
                        this.abort.hide();
                    }
                }
                 
                this.setAbort = function(jqxhr){
                    var sb = this.statusbar;
                    this.abort.click(function()
                    {
                        jqxhr.abort();
                        sb.hide();
                    });
                }
            }
       	  function sendFileToServer(formData,status) {
               	  var extraData ={}; //Extra Data.
                     var jqXHR=$.ajax({
                             xhr: function() {
                             var xhrobj = $.ajaxSettings.xhr();
                             if (xhrobj.upload) {
                                     xhrobj.upload.addEventListener('progress', function(event) {
                                         var percent = 0;
                                         var position = event.loaded || event.position;
                                         var total = event.total;
                                         if (event.lengthComputable) {
                                             percent = Math.ceil(position / total * 100);
                                         }
                                         //Set progress
                                         status.setProgress(percent);
                                     }, false);
                                 }
                             return xhrobj;
                         },
                         url: $.ctx()+'/cast/uploadMod/'+x.msg_photo+'/'+x.msg_photo1+'/',
                         type: "POST",
                         contentType:false,
                         processData: false,
                         cache: false,
                         data: formData,
                         success: d=>{
                             status.setProgress(100);
                             savedName.push(d);
                         }
                     }); 
                   
                     status.setAbort(jqXHR);
             }
       	  $('#mod_submit').click(e=>{
           	  $.ajax({
   					url:$.ctx()+'/cast/modify/',
   					method:'post',
   					contentType:'application/json',
   					data:JSON.stringify({msg_seq:x.msg_seq,member_id:$.cookie("loginID"),board_id:'cast',msg_title:$('#msg_title').val(),msg_content:$('#msg_content').val(),tag:$('#tag').val(),msg_photo:savedName[0],msg_photo1:savedName[1]}),
   					success:d=>{
   						 $('#layerpop').on('hidden.bs.modal',()=>{
	            				sein.board.cast();
	                		})
   					},
   					error:(m1,m2,m3)=>{alert(m3)}
					})
             })
			
			
			
			
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
		$(window).off("scroll");
		$('#sein_content').empty();
		var sub_count;
		$.getJSON($.ctx()+'/cast/subcheck/'+$.cookie('loginID')+'/'+x.member_id,d=>{
			if(d===1){
				$('.bt_read').addClass('on')						
			}
		})

		/*구독수*/
		$.getJSON($.ctx()+'/cast/subcount/'+x.member_id+'/',d=>{
			$('#sub_count').html(d);
			sub_count = d;
		})
		/*캐스트수*/
		$.getJSON($.ctx()+'/cast/castcount/'+x.member_id+'/',d=>{
			$('#cast_count').html(d);
		})
		
		
		$('<div/>').addClass('contents bg_type2').attr({style:'min-height: 400px;'}).appendTo($('#sein_content'));
		$('<div/>').addClass('caster_rap').appendTo($('.bg_type2'));
		$('<div/>').addClass('caster_inner').append(
			$('<div/>').addClass('caster_c').append(
				$('<div/>').addClass('user_pic').append(
					$('<a/>').attr({href:'#none',src:$.img()+'/profile/'+x.profileimg})
				),
				$('<span/>').addClass('ico_caster'),
				$('<strong/>').html(x.nickname),
				$('<p/>').html(x.comment), 
				$('<div/>').addClass('nav_sns').append(
					$('<li/>').addClass('ico_face').attr({style:'display:none'}).append($('<a/>').attr({href:''}).append($('<span/>').addClass('ico_face'))),
					$('<li/>').addClass('ico_blog').attr({style:'display:none'}).append($('<a/>').attr({href:''}).append($('<span/>').addClass('ico_blog'))),
					$('<li/>').addClass('ico_web').attr({style:'display:none'}).append($('<a/>').attr({href:''}).append($('<span/>').addClass('ico_web')))				
				),
				$('<div/>').addClass('bt_read').append(
					$('<button/>').attr({type:'button',title:'구독하기'}).append(
						$('<span/>').addClass('bt_reading')
					)
				).click(e=>{
					if($('.bt_read').hasClass('on')){
						if(confirm('구독을 해지 하시겠습니까?')){
							$.getJSON($.ctx()+'/cast/subDes/'+$.cookie('loginID')+'/'+x.member_id+'/')
							$('.bt_read').removeClass('on');
							sub_count=sub_count-1;
							$('#sub_count').html(sub_count);
						}			
					}else{
						if(confirm(x.nickname+'님의 글을 구독하시겠습니까?')){
							$.getJSON($.ctx()+'/cast/subInc/'+$.cookie('loginID')+'/'+x.member_id+'/')
							$('.bt_read').addClass('on');
							sub_count=sub_count+1;
							$('#sub_count').html(sub_count);
						}	
					}
				})
			),
			$('<div/>').addClass('caster_l').append($('<b/>').html('캐스트'),$('<br/>'),$('<span/>').attr({id:'cast_count'})),
			$('<div/>').addClass('caster_r').append($('<b/>').html('구독'),$('<br/>'),$('<span/>').attr({id:'sub_count'}))
		).appendTo($('.caster_rap'));
		
		
		$('<div/>').addClass('contents').appendTo($('#sein_content'));
		
		$('<div/>').attr({id:'cardlist_rap'}).appendTo($('#sein_content'));
		$('<div>').attr({style:'margin-top:10px'}).addClass('grid card_type').appendTo($('#cardlist_rap'));
		$.ajax({
			url:$.ctx()+'/cast/',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({board_id:'cast',pageNumber:1,member_id:x.member_id}),
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
					if(!d.page.nextBlock){
						$('#bt_more').empty();
					}
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
				let castPage =1;
			$('#bt_more').remove();
			$(window).scroll(()=>{
				if($(document).height() <= $(window).scrollTop()+$(window).height()+1){
					$.ajax({
						url:$.ctx()+'/cast/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({board_id:'cast',pageNumber:++castPage,member_id:x.member_id}),
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
							if(d.page.pageNumber>=d.page.pageCount){
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
	mycast : x=>{
		$('#header').empty();	
		$('#content').empty();	
		$(window).off("scroll");
		$('#sein_content').empty();	
		$('<div/>').addClass('contents').attr({style:'padding:60px 0;;min-height:720px'}).append(
			$('<div/>').attr({style:'background-color:white;'}).addClass('type ver2').append(
				$('<div/>').addClass('inner').append(
					$('<h3/>').html('마이캐스트').attr({style:'margin-top:20px'}),
					$('<ul/>').addClass('nav_menu').append(
						$('<li/>').append(
							$('<a/>').attr({href:'#'}).html('최근본캐스트')).click(e=>{
							$('.con_inner').remove();
							$('<div/>').addClass('con_inner').append(
								$('<div/>').addClass('mycast_rap bord_all').append(
									$('<ul/>').addClass('mycast_list')
								),
								$('<div/>').addClass('bt_rap')
							).appendTo($('.contents'))
							$.each($.cookie('recent'),(i,j)=>{
								sein.service.recent({index:i,page:j});
							})
						}),
						$('<li/>').append(
							$('<a/>').attr({href:'#'}).html('구독')
						).click(e=>{
							$('.con_inner').remove();
							$('<div/>').addClass('con_inner').append(
								$('<div/>').addClass('mycast_rap2').append(
									$('<ul/>').addClass('mycast_list2')
								),
								$('<div/>').addClass('bt_rap')
							).appendTo($('.contents'))
							$.getJSON($.ctx()+'/mysub/'+$.cookie('loginID')+'/',d=>{
								$.each(d.list,(i,j)=>{
									sein.service.mysub(j);	
								})
							})
						}),
						$('<li/>').append(
							$('<a/>').attr({href:'#'}).html('북마크')).click(e=>{
								$('.con_inner').remove();
								$('<div/>').addClass('con_inner').append(
									$('<div/>').addClass('mycast_rap bord_all').append(
										$('<ul/>').addClass('mycast_list')
									),
									$('<div/>').addClass('bt_rap')
								).appendTo($('.contents'))
								$.getJSON($.ctx()+'/myBookmark/'+$.cookie('loginID')+'/',d=>{
								$.each(d.list,(i,j)=>{
									sein.service.mybookmark(j);	
								})
							})
						})
					)
				)
			)		
		).appendTo($('#content'));
		
		$('<div/>').addClass('con_inner').append(
			$('<div/>').addClass('mycast_rap bord_all').append(
				$('<ul/>').addClass('mycast_list')
			),
			$('<div/>').addClass('bt_rap')
		).appendTo($('.contents'))
			
		$.each($.cookie('recent'),(i,j)=>{
			sein.service.recent({index:i,page:j});
		})
			
	},
	recent : x=>{
		$('<li/>').attr({id:'recent'+x.page.msg_seq}).append(
			$('<div/>').addClass('list_l').attr({style:'height:140px'}).append(
				$('<img/>').attr({src:$.img()+'/cast/'+x.page.msg_photo,style:'cursor:pointer'}).click(e=>{
					sein.service.detail(x.page);
				})
			),
			$('<div/>').append(
				$('<a/>').attr({href:'#',style:'font-size: 18px;color: #444;'}).html(x.page.msg_title).append(
					$('<div/>').addClass('count').append(
						$('<span/>').addClass('ico_like'),
						$('<b/>').html(x.page.like_count),
						$('<span/>').addClass('ico_read'),
						$('<b/>').html(x.page.msg_count)
					)		
				).click(e=>{
					sein.service.detail(x.page);
				}),
				$('<a/>').attr({href:'#'}).append(
					$('<div/>').attr({style:'margin-top:30px;'}).append(
						$('<img/>').attr({src:$.img()+'/profile/'+x.page.profileimg,style:'width:35px'}),
						$('<b/>').text(x.page.nickname).attr({style:'margin-left:5px;font-size: 12px; color: #ff5f81; font-weight: normal;'}).append(
							$('<span/>').attr({style:'font-size: 12px; color: #999;'}).text(' '+x.page.comment)
						)
					)	
				).click(e=>{
					sein.service.caster(x.page);
				}),
				$('<div/>').addClass('list_del').append(
					$('<a/>').attr({title:'삭제하기',style:'margin-top:10px'}).append(
						$('<span/>').addClass('ico_del')	
					),
					$('<b/>').addClass('bg_del').attr({style:'width:80px;height:50px;margin-top:10px'}).html('삭제').click(e=>{
						if(confirm('삭제 하시겠습니까?')){
							$('#recent'+x.page.msg_seq).remove();
							let recent = new Array();
							$.each($.cookie('recent').reverse(),(i,j)=>{
								recent.unshift(j);
							})
							recent.splice(x.index,1);
							$.cookie('recent',recent);
						}
					})
				)
			)
		).appendTo('.mycast_list')
	},
	mybookmark : x=>{
		$('<li/>').attr({id:'bookmark'+x.msg_seq}).append(
				$('<div/>').addClass('list_l').attr({style:'height:140px'}).append(
					$('<img/>').attr({src:$.img()+'/cast/'+x.msg_photo,style:'cursor:pointer'}).click(e=>{
						sein.service.detail(x);
					})
				),
				$('<div/>').append(
					$('<a/>').attr({href:'#',style:'font-size: 18px;color: #444;'}).html(x.msg_title).append(
						$('<div/>').addClass('count').append(
							$('<span/>').addClass('ico_like'),
							$('<b/>').html(x.like_count),
							$('<span/>').addClass('ico_read'),
							$('<b/>').html(x.msg_count)
						)		
					).click(e=>{
						sein.service.detail(x);
					}),
					$('<a/>').attr({href:'#'}).append(
						$('<div/>').attr({style:'margin-top:30px;'}).append(
							$('<img/>').attr({src:$.img()+'/profile/'+x.profileimg,style:'width:35px'}),
							$('<b/>').text(x.nickname).attr({style:'margin-left:5px;font-size: 12px; color: #ff5f81; font-weight: normal;'}).append(
								$('<span/>').attr({style:'font-size: 12px; color: #999;'}).text(' '+x.comment)
							)
						)	
					).click(e=>{
						sein.service.caster(x);
					}),
					$('<div/>').addClass('list_del').append(
						$('<a/>').attr({title:'삭제하기',style:'margin-top:10px'}).append(
							$('<span/>').addClass('ico_del')	
						),
						$('<b/>').addClass('bg_del').attr({style:'width:80px;height:50px;margin-top:10px'}).html('삭제').click(e=>{
							if(confirm('삭제 하시겠습니까?')){
								$('#bookmark'+x.msg_seq).remove();
								$.getJSON($.ctx()+'/cast/deleteBookmark/'+x.msg_seq+'/'+$.cookie('loginID'));
							}
						})
					)
				)
			).appendTo('.mycast_list')
		},
	mysub : x=>{
		$('<li/>').attr({id:'mybook_'+x.member_id,style:'height:240px;'}).addClass('bord_all').append(
			$('<div/>').addClass('list_inner').append(
				$('<a/>').attr({href:'#'}).append(
					$('<div/>').addClass('user_pic').append(
						$('<img/>').addClass('profile_pic').attr({src:$.img()+'/profile/'+x.profileimg}).click(e=>{
							sein.service.caster(x);
						})			
					),
					$('<div/>').addClass('user_info').append(
						$('<a/>').attr({href:'#'}).append(
							$('<strong>'+x.nickname+'</strong>'),
							$('<span>'+x.comment+'</span>')
						)
					),
					$('<div/>').addClass('count2').attr({style:'margin-top:10px'}).append(
						$('<span/>').html('캐스트'),
						$('<b/>').html(x.count)
					)
				),
				$('<div/>').addClass('list_del type2').append(
					$('<a/>').attr({href:'#',title:'구독취소'}).append(
						$('<span/>').addClass('ico_del')	
					),
					$('<b/>').attr({style:'width:100px;height:30px'}).addClass('bg_del').html('구독취소').click(e=>{
						if(confirm('구독을 해지 하시겠습니까?')){
							$.getJSON($.ctx()+'/cast/subDes/'+$.cookie('loginID')+'/'+x.member_id+'/')
							$('.bt_read').removeClass('on');
							$('#mybook_'+x.member_id).remove()
						}
					})
				)
			)
		).appendTo('.mycast_list2')
	},
	map :x=>{
		$('<div/>').attr({id:'map'}).append('<br>').appendTo($(x.appendTo));
		$('<div/>').attr({id:'location',style:'width:100%;height:400px'}).appendTo($($(x.appendTo)));
		var mapContainer = document.getElementById('location'), // 지도를 표시할 div 
	    mapOption = {
	        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
	        level: 2 // 지도의 확대 레벨
	    };  
	
		// 지도를 생성합니다    
		var map = new daum.maps.Map(mapContainer, mapOption); 
	
		// 주소-좌표 변환 객체를 생성합니다
		var geocoder = new daum.maps.services.Geocoder();
	
		// 주소로 좌표를 검색합니다
		geocoder.addressSearch(x.detail.msg_addr, function(result, status) {
		    // 정상적으로 검색이 완료됐으면 
		     if (status === daum.maps.services.Status.OK) {
	
		        var coords = new daum.maps.LatLng(result[0].y, result[0].x);
	
		        // 결과값으로 받은 위치를 마커로 표시합니다
		        var marker = new daum.maps.Marker({
		            map: map,
		            position: coords
		        });
	
		        // 인포윈도우로 장소에 대한 설명을 표시합니다
		        var infowindow = new daum.maps.InfoWindow({
		            content: '<div id="marker" style="width:150px;text-align:center;padding:6px 0;">Here</div>'
		        });
		        infowindow.open(map, marker);
	
		        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		        map.setCenter(coords);
		        $('#marker').click(e=>{
		        	
		        })
		    } 
		});    
	},
	search : x=>{
		$(window).off("scroll");
		$('#cardlist_rap').remove();
		$('<div/>').attr({id:'cardlist_rap'}).appendTo($('#sein_content'));
		$('<div>').attr({style:'margin-top:10px'}).addClass('grid card_type').appendTo($('#cardlist_rap'));
		let page=0;
		$.ajax({
			url:$.ctx()+'/cast/search/'+x+'/',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({board_id:'cast',pageNumber:1}),
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
					if(!d.page.nextBlock){
						$('#bt_more').empty();
					}
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
			let searchPage =1;
			$('#bt_more').remove();
			$(window).scroll(()=>{
				if($(document).height() <= $(window).scrollTop()+$(window).height()+1){
					$.ajax({
						url:$.ctx()+'/cast/search/'+x+'/',
						method:'post',
						contentType:'application/json',
						data:JSON.stringify({board_id:'cast',pageNumber:++searchPage}),
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
							if(d.page.pageNumber>=d.page.pageCount){
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