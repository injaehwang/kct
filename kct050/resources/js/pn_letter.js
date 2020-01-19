var $settedTextArea = $('#settedTextArea');
var $useTxtBox = $('#useTxtBox');
var $messagingScreen = $('#messagingScreen');
var $$messagingScreenLength = $('.byte-current', $messagingScreen);

/**
 * 문자서비스 요청
 */
function retrieveSMSInfo(){
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

	// 황인재 임시 데이터
	// var result = {body: {SMS_TYPE: 1, SMS_TEXT: 'text text text text'}}
	// setSMSInfo(result.body);
}

/**
 * 문자서비스 정보 입력
 */
function setSMSInfo(data){
	var useTxt = data.SMS_TYPE;
	var infoTxt = data.SMS_TEXT;

	// $settedTextArea.val( infoTxt );
	$settedTextArea.val( infoTxt );
	$('textarea', $messagingScreen).val( infoTxt );
	setTimeout(function(){ $('textarea', $messagingScreen).trigger('keyup') }, 100);
	useTxt ? $useTxtBox.addClass('use') : $useTxtBox.removeClass('use');
}

/**
 * 문자 업데이트
 */
function updateSMSUpdate( dats ){
	console.log(dats);
	// 문자 사용 or 미사용 설정시 해당값만 셋팅
	// var dats ={
	// 		sms_type	 : ""  //	0 : 미사용, 1 : 사용
	// }

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

/**
 * 이벤트 바인드
 */
function eventBind(){

	$(document)
	
	.on('click', '#messagingScreen .submit', function(){
		console.log('저장');
		var txt = $('textarea', $messagingScreen).val();
		updateSMSUpdate({
			sms_text: txt
		})
	})
	.on('click', '#messagingScreen .cancel', function(){
		$('textarea', $messagingScreen).val('');
		$$messagingScreenLength.html('0');
	})
	.on('keyup', '#messagingScreen textarea', function(){
			var obj = this;
			var maxByte = 80;
            var str = obj.value;
            var str_len = str.length;

            var rbyte = 0;
            var rlen = 0;
            var oneChar = "";
            var str2 = "";
            var byteWrapper = $(obj).next();
			
            for(var i=0; i<str_len; i++){
                oneChar = str.charAt(i);
                if(escape(oneChar).length > 4){
                    rbyte += 2;   //한글2Byte
                }else{
                    rbyte++;   //영문 등 나머지 1Byte
                }

                if(rbyte <= maxByte){
                    rlen = i+1; //return할 문자열 갯수
                }
            }

            if(rbyte > maxByte){
                $('#byte_over_modal').modal('show'); //모달 호출    
                str2 = str.substr(0,rlen);   //문자열 자르기
				obj.value = str2;
				setTimeout(function(){ $('textarea', $messagingScreen).trigger('keyup') }, 100);
                // fnChkByte(obj, maxByte);
            }else{
                ($(obj).hasClass("phone-copy-textarea")) ? $('.phone-wrapper-content').html(str) : '';
                $$messagingScreenLength.html(rbyte);
            }
		// console.log( rbyte );

	})
	.on('click', '#useTxtBox button', function(){
		var $t = $(this);

		updateSMSUpdate({
			sms_type: $t.is('.useCase') ? 0 : 1
		})
	})
 }

$(function(){
	eventBind();
 });