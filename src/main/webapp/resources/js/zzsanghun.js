"use strict";
var sanghoon = sanghoon || {};
var googleChart = googleChart || {};

sanghoon.main =(()=>{
	var init =()=>{
		onCreate();
	};
	var onCreate =()=>{
		setContentView();
	};
	var setContentView =()=>{
		$('#header').empty();
		$('#mylocation').remove();
		$('#hotelSearch').remove();
		$('#amdin').remove();
		
		$('#board').remove();
		$('<a/>').attr({id:'basic_btn', href:'#'}).html('기본정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.basic();
		});
		
		
		$('#amdin').remove();
		$('<a/>').attr({id:'sales_btn', href:'#'}).html('매출정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.sales();
		});
		
		$('#add_btn').remove();
		$('<a/>').attr({id:'accom_btn', href:'#'}).html('숙소정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.accom();
		});
		
		$('#login_btn').remove();
		$('<a/>').attr({id:'custo', href:'#'}).html('고객정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.custo();
		});
		
		$('<a/>').attr({id:'top_accom_btn', href:'#'}).html('top 숙소')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.top_accom();
		});
		sanghoon.service.basic();
	};
	return {init:init};
		
})();

googleChart.service = {
		
	  basicInfo : () => {
		  $.getJSON($.ctx()+'/admin/basic',d=>{
			  google.charts.load("current", {packages:['corechart']});
			  google.charts.setOnLoadCallback(drawPay);
			  console.log(d.pay);
			  function drawPay(){
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', '결제수단');
				  data.addColumn('number', 'count');
				  $.each(d.pay, (i,j)=>{
					  data.addRow([
						  j.payType,
						  (j.payTypeCount * 1)
					  ]);
				  });
				  var options = {'title':'결제타입',
		                       'width':400,
		                       'height':300};
		          // Instantiate and draw our chart, passing in some options.
		          var chart = new google.visualization.PieChart(document.getElementById('pay_type_div'));
		          chart.draw(data, options);
			  };// 결제타입별 차트
			  google.charts.load("current", {packages:["corechart"]});
		      google.charts.setOnLoadCallback(drawBooked);
		      function drawBooked(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '분기별 예약');
		    	  data.addColumn('number', 'count');
		    	  for(let i = 1; i < d.booked.length; i++){
		    		  data.addRow([d.booked[i].booked,(d.booked[i].bookCount * 1)]);
		    	  }
		    	  var options = {'title':'분기별 예약',
	                       'width':400,
	                       'height':300,
	                       'is3D':true,};
		    	  var chart = new google.visualization.PieChart(document.getElementById('booked_div'));
		    	  chart.draw(data, options);
		      };// 분기별 예약 차트
		      google.charts.load("current", {packages:["corechart"]});
			  google.charts.setOnLoadCallback(drawAccom);
			  function drawAccom(){
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', '숙소 타입');
				  data.addColumn('number', 'count');
				  $.each(d.accom, (i,j)=>{
					  data.addRow([
						  j.accomType,
						  (j.accomCount * 1)
					  ]);
				  });
				  var view = new google.visualization.DataView(data);
				  view.setColumns([0, 1]);
				  var options = {
					        title: "숙소 타입",
					        width: 600,
					        height: 400,
					        bar: {groupWidth: "95%"},
					        legend: { position: "none" },
					};
				  var chart = new google.visualization.BarChart(document.getElementById("have_accom_div"));
			      chart.draw(view, options);
			  }; // 숙소별 보유수
			  google.charts.load("current", {packages:['corechart']});
			  google.charts.setOnLoadCallback(drawAge);
			  function drawAge(){
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', '연령');
				  data.addColumn('number', 'count');
				  $.each(d.age, (i,j)=>{
					  data.addRow([
						  j.memberAge,
						  (j.totCount * 1)
					  ]);
				  });
				  var view = new google.visualization.DataView(data);
			      view.setColumns([0, 1]);
			      var options = {
					        title: "연령대별 회원수",
					        width: 600,
					        height: 400,
					        bar: {groupWidth: "95%"},
					        legend: {position: "none"},
					};
				  var chart = new google.visualization.ColumnChart(document.getElementById('age_member'));
				  chart.draw(view, options);
			  }; // 연령별 회원
			  google.charts.load("current", {packages:["corechart"]});
		      google.charts.setOnLoadCallback(drawGender);
		      function drawGender(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '성별');
				  data.addColumn('number', 'count');
				  for(let i = 1; i < d.gender.length; i++){
					  data.addRow([
						  d.gender[i].genderType,
						  (d.gender[i].genderCount * 1)
					  ]);
				  }
				  /*$.each(d.gender, (i,j)=>{
					  data.addRow([
						  j.genderType,
						  (j.genderCount * 1)
					  ]);
				  });*/
				  var options = {'title':'회원 성별',
	                       'width':400,
	                       'height':300,
	                       'pieHole':0.4,};
				  var chart = new google.visualization.PieChart(document.getElementById('member_gender_div'));
				  chart.draw(data, options);
		      }; // 성별 회원
		      google.charts.load('current', {'packages':['table']});
		      google.charts.setOnLoadCallback(drawTopLocal);
		      function drawTopLocal(){
		    	  var data = new google.visualization.DataTable();
	    	      data.addColumn('string', '지역');
	    	      data.addColumn('number', '예약 수');
	    	      $.each(d.topLoc, (i,j)=>{
	    	    	  data.addRow([
	    	    		  j.byAccom,
	    	    		  (j.accomCount * 1)
	    	    	  ]);
	    	      });
	    	      var table = new google.visualization.Table(document.getElementById('top_local_div'));
	    	      table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
		      }; //지역별 예약수 top 5
		      google.charts.load('current', {'packages':['table']});
		      google.charts.setOnLoadCallback(drawTopSales);
		      function drawTopSales(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '숙소명');
		    	  data.addColumn('number', '매출액');
		    	  $.each(d.topSales, (i,j)=>{
		    		 data.addRow([
		    			 j.accomName,
		    			 {v:(j.sumPay * 1), f:j.sumPay+'원'}
		    		 ]); 
		    	  });
		    	  var table = new google.visualization.Table(document.getElementById('top_sales_div'));
		    	  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
		      }; //매출 top 5
		  });
	  },
	  salesInfo : () => {
		  $.getJSON($.ctx()+'/admin/sales',d=>{
			  google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawSales);
		      function drawSales(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', 'Month');
		    	  data.addColumn('number', 'motel');
		    	  data.addColumn('number', 'hotel');
		    	  data.addColumn('number', 'revenue');
		    	  for(let i = 0; i < d.sumMotel.length-1; i++){
		    		  data.addRow([d.sumMotel[i].monthly, d.sumMotel[i].sales * 1, d.sumHotel[i].sales * 1, (d.sumMotel[i].sales * 1) + (d.sumHotel[i].sales * 1)])
		    	  }
		    	  var options = {
		    		      title : '매출',
		    		      vAxis: {title: 'Sales'},
		    		      hAxis: {title: 'Month'},
		    		      seriesType: 'bars',
		    		      series: {2: {type: 'line'}}
		    		    };
		    	  var chart = new google.visualization.ComboChart(document.getElementById('sales_div'));
		    	    chart.draw(data, options);
		      }//매출 차트
		  });
	  },
	  accomInfo : x =>{
		  alert("local " + x.local + "start " + x.start + "end " + x.end);
		  switch(x.start){
		  case 'all':
			  alert("전체");
			 /* var local = x.local;*/
			  $.getJSON($.ctx()+'/admin/accom/'+x.local, d=>{
				  google.charts.load('current', {'packages':['corechart']});
			      google.charts.setOnLoadCallback(drawPrice);
			      function drawPrice(){
			    	  var data = new google.visualization.DataTable();
			    	  data.addColumn('string', 'price');
			    	  data.addColumn('number', 'count');
			    	  $.each(d.accomPrice, (i,j)=>{
			    		  data.addRow([
			    			  j.byPrice,
			    			  (j.reserCount * 1)
			    		  ]);
			    	  });
			    	  var options = {
			    	          title: '가격대별 예약수',
			    	          hAxis: {title: 'price', minValue: 0, maxValue: 15},
			    	          vAxis: {title: 'count', minValue: 0, maxValue: 15},
			    	          legend: 'none'
			    	        };
			    	  var chart = new google.visualization.ScatterChart(document.getElementById('price_reservation'));
			    	  chart.draw(data, options);
			      }// 가격대별 예약수 차트
			      var mapContainer = document.getElementById('location'),	// 지도를 표시할 div
				  mapOption = {
					  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
					  level: 9
				  };
				  var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
				  //var bounds = new daum.maps.LatLngBounds(); // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
				  var positions = [];
				  $.each(d.accomPosition, (i,j)=>{
					  positions.push({
						  'title' : j.accomName,
						  'latlng' : new daum.maps.LatLng(j.longitude,j.latitude)
					  });
				  });
				  var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
				  var imageSize = new daum.maps.Size(34, 60);
				  
				  var position
				  for(var i = 0; i < positions.length; i++){
					  // 마커 이미지를 생성
					  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
					  var marker = new daum.maps.Marker({
						  map: map,	// 마커를 표시할 지도
						  position: positions[i].latlng,	// 마커를 표시할 위치
						  image: markerImage	// 마커 이미지
					  });
					  var content = '<div class="customoverlay">' +
					    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
					    '    <span class="title">'+d.accomPosition[i].accomName+'</span>' +
					    '  </a>' +
					    '</div>';
					  position = positions[i].latlng;
					  var customOverlay = new daum.maps.CustomOverlay({
					        position: position,
					        content: content,
					        yAnchor: 2.7
					    });
					  daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, customOverlay));
					  daum.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
				  }
				  function makeOverListener(map, marker, customOverlay) {
				        return function() {
				        	customOverlay.setMap(map);
				        };
				    }
				  // 인포윈도우를 닫는 클로저를 만드는 함수
				  function makeOutListener(customOverlay) {
				        return function() {
				        	customOverlay.setMap(null);
				        };
				    }
				  var bounds = new daum.maps.LatLngBounds();	// 지도 재설정 범위정보 객체 생성
				  for(var k = 0; k < positions.length; k++){
					  marker = new daum.maps.Marker({points : positions[k].latlng});
					  marker.setMap(map);
					  bounds.extend(positions[k].latlng);
				  }
					  map.setBounds(bounds);	// 지도 재배치
			  });
			  break;
		  default:
/*		  	  var local, start, end;
		  	  local = x.local;
		  	  start = x.start;
		  	  end = x.end;*/
			  $.getJSON($.ctx()+'/admin/accom/'+x.local+'/'+x.start+'/'+x.end, d=>{
				  google.charts.load('current', {'packages':['corechart']});
			      google.charts.setOnLoadCallback(drawPrice);
			      function drawPrice(){
			    	  var data = new google.visualization.DataTable();
			    	  data.addColumn('string', 'price');
			    	  data.addColumn('number', 'count');
			    	  $.each(d.accomPrice, (i,j)=>{
			    		  data.addRow([
			    			  j.byPrice,
			    			  (j.reserCount * 1)
			    		  ]);
			    	  });
			    	  var options = {
			    	          title: '가격대별 예약수',
			    	          hAxis: {title: 'price', minValue: 0, maxValue: 15},
			    	          vAxis: {title: 'count', minValue: 0, maxValue: 15},
			    	          legend: 'none'
			    	        };
			    	  var chart = new google.visualization.ScatterChart(document.getElementById('price_reservation'));
			    	  chart.draw(data, options);
			      }// 가격대별 예약수 차트
			      var mapContainer = document.getElementById('location'),	// 지도를 표시할 div
				  mapOption = {
					  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
					  level: 9
				  };
				  var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
				  //var bounds = new daum.maps.LatLngBounds(); // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
				  var positions = [];
				  $.each(d.accomPosition, (i,j)=>{
					  positions.push({
						  'title' : j.accomName,
						  'latlng' : new daum.maps.LatLng(j.longitude,j.latitude)
					  });
				  });
				  var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
				  var imageSize = new daum.maps.Size(34, 60);
				  
				  var position
				  for(var i = 0; i < positions.length; i++){
					  // 마커 이미지를 생성
					  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
					  var marker = new daum.maps.Marker({
						  map: map,	// 마커를 표시할 지도
						  position: positions[i].latlng,	// 마커를 표시할 위치
						  image: markerImage	// 마커 이미지
					  });
					  var content = '<div class="customoverlay">' +
					    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
					    '    <span class="title">'+d.accomPosition[i].accomName+'</span>' +
					    '  </a>' +
					    '</div>';
					  position = positions[i].latlng;
					  var customOverlay = new daum.maps.CustomOverlay({
					        position: position,
					        content: content,
					        yAnchor: 2.7
					    });
					  daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, customOverlay));
					  daum.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
				  }
				  function makeOverListener(map, marker, customOverlay) {
				        return function() {
				        	customOverlay.setMap(map);
				        };
				    }
				  // 인포윈도우를 닫는 클로저를 만드는 함수
				  function makeOutListener(customOverlay) {
				        return function() {
				        	customOverlay.setMap(null);
				        };
				    }
				  var bounds = new daum.maps.LatLngBounds();	// 지도 재설정 범위정보 객체 생성
				  for(var k = 0; k < positions.length; k++){
					  marker = new daum.maps.Marker({points : positions[k].latlng});
					  marker.setMap(map);
					  bounds.extend(positions[k].latlng);
				  }
					  map.setBounds(bounds);	// 지도 재배치
			  });
		  break;
		  }
		  
		  
		/*  
		 // alert(x);	기존 accomInfo()
		  $.getJSON($.ctx()+'/admin/accom/'+x, d=>{
			  google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawPrice);
		      function drawPrice(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', 'price');
		    	  data.addColumn('number', 'count');
		    	  $.each(d.accomPrice, (i,j)=>{
		    		  data.addRow([
		    			  j.byPrice,
		    			  (j.reserCount * 1)
		    		  ]);
		    	  });
		    	  var options = {
		    	          title: '가격대별 예약수',
		    	          hAxis: {title: 'price', minValue: 0, maxValue: 15},
		    	          vAxis: {title: 'count', minValue: 0, maxValue: 15},
		    	          legend: 'none'
		    	        };
		    	  var chart = new google.visualization.ScatterChart(document.getElementById('price_reservation'));
		    	  chart.draw(data, options);
		      }// 가격대별 예약수 차트
		      var mapContainer = document.getElementById('location'),	// 지도를 표시할 div
			  mapOption = {
				  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
				  level: 9
			  };
			  var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
			  //var bounds = new daum.maps.LatLngBounds(); // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
			  var positions = [];
			  $.each(d.accomPosition, (i,j)=>{
				  positions.push({
					  'title' : j.accomName,
					  'latlng' : new daum.maps.LatLng(j.longitude,j.latitude)
				  });
			  });
			  var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
			  var imageSize = new daum.maps.Size(34, 60);
			  
			  var position
			  for(var i = 0; i < positions.length; i++){
				  // 마커 이미지를 생성
				  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
				  var marker = new daum.maps.Marker({
					  map: map,	// 마커를 표시할 지도
					  position: positions[i].latlng,	// 마커를 표시할 위치
					  image: markerImage	// 마커 이미지
				  });
				  var content = '<div class="customoverlay">' +
				    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
				    '    <span class="title">'+d.accomPosition[i].accomName+'</span>' +
				    '  </a>' +
				    '</div>';
				  position = positions[i].latlng;
				  var customOverlay = new daum.maps.CustomOverlay({
				        position: position,
				        content: content,
				        yAnchor: 2.7
				    });
				  daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, customOverlay));
				  daum.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
			  }
			  function makeOverListener(map, marker, customOverlay) {
			        return function() {
			        	customOverlay.setMap(map);
			        };
			    }
			  // 인포윈도우를 닫는 클로저를 만드는 함수
			  function makeOutListener(customOverlay) {
			        return function() {
			        	customOverlay.setMap(null);
			        };
			    }
			  var bounds = new daum.maps.LatLngBounds();	// 지도 재설정 범위정보 객체 생성
			  for(var k = 0; k < positions.length; k++){
				  marker = new daum.maps.Marker({points : positions[k].latlng});
				  marker.setMap(map);
				  bounds.extend(positions[k].latlng);
			  }
				  map.setBounds(bounds);	// 지도 재배치
		  });
		  */
	  },	// accomInfo 완료
	  custoInfo : x=>{
		  alert(x);
		  console.log(x);
		  var info = {};
		  var year = new Date().getFullYear();
		  if(x.type == 'Motel'){
			  switch(x.quarter){
			  case '1quarter':
				  info = {
					  'type' : x.type,
					  'start' : year+'-01-01',
					  'end' : year+'-03-31'
			      }
				  break;
			  case '2quarter':
				  info = {
					  'type' : x.type,
					  'start' : year+'-04-01',
					  'end' : year+'-06-30'
			      }
				  break;
			  case '3quarter':
				  info = {
					  'type' : x.type,
					  'start' : year+'-07-01',
					  'end' : year+'-09-30'
			      }
				  break;
			  default:
				  info = {
					  'type' : x.type,
					  'start' : year+'-10-01',
					  'end' : year+'-12-31'
			      }
				  break;
			  }
		  }else{
			  switch(x.quarter){
			  case '1quarter':
				  info = {
					  'type' : x.type,
					  'start' : year+'-01-01',
					  'end' : year+'-03-31'
			      }
				  break;
			  case '2quarter':
				  info = {
					  'type' : x.type,
					  'start' : year+'-04-01',
					  'end' : year+'-06-30'
			      }
				  break;
			  case '3quarter':
				  info = {
					  'type' : x.type,
					  'start' : year+'-07-01',
					  'end' : year+'-09-30'
			      }
				  break;
			  default:
				  info = {
					  'type' : x.type,
					  'start' : year+'-10-01',
					  'end' : year+'-12-31'
			      }
				  break;
			  }
		  }
		/*  
		  switch(x.quarter){
		  case '1quarter':
			  x.quarter = {
				  'start' : year+'-01-01',
				  'end' : year+'-03-31'
		      }
			  break;
		  case '2quarter':
			  quarter = {
				  'start' : year+'-04-01',
				  'end' : year+'-06-30'
		      }
			  break;
		  case '3quarter':
			  quarter = {
				  'start' : year+'-07-01',
				  'end' : year+'-09-30'
		      }
			  break;
		  default:
			  quarter = {
				  'start' : year+'-10-01',
				  'end' : year+'-12-31'
		      }
			  break;
		  }
		  */
		  $.getJSON($.ctx()+'/admin/custo/'+info.type+'/'+info.start+'/'+info.end, d=>{
			  var arrAccom = [];
			  for(var i = 1; i < d.arrAccom.length; i++){
				  arrAccom.push(d.arrAccom[i].payCount);
			  }
			  /*var arrMo = [];
			  for(var i = 1; i < d.custoMo.length; i++){
				  arrMo.push(d.custoMo[i].payCount);
			  }*/
			  var options = {
						'legend':{
							names: [
								'20대',
								'30대',
								'40대',
								'50대',
								'60대 이상'
								/*'Operable',
								'Navigation',
								'Error Prevent'*/
							],
							hrefs: [
								'http://nuli.navercorp.com//sharing/a11y#k1',
								'http://nuli.navercorp.com//sharing/a11y#k2',
								'http://nuli.navercorp.com//sharing/a11y#k3',
								'http://nuli.navercorp.com//sharing/a11y#k4',
								'http://nuli.navercorp.com//sharing/a11y#k5'
								/*'http://nuli.navercorp.com//sharing/a11y#k6',
								'http://nuli.navercorp.com//sharing/a11y#k7',
								'http://nuli.navercorp.com//sharing/a11y#k8'*/
							]
						},
						'dataset': {
							title: 'Accommodation',
							values: [arrAccom],
							bgColor: '#f9f9f9',
							fgColor: '#30a1ce',
						},
						'chartDiv': 'accom_chart',
						'chartType': 'radar',
						'chartSize': { width: 500, height: 300 }
					};
			  Nwagon.chart(options);
			  console.log('1');
			  console.log(options.dataset.values);
			 /* 
			  모텔부분
			  var arrMo = [];
			  for(var j = 1; i < d.custoMo.length; j++){
				  arrMo.push(d.custoMo[j].payCount);
			  }
			  var options = {
						'legend':{
							names: [
								'20대',
								'30대',
								'40대',
								'50대',
								'60대 이상'
							],
							hrefs: [
								'http://nuli.navercorp.com//sharing/a11y#k1',
								'http://nuli.navercorp.com//sharing/a11y#k2',
								'http://nuli.navercorp.com//sharing/a11y#k3',
								'http://nuli.navercorp.com//sharing/a11y#k4',
								'http://nuli.navercorp.com//sharing/a11y#k5'
							]
						},
						'dataset': {
							title: 'Web accessibility status',
							values: [arrMo],
							bgColor: '#f9f9f9',
							fgColor: '#30a1ce',
						},
						'chartDiv': 'age_mo',
						'chartType': 'radar',
						'chartSize': { width: 500, height: 200 }
					};
			  Nwagon.chart(options);
			  console.log('2');
			  console.log(options.dataset.values);
			  */
			  
			  google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawCustoPop);
		      
		      function drawCustoPop(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', 'local');
		    	  data.addColumn('number', 'reservationCnt');
		    	  data.addColumn('number', 'populationRate');
		    	  data.addColumn('number', 'populationCnt');
		    	  /*
		    	  for(var k = 0; k < d.custoPop.length; k++){
		    		  data.addRow([
		    			  d.custoPop[k].byAddr, d.custoPop[k]
		    		  ])
		    	  }
		    	  */
		    	 /* $.each(d.custoPop, (i,j)=>{
			    		 data.addRow([
			    			 j.byAddr,
			    			 (j.payCnt * 1),
			    			 (j.population * 1)
			    		 ]); 
			    	  });
		    	  for(var k = 0; k < 10; k++){
		    		  data.addRow([k]);
		    	  }*/
		    	  
		    	  $.each(d.custoPop, (i,j)=>{
		    		 data.addRow([
		    			 j.byAddr,
		    			 (j.payCnt * 1),
		    			 (j.popRate * 1),
		    			 (j.population * 1)
		    		 ]); 
		    	  });
		    	  
		    	  var options = {
		    		        title: ' 지역별 고객 ',
		    		        hAxis: {title: 'Population'},
		    		        vAxis: {title: 'Population rate'},
		    		        bubble: {textStyle: {fontSize: 11}}
		    		      };
		    	  var chart = new google.visualization.BubbleChart(document.getElementById('pop_chart'));
		          chart.draw(data, options);
		      }// 버블차트
		      
		  });
		 /*
		  $.getJSON($.ctx()+'/admin/custo/'+quarter.start+'/'+quarter.end, d=>{
			  var arrMo = [];
			  for(var j = 1; i < d.custoMo.length; j++){
				  arrMo.push(d.custoMo[j].payCount);
			  }
			  var options = {
						'legend':{
							names: [
								'20대',
								'30대',
								'40대',
								'50대',
								'60대 이상'
								'Operable',
								'Navigation',
								'Error Prevent'
							],
							hrefs: [
								'http://nuli.navercorp.com//sharing/a11y#k1',
								'http://nuli.navercorp.com//sharing/a11y#k2',
								'http://nuli.navercorp.com//sharing/a11y#k3',
								'http://nuli.navercorp.com//sharing/a11y#k4',
								'http://nuli.navercorp.com//sharing/a11y#k5'
								'http://nuli.navercorp.com//sharing/a11y#k6',
								'http://nuli.navercorp.com//sharing/a11y#k7',
								'http://nuli.navercorp.com//sharing/a11y#k8'
							]
						},
						'dataset': {
							title: 'Web accessibility status',
							values: [arrMo],
							bgColor: '#f9f9f9',
							fgColor: '#30a1ce',
						},
						'chartDiv': 'age_mo',
						'chartType': 'radar',
						'chartSize': { width: 500, height: 200 }
					};
			  Nwagon.chart(options);
			  console.log('2');
			  console.log(options.dataset.values);
		  });
		  */
		  
		  
		 /* 
		   ajax 데이터를 가져왔따고 가정한다. 
		  $.getJSON($.ctx()+'/admin/custo', d=>{
			  var arr = [];
			  for(var i = 0; i < d.percent.length; i++){
				  arr.push(d.percent[i].percent);
			  }
			  
			  var options = {
						'legend':{
							names: [
								'20',
								'30',
								'40',
								'50',
								'60+'
								'Operable',
								'Navigation',
								'Error Prevent'
							],
							hrefs: [
								'http://nuli.navercorp.com//sharing/a11y#k1',
								'http://nuli.navercorp.com//sharing/a11y#k2',
								'http://nuli.navercorp.com//sharing/a11y#k3',
								'http://nuli.navercorp.com//sharing/a11y#k4',
								'http://nuli.navercorp.com//sharing/a11y#k5'
								'http://nuli.navercorp.com//sharing/a11y#k6',
								'http://nuli.navercorp.com//sharing/a11y#k7',
								'http://nuli.navercorp.com//sharing/a11y#k8'
							]
						},
						'dataset': {
							title: 'Web accessibility status',
							values: [arr],
							bgColor: '#f9f9f9',
							fgColor: '#30a1ce',
						},
						'chartDiv': 'age_reservation',
						'chartType': 'radar',
						'chartSize': { width: 500, height: 300 }
					};
			  Nwagon.chart(options);
			  console.log('1');
			  console.log(options.dataset.values);
			  
		  });
		  */
		 
	  }//custoInfo()
	
};

