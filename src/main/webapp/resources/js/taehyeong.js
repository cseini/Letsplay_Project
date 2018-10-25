/*"use strict"; 
var taehyeong = taehyeong ||{};
taehyeong = {
	init : x =>{
		taehyeong.content1.surroundings();
	}
}*/
"user strict"
var taehyeong = taehyeong || {};

taehyeong.content1 = {
	surroundings:x =>{
		let date = new Date();
		$('#header').empty();
		$('#content').empty();
		$('<div/>').addClass('date_selecter').attr({id:'date_selecter'}).appendTo($('#content'));
		$('<i/>').addClass('icono-calendar').attr({id:'calendar'}).appendTo($('#date_selecter'));
		$('<input/>').appendTo($('#date_selecter'));
		taehyeong.category.category(x);
		}
}
taehyeong.category={
	category : x=>{
		$('<div/>').addClass('category').attr({id:'category'}).appendTo($('#content'));
		let category = ["모텔","#마이룸","#야놀자호텔","#신축/리모델링","#인기숙소","#파티룸","#무료영화"]; 
		$.each(category,(i,j)=>{
			$('<p/>').addClass('category_font').html(j).appendTo($('#category'));
		})
		taehyeong.list_map.list_map(x);
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
			
			$('#radio3_button').click(()=>{
				$('#radio3__').remove();
			})
		})
		
		$('#list_li3').click(x=>{
			$('<div/>').addClass('radio__1').attr({id:'radio4__'}).appendTo($('#list_li1_div3'));
			
		})
		$('<div/>').addClass('font_1 font_weight800').html('이 지역 추천').appendTo($('#list'));
		$('<div/>').addClass('first_list').attr({id:'first_list'}).appendTo($('#list'))
		let high_rank_img = [x.list[0],x.list[1],x.list[2],x.list[3]];
		
		$.each(high_rank_img,(i,j)=>{
			$('<div/>').addClass('first_list_one').attr({id:'first_list_one'+i}).appendTo($('#first_list'))
			$('<div>').addClass('image_Box10').attr({id:'image_Box10'+i}).appendTo($('#first_list_one'+i))
			$('<img/>').addClass('high_rank_img cursor_pointer').attr({id:'high_rank_img'+i,src:j.ACCOM_PHOTO1}).appendTo($('#image_Box10'+i));
			$('<p/>').addClass('ppp__').html(j.ACCOM_NAME).appendTo($('#image_Box10'+i));
			$('<span>').addClass('span_').attr({id:'span_'+i}).appendTo($('#image_Box10'+i))
			$('<p/>').addClass('p_span p_span0').html('대실').appendTo($('#span_'+i))
			$('<h5/>').addClass('p_span').html(j.PRICE).appendTo($('#span_'+i))
			$('<p/>').addClass('p_span p_won').html('원').appendTo($('#span_'+i))
			$('<p/>').addClass('p_span p_span0').html('숙박').appendTo($('#span_'+i))
			$('<h5/>').addClass('p_span').html(j.PRICE+40000).appendTo($('#span_'+i))
			$('<p/>').addClass('p_span p_won').html('원').appendTo($('#span_'+i))
			
			$('#high_rank_img'+i).click(()=>{
				alert(j.ACCOM_SEQ)
			})
		})
		$('<p/>').addClass('font_1 font_weight800 padding_top_30').html('프리미엄').appendTo($('#list'));
		$('<ul/>').addClass('premium_selecter').attr({id:'premium_selecter'}).appendTo($('#list'));
		$.each(x.list,(i,j)=>{
			$('<li/>').addClass('premium_selecter_li').attr({id:'premium_selecter_li'+i}).appendTo($('#premium_selecter'))
			$('<img/>').addClass('premium_selecter_img cursor_pointer').attr({id:'list_img'+i,src:j.ACCOM_PHOTO1}).appendTo($('#premium_selecter_li'+i))
			$('<div/>').addClass('premium_selecter_writer').attr({id:'premium_selecter_writer'+i}).appendTo($('#premium_selecter_li'+i));
			$('<h3/>').attr({id:'list_title'+i}).html(j.ACCOM_NAME).appendTo($('#premium_selecter_writer'+i));
			//별점이 들어갈 자리$('<span>').addClass('star__').attr({id:'star__'}).appendTo($('#premium_selecter_writer'+i))
			$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation'+i}).appendTo($('#premium_selecter_writer'+i))
			$('<h6/>').addClass('p_span').html('대실').appendTo($('#premium_selecter_explanation'+i));
			$('<h6/>').addClass('p_span p_padding5').html('최대 4시간').appendTo($('#premium_selecter_explanation'+i));
			$('<h4/>').addClass('p_span p_padding20').html(j.PRICE).appendTo($('#premium_selecter_explanation'+i));
			$('<h6/>').addClass('p_span').html('원').appendTo($('#premium_selecter_explanation'+i));
			$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation_'+i}).appendTo($('#premium_selecter_writer'+i))
			$('<h6/>').addClass('p_span').html('숙박').appendTo($('#premium_selecter_explanation_'+i));
			$('<h6/>').addClass('p_span p_padding5').html('20:00~').appendTo($('#premium_selecter_explanation_'+i));
			$('<h4/>').addClass('p_span p_padding30').html(j.PRICE+40000).appendTo($('#premium_selecter_explanation_'+i));
			$('<h6/>').addClass('p_span').html('원').appendTo($('#premium_selecter_explanation_'+i));
			let split_introduce = j.ACCOM_INTRODUCE.split('-');
			$('<h6/>').addClass('font_color11').html(split_introduce[0]).appendTo($('#premium_selecter_writer'+i));
			$('<h6/>').addClass('font_color11').html(split_introduce[1]).appendTo($('#premium_selecter_writer'+i));
			
			$('#list_title'+i).mouseenter(function(){
				$('#list_title'+i).addClass('cursor_pointer color_red');
			});
			$('#list_title'+i).mouseleave(function(){
				$('#list_title'+i).removeClass('cursor_pointer color_red');
			  });
		})
		/*$('.mouseenter_pink').mouseenter(function(){
			$('.mouseenter_pink').addClass('dldld');
		});
		$('.mouseenter_pink').mouseleave(function(){
			$('.mouseenter_pink').removeClass('dldld');
		  });*/
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
	//서울특별시 강남구 신사동 587-21
	var mapContainer = document.getElementById('map1'), // 지도를 표시할 div  
    mapOption = { 
        center: new daum.maps.LatLng(37.566535,126.97796919999996), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };
	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	var positions = new Array();
	$.each(x.list,(i,j)=>{
		positions.push({'title' : j.ACCOM_NAME,
				'latlng': new daum.maps.LatLng(j.ACCOM_PLACE.split(',')[0],j.ACCOM_PLACE.split(',')[1])})
	})
	var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
	var imageSize = new daum.maps.Size(34, 60); 
	for (var i = 0; i < positions.length; i ++) {
	    // 마커 이미지를 생성합니다    
	    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 
	    
	    // 마커를 생성합니다
	    var marker = new daum.maps.Marker({
	        map: map, // 마커를 표시할 지도
	        position: positions[i].latlng, // 마커를 표시할 위치
	        image : markerImage // 마커 이미지 
	    });
	    var content = '<div class="customoverlay">' +
	    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
	    '    <span class="title">구의야구공원</span>' +
	    '  </a>' +
	    '</div>';
	    var position = positions[i].latlng;
	    var customOverlay = new daum.maps.CustomOverlay({
	        map: map,
	        position: position,
	        content: content,
	        yAnchor: 1 
	    });
	}
		$('#footer').empty();//.appendTo($('#content'));
	
	
	}
}