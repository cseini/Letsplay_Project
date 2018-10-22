/*"use strict"; 
var taehyeong = taehyeong ||{};
taehyeong = {
	init : x =>{
		taehyeong.content1.surroundings();
	}
}*/

"user strict"
var taehyeong = taehyeong || {};
taehyeong.main=(()=>{
	var init=()=>{
		onCreate();
	}
	var onCreate =()=>{
		setContentView();
	}
	var setContentView =()=>{
		taehyeong.content1.surroundings();
	}
	return {init:init};
})();

taehyeong.content1 = {
	surroundings:x =>{
		let date = new Date();
		$('#header').empty();
		$('#content').empty();
		$('<div/>').addClass('date_selecter').attr({id:'date_selecter'}).appendTo($('#content'));
		$('<i/>').addClass('icono-calendar').attr({id:'calendar'}).appendTo($('#date_selecter'));
		$('<input/>').appendTo($('#date_selecter'));
		taehyeong.category.category();
		}
}
taehyeong.category={
	category : x=>{
		$('<div/>').addClass('category').attr({id:'category'}).appendTo($('#content'));
		let category = ["모텔","#마이룸","#야놀자호텔","#신축/리모델링","#인기숙소","#파티룸","#무료영화"]; 
		$.each(category,(i,j)=>{
			$('<p/>').addClass('category_font').html(j).appendTo($('#category'));
		})
		taehyeong.list_map.list_map();
	}
}

