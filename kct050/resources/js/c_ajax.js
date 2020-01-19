jQuery.fn.serializeObject = function(){
    var obj = null; 
    try { 
        if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) { 
            var arr = this.serializeArray(); 
            if(arr){ obj = {}; 
            jQuery.each(arr, function() { 
                obj[this.name] = this.value; }); 
            } 
        } 
    }catch(e) { 
    	toastr.error(e.message);
    }finally {} 
    return obj; 
  }

jQuery.ajaxSettings.traditional = true;	

function sendFindUa_noAjax(){
	$.ajax({
		type: "POST",
		url: "/pn/user/findUa_no",
		dataType:"json",
		data: JSON.stringify({pn_rep:$("#fua_no").val()}),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			location.reload();
		},
		error: function (error) {
			location.reload();
		}
	});
}

//서비스 현황 조회
function ajaxStatusInfo(){
	$.ajax({
		type: "POST",
		url: "/pn/sel",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				toastr.success(result.reason);
			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
	});
}

//서비스 관리 조회
function ajaxManagementList(){
	// 대역 조회시
/*	var dats ={
			rep_type	 : "0",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : "",  //안심 or 착신번호시 번호값
			pn_start 	 : "0508080000",  // 대역조회시 시작값
			pn_end 		 : "0508080005",  // 대역조회시 끝값
			rowcnt 	 	 : "10",  // 최대 row 수
			page 		 : "1",  // 현 page
	}*/

	// 안심 or 착신번호로 조회시
	var dats ={
			rep_type	 : "2",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : "0508080000",  //안심 or 착신번호시 번호값
			pn_start 	 : "",  // 대역조회시 시작값
			pn_end 		 : "",  // 대역조회시 끝값
			rowcnt 	 	 : "10",  // 최대 row 수
			page 		 : "1",  // 현 page
	}
	$.ajax({
		type: "POST",
		url: "/pn/mglist",
		dataType:"json",
		data: JSON.stringify(dats),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
				console.log(result.body.cldList);
			}else{
				alert(result.reason);
			}
		},
		error: function (error) {
			
		}
	});
}

//서비스 관리 업데이트
function ajaxManagementUpdate(){
	var cldList = [{
			pn : "0508080000",		//안심번호
			called1 : "123123",	//1차 착신번호
			called2 : "2342",	//2차 착신번호
			called3 : "6232"	//3차 착신번호
	},
	{
		pn : "0508080001",		//안심번호
		called1 : "11",	//1차 착신번호
		called2 : "22",	//2차 착신번호
		called3 : "33"	//3차 착신번호
	}
	];
	
	var dats ={
			rep_type	 : "",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : "",  //안심 or 착신번호시 번호값
			pn_start 	 : "",  // 대역조회시 시작값
			pn_end 		 : "",  // 대역조회시 끝값
			rowcnt 	 	 : "",  // 최대 row 수
			page 		 : "",  // 현 page
			cldList 	 : cldList // 수정할 대상
	}
	$.ajax({
		type: "POST",
		url: "/pn/mgup",
		dataType:"json",
		data: JSON.stringify(dats),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
			}else{
				alert(result.reason);
			}
		},
		error: function (error) {
			
		}
	});
}


//서비스 관리 삭제
function ajaxManagementDelete(){
	var cldList = [{
			pn : "0508080000",		//안심번호
	}]
	
	var dats ={
			rep_type	 : "",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : "",  //안심 or 착신번호시 번호값
			pn_start 	 : "",  // 대역조회시 시작값
			pn_end 		 : "",  // 대역조회시 끝값
			rowcnt 	 	 : "",  // 최대 row 수
			page 		 : "",  // 현 page
			cldList 	 : cldList // 삭제할 대상
	}
	$.ajax({
		type: "POST",
		url: "/pn/mgdel",
		dataType:"json",
		data: JSON.stringify(dats),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
			}else{
				alert(result.reason);
			}
		},
		error: function (error) {
			
		}
	});
}


//문자서비스 요청
function ajaxSMSInfo(){
	$.ajax({
		type: "POST",
		url: "/pn/sel",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
				console.log(result.body.SMS_TYPE); // SMS 설정 0 : 미사용, 1 : 사용
				console.log(result.body.SMS_TEXT); // 설정문자
				setSMSInfo(result.body);
			}else{
				alert(result.reason);
			}
		},
		error: function (error) {
			
		}
	});

	setSMSInfo(result.body);
}

//문자서비스 업데이트
function ajaxSMSUpdate(){
	// 문자 사용 or 미사용 설정시 해당값만 셋팅
	var dats ={
			sms_type	 : ""  //	0 : 미사용, 1 : 사용
	}

	//문자메시지 작성 후 문자 등록하기 시 셋팅값
//	var dats ={
//			sms_text	 : ""  //문자 작성 값
//	}
	
/*	
	위 내용에서 중요한점은. 문자 메시지 사용 미사용 설정과 
	문자등록하기 시 보내주는 정보는 반드시 지켜야 합니다.
	ex) 동시에 설정하면 안되는 예시
		var dats ={
			sms_text	 : "",  
			sms_text	 : ""  //문자 작성 값
		}
	*/
	$.ajax({
		type: "POST",
		url: "/pn/up",
		dataType:"json",
		data: JSON.stringify(dats),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
			}else{
				alert(result.reason);
			}
		},
		error: function (error) {
			
		}
	});
}

//대용량 업데이트
function ajaxManagementFileUpdate(){
	var cldList = [{
			pn : "0508080000",		//안심번호
			called1 : "123123",	//1차 착신번호
			called2 : "2342",	//2차 착신번호
			called3 : "6232"	//3차 착신번호
	},
	{
		pn : "0508080001",		//안심번호
		called1 : "11",	//1차 착신번호
		called2 : "22",	//2차 착신번호
		called3 : "33"	//3차 착신번호
	}
	];
	
	var dats ={
			rep_type	 : "",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : "",  //안심 or 착신번호시 번호값
			pn_start 	 : "",  // 대역조회시 시작값
			pn_end 		 : "",  // 대역조회시 끝값
			rowcnt 	 	 : "",  // 최대 row 수
			page 		 : "",  // 현 page
			cldList 	 : cldList // 수정할 대상
	}
	$.ajax({
		type: "POST",
		url: "/pn/mgfile",
		dataType:"json",
		data: JSON.stringify(dats),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
			}else{
				alert(result.reason);
			}
		},
		error: function (error){
		}
	});
}