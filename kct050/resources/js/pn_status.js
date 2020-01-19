var $statusInfoBox = $('#statusInfoBox');

/**
 * 초기 정보 조회
 */
function retrieveStatusInfo(){
	$.ajax({
		type: "POST",
		url: "/pn/sel",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				alert(result.reason);
				setStatusInfo(result.body);
			}else{
				alert(result.reason);
			}
		},
		error: function (error) {
			
		}
	});

	// 황인재 임시 데이터
	// var tempData = JSON.parse('{"pn_rep":"0508080000","rep_start":"0508080000","rep_end":"9999","reg_date":null,"used_cnt":"1","use_cnt":"9999","pn_type":"1","ann_type":"1","ann_play":null}');
	// setStatusInfo(tempData);

}

/**
 * 안심번호 서비스 정보 출력
 */
function setStatusInfo(data){
	console.log(data);
	var setData = $.extend({}, data);
	setData.rep_range = data.rep_start + ' ~ ' + data.rep_start.substr(0,6) + '0000 (10000) 건';
	setData.used_cnt = data.used_cnt + '(' + parseInt(data.used_cnt/data.use_cnt *100) + '%)';
	setData.use_cnt = data.use_cnt + '건';
	setData.pn_type = data.pn_type == '1' ? '사용' : '미사용';

	// temp ann_type1, ann_type2
	setData['ann_type1'] = '1';
	setData['ann_type2'] = '0';

	$('[data-name]', $statusInfoBox).each(function(){
		var $t = $(this), key = $t.attr('data-name');
		if($t.is('input')){
			$t.prop('checked', setData[key] == '1');
		}else{
			$t.html(setData[key]);
		}
	})

	console.log(setData);
}

/**
 * 이벤트 바인딩
 */

 function eventBind(){
	// $(document)
	
	
 }


 $(function(){

	eventBind();

	retrieveStatusInfo();
 });