taehyeong.list_map={
	list_map : x=>{
		$('<div/>').addClass('list_map').attr({id:'list_map'}).appendTo($('#content'));
		$('<div/>').addClass('list').attr({id:'list'}).appendTo($('#list_map'));
		$('<ul/>').addClass('list_ul').attr({id:'list_ul'}).appendTo($('#list'))
		let list_menu = ["기본순","테마","숙소 특징","가격대선택"];
		$.each(list_menu,(i,j)=>{
			$('<div/>').addClass('list_li1_div').attr({id:'list_li1_div'+i}).appendTo($('#list_ul'))
			$('<li/>').addClass('list_li').attr({id:'list_li'+i}).appendTo($('#list_li1_div'+i))
			$('<p/>').addClass('list_font').html(j).appendTo($('#list_li'+i));
			$('<i/>').addClass('icono-caretDown').appendTo($('#list_li'+i));
		})
		$('<label/>').addClass('list_font').attr({for:'Reservation_',id:'Reservation__'}).html('예약가능').appendTo($('#list_ul'));
		$('<input/>').addClass('Reservation_').attr({type:'checkbox',id:'Reservation_'}).appendTo($('#Reservation__'))
		
		$('<p/>').addClass('list_font').attr({id:'font_'}).html('필터 초기화').appendTo($('#list_ul'));
		$('<i>').addClass('icono-reset').appendTo($('#font_'));
		$('#list_li0').click(x=>{
			$('<div/>').addClass('radio__1').attr({id:'radio__1'}).appendTo($('#list_li1_div0'));
			$.each(["기본순","인기순","가볼래요 많은 순"],(i,j)=>{
				$('<div/>').addClass('radio1__input').attr({id:'radio1_input'+i}).appendTo($('#radio__1'))
				$('<p/>').addClass('radio1__input__font').attr({id:'radio1_writer'+i}).html(j).appendTo($('#radio1_input'+i));
			});
			$('#radio1_writer0').click(x=>{
				alert('dd');
			});
			$('#radio1_writer1').click(x=>{
				alert('dd');
			});
			$('#radio1_writer2').click(x=>{
				alert('dd');
			});
			$('#radio__1').click(()=>{
					$('#radio__1').remove();
				})
		})
		
		$('#list_li1').click(x=>{
			$('<div/>').addClass('radio__1').attr({id:'radio2__'}).appendTo($('#list_li1_div1'));
			
		})
		$('#list_li2').click(x=>{
			$('<div/>').addClass('radio__1 radio__12').attr({id:'radio3__'}).appendTo($('#list_li1_div2'));
			let radio3___checkBox = [{id:'choi_ju_ga',name:"최저가보상"},
									{id:'molka',name:"몰카예방교육"},
									{id:'hunjang',name:"현장적립"},
									{id:'good_sukbak',name:"좋은숙박 TOP100"}]; 
			$.each(radio3___checkBox,(i,j)=>{
				$('<div/>').addClass('radio3__div').attr({id:'radio3__div'+i}).appendTo($('#radio3__'));
				$('<label>').attr({for:radio3___checkBox[i].id}).html(radio3___checkBox[i].name).appendTo($('#radio3__div'+i));
				$('<input/>').attr({type:'checkbox',id:radio3___checkBox[i].id}).appendTo($('#radio3__div'+i));
			})
			$('<button/>').addClass('radio3_button').attr({id:'radio3_button'}).html('확인').appendTo($('#radio3__'));
		})
		$('#list_li3').click(x=>{
			$('<div/>').addClass('radio__1').attr({id:'radio4__'}).appendTo($('#list_li1_div3'));
			
		})
		$('<div/>').addClass('font_1 font_weight800').html('이 지역 추천').appendTo($('#list'));
		$('<div/>').addClass('first_list').attr({id:'first_list'}).appendTo($('#list'))
		let test_img = ["img","img","img","img"];
		
		$.each(test_img,(i,j)=>{
			$('<div/>').addClass('first_list_one').attr({id:'first_list_one'+i}).appendTo($('#first_list'))
			$('<img/>').addClass('test_img').attr({src:'/web/resources/img/TestPicture.jpg',id:'test_img'+i}).appendTo($('#first_list_one'+i));
			//$('<p/>').addClass('ppp__').html('H Avenue 역삼점').appendTo($('#first_list_one'+i));
			$('<span>').addClass('span_').attr({id:'span_'+i}).appendTo($('#first_list_one'+i))
			$('<p/>').addClass('p_span').html('대실').appendTo($('#span_'+i))
			$('<h4/>').addClass('p_span p_span0').html(' 40,000원').appendTo($('#span_'+i))
			$('<p/>').addClass('p_span').html('숙박').appendTo($('#span_'+i))
			$('<h4/>').addClass('p_span p_span0').html(' 80,000원').appendTo($('#span_'+i))
		})
		$('<p/>').addClass('font_1 font_weight800').html('프리미엄').appendTo($('#list'));
		$('<ul/>').addClass('premium_selecter').attr({id:'premium_selecter'}).appendTo($('#list'));
		$.each(test_img,(i,j)=>{
			$('<li/>').addClass('premium_selecter_li').attr({id:'premium_selecter_li'+i}).appendTo($('#premium_selecter'))
			$('<img/>').addClass('premium_selecter_img').attr({src:'/web/resources/img/TestPicture.jpg'}).appendTo($('#premium_selecter_li'+i))
			$('<div/>').addClass('premium_selecter_writer').attr({id:'premium_selecter_writer'+i}).appendTo($('#premium_selecter_li'+i));
			$('<h3/>').html('H Avenue 역삼점').appendTo($('#premium_selecter_writer'+i));
			//별점이 들어갈 자리$('<span>').addClass('star__').attr({id:'star__'}).appendTo($('#premium_selecter_writer'+i))
			$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation'+i}).appendTo($('#premium_selecter_writer'+i))
			$('<h6/>').addClass('p_span').html('대실').appendTo($('#premium_selecter_explanation'+i));
			$('<h6/>').addClass('p_span p_padding5').html('최대 4시간').appendTo($('#premium_selecter_explanation'+i));
			$('<h4/>').addClass('p_span p_padding20').html('35,000원').appendTo($('#premium_selecter_explanation'+i));
			$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation1'+i}).appendTo($('#premium_selecter_writer'+i))
			$('<h6/>').addClass('p_span').html('숙박').appendTo($('#premium_selecter_explanation1'+i));
			$('<h6/>').addClass('p_span p_padding5').html('20:00~').appendTo($('#premium_selecter_explanation1'+i));
			$('<h4/>').addClass('p_span p_padding30').html('80,000원').appendTo($('#premium_selecter_explanation1'+i));
			$('<h6/>').addClass('font_color11').html('1. 정성스런 리뷰작성시 무료초대권 증정.☝').appendTo($('#premium_selecter_writer'+i));
			$('<h6/>').addClass('font_color11').html('리치웰 와인. 맥주 프로모션 / 주류주문시 마른안주세트 무료제공.☺').appendTo($('#premium_selecter_writer'+i));
		})
		$('<div/>').addClass('map').attr({id:'map'}).appendTo($('#list_map'));
		$('<div/>').addClass('map1').attr({id:'map1'}).appendTo($('#map'))
		$('<div/>').addClass('map_header').attr({id:'map_header'}).appendTo($('#map1'));
		let marker_guide = ["모텔","호텔","펜션","게스트하우스","비제휴"];
		let square_color = ["#00\e0d1","#722" +
				"c82","#ff6659","#97c91d","#ccc"];
		$.each(marker_guide,(i,j)=>{
			$('<div/>').addClass('map_header_writer').attr({id:'map_header_writer'+i}).appendTo($('#map_header'))
			$('<div/>').addClass('square').attr('style','background-color:'+square_color[i]).appendTo($('#map_header_writer'+i));
			$('<p/>').addClass('font_2').html(j).appendTo($('#map_header_writer'+i));
		})
	    mapOption = { 
	        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };
	    
	// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
	new daum.maps.Map(document.getElementById('map1'), mapOption);
		$('#footer').empty();//.appendTo($('#content'));
	}
}