sanghoon.service = {
		basic : x=>{
			$('#content').empty();
			$('#footer').empty();
			$('<div/>').addClass('basic_wrapper').appendTo($('#content'));
			$('<div/>').addClass('basic_box_1').appendTo($('.basic_wrapper'));
			$('<div/>').attr({id:'pay_type_div'}).appendTo($('.basic_box_1'));
			$('<div/>').attr({id:'booked_div'}).appendTo($('.basic_box_1'));
			$('<div/>').attr({id:'have_accom_div'}).appendTo($('.basic_box_1'));
			$('<div/>').attr({id:'age_member'}).appendTo($('.basic_box_1'));
			$('<div/>').attr({id:'member_gender_div'}).appendTo($('.basic_box_1'));
			//$('<div/>').addClass('basic_box_2').appendTo($('.basic_wrapper'));
			$('<div/>').attr({id:'top_local_div'}).appendTo($('.basic_box_1'));
			$('<div/>').attr({id:'top_sales_div'}).appendTo($('.basic_box_1'));
			/*
			console.log('basic 버튼 클릭');
			console.log($.img());
			console.log($.img()+'/pie_graph_1.PNG');
			$('#content').empty();
			$('#footer').empty();
			$('<div/>').attr({id:'page-wrapper'}).appendTo($('#content'));
			$('<div/>').addClass('basic_first').appendTo('#page-wrapper');
			
			$('<div/>').attr({id:'pay_type_div'}).appendTo('.basic_first');
			//$('<img/>').attr({src:$.img()+'/admin_test/pie_graph_1.PNG'}).appendTo('#pay_type_div');
			$('<div/>').attr({id:'booked_div'}).appendTo('.basic_first');
			//$('<img/>').attr({src:$.img()+'/admin_test/pie_graph_2.PNG'}).appendTo('#booked');
			$('<div/>').attr({id:'have_accom_div'}).appendTo('.basic_first');
			//$('<img/>').attr({src:$.img()+'/admin_test/accom_type_graph.PNG'}).appendTo('#have_accom_type');
			
			$('<div/>').addClass('basic_middle').appendTo('#page-wrapper');
			$('<div/>').attr({id:'age_member'}).appendTo('.basic_middle');
			//$('<img/>').attr({src:$.img()+'/admin_test/customer_graph.PNG', style:'width:600px; height:210px'}).appendTo('#age_member');
			$('<div/>').attr({id:'member_gender_div'}).appendTo('.basic_middle');
			//$('<img/>').attr({src:$.img()+'/admin_test/customer_gen_graph.PNG', style:'width:300px; height:210px'}).appendTo('#member_gender');
			
			$('<div/>').addClass('basic_last').appendTo('#page-wrapper');
			
			
			$('<div/>').attr({id:'top_local_div'}).appendTo('.basic_last');
			//$('<img/>').attr({src:$.img()+'/admin_test/TOP_local.PNG'}).appendTo('#top_local');주석
			$('<div/>').attr({id:'top_sales_div'}).appendTo('.basic_last');
			//$('<img/>').attr({src:$.img()+'/admin_test/TOP_views.PNG'}).appendTo('#top_sales');
			$('<div/>').attr({id:'top_average'}).appendTo('.basic_last');
			//$('<img/>').attr({src:$.img()+'/admin_test/TOP_average.PNG'}).appendTo('#top_average');
			*/
			googleChart.service.basicInfo();
			
		},
		sales : x=>{
			console.log('sales 버튼 클릭');
			$('#content').empty();
			$('<div/>').attr({id:'page-wrapper'}).appendTo('#content');
			$('<div/>').attr({id:'sales_div'}).appendTo('#page-wrapper');
			//$('<div/>').addClass('sales_div').appendTo('#page-wrapper');
			//$('<img/>').attr({src:$.img()+'/admin_test/sales_graph.PNG', style:'display:block; margin-left: auto; margin-right: auto'}).appendTo('.sales_graph');
			/*$('<div/>').addClass('sales_table').appendTo('#page-wrapper');
			let revenue = ['수익','1100','2200','3300','4400','5500','6600','7700','8800','9900','11000','12100','13200'];
			let hotel = ['호텔','1000','2000','3000','4000','5000','6000','7000','8000','9000','10000','11000','12000'];
			let motel = ['모텔','100','200','300','400','500','600','700','800','900','1000','1100','1200'];
			let thead = ['','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
			$('<table/>').addClass('table').appendTo('.sales_table');
			$('<thead/>').addClass('thead').appendTo('.table');
			$('<tr/>').attr({id:'thead_tr'}).appendTo('.thead');
			$.each(thead,(i,j)=>{
				$('<th/>').addClass('sales_th').html(j).appendTo('#thead_tr');
			});
			$('<tbody/>').addClass('tbody').appendTo('.table');
			$('<tr/>').attr({id:'tbody_tr_1'}).appendTo('.tbody');
			$.each(hotel,(i,j)=>{
				$('<td/>').html(j).appendTo('#tbody_tr_1');
			});
			$('<tr/>').attr({id:'tbody_tr_2'}).appendTo('.tbody');
			$.each(motel,(i,j)=>{
				$('<td/>').html(j).appendTo('#tbody_tr_2');
			});
			$('<tr/>').attr({id:'tbody_tr_3'}).appendTo('.tbody');
			$.each(revenue,(i,j)=>{
				$('<td/>').html(j).appendTo('#tbody_tr_3');
			});*/
			
			googleChart.service.salesInfo();
			
			
		},
		accom : x=>{
			
			$('#content').empty();
			$('<div/>').addClass('accom_wrapper').appendTo($('#content'));
			$('<div/>').addClass('accom_box').appendTo($('.accom_wrapper'));
			$('<div/>').attr({id:'local_box'}).appendTo($('.accom_box'));
			$('<select/>').addClass('form-control').attr({id:'local_sel'}).appendTo($('#local_box'));
			$.each(['서울', '강원', '경기', '경상남도', '경상북도', '광주', '대구', '대전', '부산', '세종', '울산', '인천', '전라남도', '전라북도', '제주', '충청남도', '충청북도'], (i, j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#local_sel'));
			});
			$('<select/>').addClass('form-control').attr({id:'date'}).appendTo($('#local_box'));
			$.each(['전체기간', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], (i, j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#date'));
			});
			var accom_info = {};
			accom_info = {
					'local' : '서울',
					'start' : 'all',
					'end' : 'all'
			}
			$('<button/>').addClass('btn btn-light').attr({id:'accom_button', type: 'button'}).html('검색').appendTo($('#local_box'))
			.click(e=>{
				
				accom_info = {
					'local' : $('#local_sel').val(),
					'start' : $('#date').val(),
					'end' : ''
				};
				//alert(im.start);
				alert(accom_info.start.substring(0, accom_info.start.length-1));
				var year = new Date().getFullYear();
				switch(accom_info.start = accom_info.start.substring(0, accom_info.start.length-1)){
				case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
					accom_info.start = year+"-0"+accom_info.start+"-01";
					accom_info.end = accom_info.start.substring(0, accom_info.start.length-2)+"31";
					alert(accom_info.local+" "+ accom_info.start + " " + accom_info.end);
					googleChart.service.accomInfo(accom_info);
				break;
				case '10': case '11': case '12':
					accom_info.start = year+'-'+accom_info.start+"-01";
					accom_info.end = accom_info.start.substring(0, accom_info.start.length-2)+'31';
					alert(accom_info.local+" "+ accom_info.start+" "+ accom_info.end);
					googleChart.service.accomInfo(accom_info);
				break;
				default:
					accom_info.start = 'all';
					accom_info.end = 'all';
					alert(accom_info.local+" "+ accom_info.start+" "+ accom_info.end);
					googleChart.service.accomInfo(accom_info);
				break;
				}
				
				/*
				var la = [];
				la.push({
					'local' : $('#local_sel').val(),
					'start' : $('#date').val(),
					'end' : ''
				});
				*/
				
			});
			$('<div/>').attr({id:'price_reservation'}).appendTo($('.accom_box'));
			$('<div/>').attr({id:'accom_reservation'}).appendTo($('.accom_box'));
			$('<img/>').attr({src:$.img()+'/admin_test/accom_reservation.PNG', style:'width:500px; display:block; margin-left:auto; margin-right:auto'}).appendTo('#accom_reservation');
			$('<div/>').attr({id:'location'}).appendTo($('.accom_box'));
			/*
			console.log('accom 버튼 클릭');
			$('#content').empty();
			$('<div/>').attr({id:'page-wrapper'}).appendTo('#content');
				$('<div/>').addClass('left_wrapper').appendTo('#page-wrapper');
							
					$('<div/>').attr({id:'local_box'}).appendTo('.left_wrapper')
					
					$('<select/>').attr({id:'local_sel'}).appendTo('#local_box');
					var imsi2 = [];
					$.each(['서울','경기','인천','강원','제주','대전','충북','충남','세종','부산','울산','경남','대구','경북','광주','전남','전주','전북'],(i,j)=>{
						$('<option/>').attr({value:j}).html(j).appendTo('#local_sel');
						console.log(j);
						});
					$('#local_sel').change(function(){
						var imsi = $(this).val(); 
						imsi2 = $(this).val();
						alert("var2"+imsi2);
						//alert(imsi);
						console.log("클릭이벤트안"+imsi2);
						googleChart.service.accomInfo(imsi2);
						});
					console.log("클릭이벤트 밖"+imsi2);
					$('<div/>').attr({id:'price_reservation'}).appendTo('.left_wrapper');
						//$('<img/>').attr({src:$.img()+'/admin_test/price_reservation.PNG', style:'width:500px; display:block; margin-left:auto; margin-right:auto'}).appendTo('#price_reservation');
					$('<div/>').attr({id:'accom_reservation'}).appendTo('.left_wrapper');
							$('<img/>').attr({src:$.img()+'/admin_test/accom_reservation.PNG', style:'width:500px; display:block; margin-left:auto; margin-right:auto'}).appendTo('#accom_reservation');
				$('<div/>').addClass('right_wrapper').appendTo('#page-wrapper');
					$('<div/>').attr({id:'location'}).appendTo('.right_wrapper');
					*/
					/*var mapContainer = document.getElementById('location'), // 지도를 표시할 div를 만들어놓음 
				    mapOption = {
				        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				        level: 10 // 지도의 확대 레벨
				    };

					// 지도를 생성합니다    
					var map = new daum.maps.Map(mapContainer, mapOption); 

					// 주소-좌표 변환 객체를 생성합니다
					var geocoder = new daum.maps.services.Geocoder();

					// 주소로 좌표를 검색합니다
					geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function(result, status) {

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
								content: '<div style="width:150px;text-align:center;padding:6px 0;">제주호텔</div>'
							});
							infowindow.open(map, marker);

							// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
							map.setCenter(coords);
						} 
					});*/
							//$('<img/>').attr({src:$.img()+'/admin_test/location.PNG', style:'width:500px; display:block; margin-left: auto; margin-right: auto'}).appendTo('#location');
					googleChart.service.accomInfo(accom_info);
		},
		custo : x=>{
			
			$('#content').empty();
			$('<div/>').addClass('custo_wrapper').appendTo($('#content'));
			$('<div/>').addClass('custo_box_1').appendTo($('.custo_wrapper'));
			$('<div/>').attr({id:'select_box'}).appendTo($('.custo_box_1'));
			$('<select/>').addClass('form-control').attr({id:'reser_type'}).appendTo($('#select_box'));
			$.each(['MOTEL', 'HOTEL'], (i,j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#reser_type'));
			});
			$('<select/>').addClass('form-control').attr({id:'quarter_sel'}).appendTo($('#select_box'));
			$.each(['1quarter', '2quarter', '3quarter', '4quarter'], (i,j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#quarter_sel'));
			});
			var info = {};
			info = {
					'type' : 'Motel',
					'quarter' : '1quarter'
			}
			$('<button/>').addClass('btn btn-light').attr({id:'custo_button', type: 'button'}).html('검색').appendTo($('#select_box'))
			.click(e=>{
				info = {
					'type' : $('#reser_type').val(),
					'quarter' : $('#quarter_sel').val()
				};
			});
			$('<div/>').addClass('custo_box_2').appendTo($('.custo_wrapper'));
			$('<div/>').attr({id:'accom_chart'}).appendTo($('.custo_box_2'));
			$('<div/>').attr({id:'pop_chart'}).appendTo($('.custo_box_2'));
			googleChart.service.custoInfo(info);
			
			
			/*
			$('#content').empty();
			$('<div/>').addClass('custo_wrapper').appendTo($('#content'));
			$('<div/>').addClass('custo_box').appendTo($('.custo_wrapper'));
			$('<div/>').attr({id:'quarter_box'}).appendTo($('.custo_box'));
			$('<select/>').addClass('form-control').attr({id:'quarter_sel'}).appendTo($('#quarter_box'));
			$.each(['1quarter', '2quarter', '3quarter', '4quarter'], (i,j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#quarter_sel'));
			});
			$('#quarter_sel').change(function(){
				$('#age_ho').empty();
				$('#age_mo').empty();
				var quarter = $(this).val();
				googleChart.service.custoInfo(quarter);
			});
			$('<div/>').attr({id:'age_ho'}).appendTo($('.custo_box'));
			$('<div/>').attr({id:'chart_ho'}).appendTo($('#age_ho'));
			$('<h4/>').html('연령대별 호텔 예약').appendTo($('#age_ho'));
			$('<div/>').attr({id:'age_mo'}).appendTo($('.custo_box'));
			$('<h4/>').html('연령대별 모텔 예약').appendTo($('#age_mo'));
			$('<div/>').attr({id:'custo_pop'}).appendTo($('.custo_box'));
			
			googleChart.service.custoInfo('1quarter');
			*/
			/*
			console.log('custo 버튼 클릭');
			$('#content').empty();
			$('<div/>').attr({id:'page-wrapper'}).appendTo($('#content'));
			$('<div/>').addClass('custo_div_1').appendTo('#page-wrapper');
			
			$('<div/>').attr({id:'age_reservation'}).appendTo('.custo_div_1');
			//$('<img/>').attr({src:$.img()+'/admin_test/age_reservation.PNG', style:'width:400px; height:303px; display:block;margin-left:auto;margin-right:auto'}).appendTo('#age_reservation');
			$('<div/>').attr({id:'age_accom'}).appendTo('.custo_div_1');
			
			$('<img/>').attr({src:$.img()+'/admin_test/accom_compare.PNG', style:'display:block;margin-left:auto;margin-right:auto'}).appendTo('#age_accom');
			$('<div/>').addClass('custo_div_2').appendTo('#page-wrapper');
			$('<div/>').attr({id:'reser_count'}).appendTo('.custo_div_2');
			$('<img/>').attr({src:$.img()+'/admin_test/reservation_count.PNG', style:'width:1050px; display:block; margin-left:auto;margin-right:auto'}).appendTo('#reser_count');
			$('<div/>').attr({id:'page-wrapper', style:"padding:30px" }).appendTo($('#content'));
			$('<div/>').addClass('row').appendTo('#page-wrapper');
				$('<div/>').addClass('col-lg-5').appendTo('.row');
					$('<img/>').attr({src:$.img()+'/admin_test/age_reservation.PNG', style:'padding:30px; width:90%'}).appendTo('.col-lg-5');
				$('<div/>').addClass('col-lg-7').appendTo('.row');
					$('<img/>').attr({src:$.img()+'/admin_test/accom_compare.PNG', style:'padding:30px; width:80%; height:100%'}).appendTo('.col-lg-7');
				
				$('<div/>').addClass('col-lg-12').appendTo('.row');
					$('<img/>').attr({src:$.img()+'/admin_test/reservation_count.PNG', style:'padding:30px; width:90%'}).appendTo('.col-lg-12');
			googleChart.service.custoInfo();*/
		},
		top_accom : x=>{
			console.log('top_accom 버튼 클릭');
			$('#content').empty();
			$('<div/>').attr({id:'page-wrapper'}).appendTo($('#content'));
			$('<div/>').addClass('accom_list').appendTo('#page-wrapper');
			$('<img/>').attr({src:$.img()+'/admin_test/accom_list.PNG', style:'width:60%;display:block;margin-left:auto;margin-right:auto'}).appendTo('.accom_list');
			/*$('<div/>').attr({id:'page-wrapper', style:"padding:30px"}).appendTo($('#content'));
			$('<div/>').addClass('row').appendTo('#page-wrapper');
				$('<div/>').addClass('col-lg-12').appendTo('.row');
					$('<img/>').attr({src:$.img()+'/admin_test/accom_list.PNG'}).appendTo('.col-lg-12');*/
		}
		
}
