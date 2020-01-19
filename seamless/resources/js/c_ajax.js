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
		url: "/user/findUa_no",
		dataType:"json",
		data: JSON.stringify({ua_no:$("#fua_no").val()}),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			location.reload();
		},
		error: function (error) {
			location.reload();
		}
	});
}



//SSW 목록조회 ( 모든정보가 조회됨 )
function ajaxSSWList(){
	$.ajax({
		type: "POST",
		url: "/seamless/sswList",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				toastr.success(result.reason);
				console.log(result.body);
			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
	});
}

//SSW 추가
function ajaxSSWInsert(){
	var data = {
			ssw_no:  "",  	
			rte_name:  ""
		};
	$.ajax({
		type: "POST",
		url: "/seamless/sswIn",
		dataType:"json",
		data: JSON.stringify(data),
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

//SSW 수정
function ajaxSSWUpdate(){
	// 수정할 정보만 기입 ( null 값 혹은 '' 공백은 제외한다. )
	var data = {
			ssw_no:  "",  		//수정불가
			rte_name:  ""   
		};
	$.ajax({
		type: "POST",
		url: "/seamless/sswUp",
		dataType:"json",
		data: JSON.stringify(data),
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

//SSW 삭제
function ajaxSSWDelete(){
	var data = [{
		ssw_no:  ""
	},
	{
		ssw_no:  ""
	}
];
	
	$.ajax({
		type: "POST",
		url: "/seamless/sswDel",
		dataType:"json",
		data: JSON.stringify(data),
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


//루트 목록조회 ( 모든정보가 조회됨 )
function ajaxRTEList(){
	$.ajax({
		type: "POST",
		url: "/seamless/rteList",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				toastr.success(result.reason);
				console.log(result.body);
			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
	});
}

//루트 추가
function ajaxRTEInsert(){
	var data = {
			rte_no			:  "",           
			rte_name		:  "",         
			rte_status_type	:  "",  
			ssw_no			:  ""           
		};
	$.ajax({
		type: "POST",
		url: "/seamless/rteIn",
		dataType:"json",
		data: JSON.stringify(data),
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

//루트 수정
function ajaxRTEUpdate(){
	// 수정할 정보만 기입 ( null 값 혹은 '' 공백은 제외한다. )
	var data = {
			rte_no			:  "",           // 수정불가 
			rte_name		:  "",         
			rte_status_type	:  "",  
			ssw_no			:  ""        
		};
	$.ajax({
		type: "POST",
		url: "/seamless/rteUp",
		dataType:"json",
		data: JSON.stringify(data),
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

//루트 삭제
function ajaxRTEDelete(){
	var data = [{
		rte_no:  ""
	},
	{
		rte_no:  ""
	}
];
	
	$.ajax({
		type: "POST",
		url: "/seamless/rteDel",
		dataType:"json",
		data: JSON.stringify(data),
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

//가입자 목록조회 ( 모든정보가 조회됨 )
function ajaxUserInfoList(){
	$.ajax({
		type: "POST",
		url: "/seamless/userInfoList",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				toastr.success(result.reason);
				console.log(result.body);
			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
	});
}

//가입자 추가 (배열추가기능 : 대용량 데이터 등록시 이용)
function ajaxUserInfoInsert(){
	var data = [{
			svc_no		:  "",        
			custom_name	:  "",   
			rte_no		:  "",        
			rte_name	:  "",      
			cld_1		:  "",         
			cld_2		:  "",         
			cld_3		:  "",         
			na_timer	:  ""      
		},
		{
			svc_no		:  "",        
			custom_name	:  "",   
			rte_no		:  "",        
			rte_name	:  "",      
			cld_1		:  "",         
			cld_2		:  "",         
			cld_3		:  "",         
			na_timer	:  ""      
		}];
	$.ajax({
		type: "POST",
		url: "/seamless/userInfoIn",
		dataType:"json",
		data: JSON.stringify(data),
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

//가입자 수정
function ajaxUserInfoUpdate(){
	// 수정할 정보만 기입 ( null 값 혹은 '' 공백은 제외한다. )
	var data = {
			svc_no		:  "",        //수정불가
			custom_name	:  "",   
			rte_no		:  "",        
			rte_name	:  "",      
			cld_1		:  "",         
			cld_2		:  "",         
			cld_3		:  "",         
			na_timer	:  ""       
		};
	$.ajax({
		type: "POST",
		url: "/seamless/userInfoUp",
		dataType:"json",
		data: JSON.stringify(data),
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

//가입자 삭제
function ajaxUserInfoDelete(){
	var data = [{
		svc_no:  "",
		cld_1 : ""
	},
	{
		rte_no:  "",
		cld_1 : ""
	}];
	
	$.ajax({
		type: "POST",
		url: "/seamless/userInfoDel",
		dataType:"json",
		data: JSON.stringify(data),
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
