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


//가입자관리 목록조회 ( 모든정보가 조회됨 )
function ajaxSubsList(){
	$.ajax({
		type: "POST",
		url: "/biz/subList",
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

//가입자관리 추가
function ajaxSubsInsert(){
	var data = [{
			subs_key: "", //고객번호            
			subs_id: "",	                   
			subs_name: "", //고객이름           
			subs_title: "", // 상호명          
			admin_key: "", // 입력?? 이건 무엇?   
			admin_so_code: "",              
			reg_date: "", //생성일             
			email: "", //이메일                
			addr: "", //주소                  
			pin: "",                        
			phone: "", //연락처                
			status: "", //고객상태 1            
			web_index: ""                
		},
		{
			subs_key: "", //고객번호            
			subs_id: "",	                   
			subs_name: "", //고객이름           
			subs_title: "", // 상호명          
			admin_key: "", // 입력?? 이건 무엇?   
			admin_so_code: "",              
			reg_date: "", //생성일             
			email: "", //이메일                
			addr: "", //주소                  
			pin: "",                        
			phone: "", //연락처                
			status: "", //고객상태 1            
			web_index: ""    
		}
	];
	
	$.ajax({
		type: "POST",
		url: "/biz/subsIn",
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

//가입자관리 수정
function ajaxSubsUpdate(){
	// 수정할 정보만 기입 ( null 값 혹은 '' 공백은 제외한다. )
	var data = {
			subs_key: "", //고객번호            
			subs_id: "",	                   
			subs_name: "", //고객이름           
			subs_title: "", // 상호명          
			admin_key: "", // 입력?? 이건 무엇?   
			admin_so_code: "",              
			reg_date: "", //생성일             
			email: "", //이메일                
			addr: "", //주소                  
			pin: "",                        
			phone: "", //연락처                
			status: "", //고객상태 1            
			web_index: ""                
		};
	
	$.ajax({
		type: "POST",
		url: "/biz/subsUp",
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

//가입자관리 삭제
function ajaxSubsDelete(){
	var data = [{
		subs_key: "" //고객번호            
	},
	{
		subs_key: "" //고객번호            
	}
];
	
	$.ajax({
		type: "POST",
		url: "/biz/subsDl",
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

//서비스현황 목록조회 ( 모든정보가 조회됨 )
function ajaxSvcList(){
	var data = {
		subs_key: "" //고객번호            
	};
	$.ajax({
		type: "POST",
		url: "/biz/snList",
		dataType:"json",
		data: JSON.stringify(data),
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


//서비스현황 추가
function ajaxSvcInsert(){
	var data = [{
			subs_key: "",  //고객번호            
			svc_num: "", // 070번호            
			admin_key: "", //                
			admin_so_code: "", //            
			called_key: "", // 착신번호          
			ann_id: "", // 음원ID              
			addr: "", // 주소                  
			use_sms: "", // 사용여부 기본 0:미사용 1:사용        
			use_ann: "", // 사용여부 기본 0:미사용 1:사용        
			sms_text: "", // SMS             
			sms_origin_num: "", //sms발신번호    
			reg_date: "", // 등록일             
			cur_date: "", // 수정일             
			web_index: "", //                
		},
		{
			subs_key: "",  //고객번호            
			svc_num: "", // 070번호            
			admin_key: "", //                
			admin_so_code: "", //            
			called_key: "", // 착신번호          
			ann_id: "", // 음원ID              
			addr: "", // 주소                  
			use_sms: "", // 사용여부 기본 0:미사용 1:사용        
			use_ann: "", // 사용여부 기본 0:미사용 1:사용        
			sms_text: "", // SMS             
			sms_origin_num: "", //sms발신번호    
			reg_date: "", // 등록일             
			cur_date: "", // 수정일             
			web_index: "", //   
		}
	];
	
	$.ajax({
		type: "POST",
		url: "/biz/snIn",
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


//서비스현황 수정
function ajaxSvcUpdate(){
	// 수정할 정보만 기입 ( null 값 혹은 '' 공백은 제외한다. )
	var data = {
			subs_key: "",  //고객번호            
			svc_num: "", // 070번호            
			admin_key: "", //                
			admin_so_code: "", //            
			called_key: "", // 착신번호          
			ann_id: "", // 음원ID              
			addr: "", // 주소                  
			use_sms: "", // 사용여부 기본 0:미사용 1:사용        
			use_ann: "", // 사용여부 기본 0:미사용 1:사용        
			sms_text: "", // SMS             
			sms_origin_num: "", //sms발신번호    
			reg_date: "", // 등록일             
			cur_date: "", // 수정일             
			web_index: "", //                
		};
	
	$.ajax({
		type: "POST",
		url: "/biz/snUp",
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

//서비스현황 삭제
function ajaxSvcDelete(){
	var data = [{
		subs_key: "", //고객번호          
		svc_num: "", // 070번호            
	},
	{
		subs_key: "", //고객번호          
		svc_num: "", // 070번호                      
	}
];
	
	$.ajax({
		type: "POST",
		url: "/biz/snDl",
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


//작업이력조회 ( 모든정보가 조회됨 )
function ajaxHisList(){
	$.ajax({
		type: "POST",
		url: "/biz/hisList",
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

