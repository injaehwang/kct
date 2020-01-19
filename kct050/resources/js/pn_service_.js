var $svcSchBox = $('#serviceSearchBox');
var $cldListBox = $('#cldListBox');
var $pagination = $('#pagination');
var serviceRequestData = {};
var pageState = {now: 1, first: 0, last: 0};

/**
 * 서비스 현황 조회
 */

function retrieveServiceInfo(){
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
};

/**
 * 서비스 관리 조회
 */
function retrieveManagementList(dats){
	// 대역 조회시
	/*	var dats ={
			rep_type	 : "0",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : "",  //안심 or 착신번호시 번호값
			pn_start 	 : "0508080000",  // 대역조회시 시작값
			pn_end 		 : "0508080005",  // 대역조회시 끝값
			rowcnt 	 	 : "10",  // 최대 row 수
			page 		 : "1",  // 현 page
	}*/
	
	console.log( dats );

	$.ajax({
		type: "POST",
		url: "/pn/mglist",
		dataType:"json",
		data: JSON.stringify(dats),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
				toastr.success(result.reason);
				updateCldList(result.body.cldList);
				updatePage(result.body.total, result.body.rowcnt, result.body.page);

			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
	});

	// 황인재 임시 데이터 처리
	// var tempData = JSON.parse('[{"pn_rep":"0508080000","pn":"0508080003","svc":"1","called1":"07030000003","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080005","svc":"1","called1":"07030000005","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080007","svc":"1","called1":"07030000007","called2":"0508080000","called3":null,"chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"}, {"pn_rep":"0508080000","pn":"0508080003","svc":"1","called1":"07030000003","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080005","svc":"1","called1":"07030000005","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080007","svc":"1","called1":"07030000007","called2":"0508080000","called3":null,"chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"}, {"pn_rep":"0508080000","pn":"0508080003","svc":"1","called1":"07030000003","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080005","svc":"1","called1":"07030000005","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080007","svc":"1","called1":"07030000007","called2":"0508080000","called3":null,"chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"}, {"pn_rep":"0508080000","pn":"0508080003","svc":"1","called1":"07030000003","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080005","svc":"1","called1":"07030000005","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080007","svc":"1","called1":"07030000007","called2":"0508080000","called3":null,"chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"}, {"pn_rep":"0508080000","pn":"0508080003","svc":"1","called1":"07030000003","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080005","svc":"1","called1":"07030000005","called2":null,"called3":"0508080000","chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"},{"pn_rep":"0508080000","pn":"0508080007","svc":"1","called1":"07030000007","called2":"0508080000","called3":null,"chg_date":null,"edate":null,"calling":null,"cid":"1","point_time":null,"incall":"0","innum":null,"pn_code":null,"prefix":null,"allocated_date":null,"use_flag":"1","manage_code":null,"manage_date":null,"system_id":"000","reg_date":"20200108"}]');
	// updateCldList(tempData);
	// updatePage(dats.page, dats.rowcnt);
}

/**
 * 검색결과 리스트 업데이트
 */
function updateCldList(data){

	console.log(data);
	// $cldListBox.html('');
	var html = '';

	data.forEach(function( d, i ){
		console.log(d);
		html+= '<tr>';
		html+= '<td class="center"><input class="check" type="checkbox"></td>';
		html+= '<td class="center">' + (i+1) + '</td>';
		html+= '<td class="pn">' + d.pn + '</td>';
		html+= '<td class="pn1"><p class="label">' + (d.called1||'-') + '</p><input type="number" value="' + (d.called1||'-') +'"/></td>';
		html+= '<td class="pn2"><p class="label">' + (d.called2||'-') + '</p><input type="number" value="' + (d.called2||'-') +'"/></td>';
		html+= '<td class="pn3"><p class="label">' + (d.called3||'-') + '</p><input type="number" value="' + (d.called3||'-') +'"/></td>';
		html+= '<td class="center"><button class="btn-down btn-edit"><i class="fas fa-edit"></i></button><button class="btn-down btn-save"><i class="fas fa-save"></i></button></td>';
		html+= '</tr>';
	});

	// console.log(html);

	$cldListBox.html(html);
	

};

/**
 * 서비스 관리 업데이트
 */
function ajaxManagementUpdate( cldList ){
	var reqData = getSearchData();
	reqData.cldList = cldList;

	// var dats ={
	// 		rep_type	 : "",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
	// 		pn 			 : "",  //안심 or 착신번호시 번호값
	// 		pn_start 	 : "",  // 대역조회시 시작값
	// 		pn_end 		 : "",  // 대역조회시 끝값
	// 		rowcnt 	 	 : "",  // 최대 row 수
	// 		page 		 : "",  // 현 page
	// 		cldList 	 : cldList // 수정할 대상
	// }

	$.ajax({
		type: "POST",
		url: "/pn/mgup",
		dataType:"json",
		data: JSON.stringify(reqData),
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

/**
 * page
 */
function updatePage(total, rowcnt, page){

	pageState.now = page;
	pageState.last = Math.ceil(total/rowcnt);

	var html = '<li class="paginate_button page-item first"><a href="#" tabindex="0" class="page-link" data-target="1">First</a></li>';
	html += '<li class="paginate_button page-item previous ' + ((pageState.now > 1) ? '' : 'disabled') + '"><a href="#" tabindex="0" class="page-link" data-target="' + (+pageState.now-1) + '">Previous</a></li>';
	for(var i = 1; i<=pageState.last; i++){
		console.log(page);
		html += '<li class="paginate_button page-item ' + (i == page ? 'active' : '')+ '"><a href="#" aria-controls="example2" tabindex="0" class="page-link" data-target="' + i + '">' + i + '</a></li>'
	}
	html += '<li class="paginate_button page-item next ' + ((pageState.now < pageState.last) ? '' : 'disabled') + '"><a href="#" tabindex="0" class="page-link" data-target="'+ (+pageState.now+1) + '">Next</a></li>';
	html += '<li class="paginate_button page-item last"><a href="#" tabindex="0" class="page-link" data-target="' + pageState.last +'">Last</a></li>';
	
	// page
	$pagination.html( html );
}

function ajaxManagementDelete( cldList ){
	
	var reqData = getSearchData();
	reqData.cldList = cldList;

	// var dats ={
	// 		rep_type	 : "",  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
	// 		pn 			 : "",  //안심 or 착신번호시 번호값
	// 		pn_start 	 : "",  // 대역조회시 시작값
	// 		pn_end 		 : "",  // 대역조회시 끝값
	// 		rowcnt 	 	 : "",  // 최대 row 수
	// 		page 		 : "",  // 현 page
	// 		cldList 	 : cldList // 수정할 대상
	// }

	$.ajax({
		type: "POST",
		url: "/pn/mgdel",
		dataType:"json",
		data: JSON.stringify(reqData),
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

function getSearchData(){
	serviceRequestData = {
			rep_type	 : $('input[data-name=pn_start]', $svcSchBox).val() ? 0 : $('select[data-name=pn_numberType]', $svcSchBox).val(),  //0 : 대역조회시 | 1 : 안심번호 | 2 : 착신번호
			pn 			 : $('input[data-name=pn]', $svcSchBox).val(),  //안심 or 착신번호시 번호값
			pn_start 	 : $('input[data-name=pn_start]', $svcSchBox).val(),  // 대역조회시 시작값
			pn_end 		 : $('input[data-name=pn_end]', $svcSchBox).val(),  // 대역조회시 끝값
			rowcnt 	 	 : $('select[data-name=rowCnt]', $svcSchBox).val(),  // 한 페이지에서 보여줄 단위
			page 		 : "1",  // 현 page
		}
	return serviceRequestData;
}

/**
 * 이벤트 바인딩
 */

function eventBind(){
	$(document)
	
	.on('click', '#retrieveService', function(){
		console.log('검색하기');
		
		// 안심 or 착신번호로 조회시
		var reqData = getSearchData();
		reqData.page = 1;

		retrieveManagementList( reqData ); // 1 page
	})

	// 번호조회 인풋 선택시 개인번호 대역 조회 초기화
	.on('focus', 'input[data-name=pn]', function(){
		$('input[data-name=pn_start], input[data-name=pn_end]', $svcSchBox).val('');
	})

	// 개인번호 대역 조회 선택시 번호조회 인풋 초기화
	.on('focus', 'input[data-name=pn_start], input[data-name=pn_end]', function(){
		$('input[data-name=pn]', $svcSchBox).val('');
	})

	// ~ 이내 셀렉트박스
	.on('change', 'in[data-name=pn_range]', function(){
		var $t = $(this), v = $t.val();
		$('input[data-name=pn_end]', $svcSchBox).val( +$('input[data-name=pn_start]', $svcSchBox).val() + v );
	})

	// 착신설정변경 - edit
	.on('click', '.btn-edit', function(){
		var $t = $(this), $tr = $t.closest('tr');
		$tr.addClass('edit');
	})
	.on('click', '.btn-save', function(){
		var $t = $(this), $tr = $t.closest('tr');
		$tr.removeClass('edit');
		var req = {
			pn : $('.pn', $tr).html(),		//안심번호
			called1 : $('.pn1 input', $tr).val(),	//1차 착신번호
			called2 : $('.pn2 input', $tr).val(),	//2차 착신번호
			called3 : $('.pn3 input', $tr).val()	//3차 착신번호			
		};

		$('input', $tr).each(function(e){
			var $t = $(this);
			$t.prev().html($t.val());
		});
		var cldList = [req];

		ajaxManagementUpdate(cldList);
	})
	.on('click', '.btn-multiEdit', function(){
		if(!$('input.check:checked', $svcSchBox).length){
			alert('설정하실 row 를 선택해주세요.');
			return;
		}
		$('tr', $cldListBox).each(function(){
			var $t = $(this);
			if( $('input.check', $t).is(':checked') ){
				$t.addClass('edit');
			}
		})
		$('#btn-box').addClass('edit');
	})
	.on('click', '.btn-multiEditSave', function(){
		if(!$('input.check:checked', $cldListBox).length){
			alert('설정하실 row 를 선택해주세요.');
			return;
		}
		$('input[type=checkbox]', $svcSchBox).prop('checked', false);
		var reqData = [];
		$('tr', $cldListBox).each(function(){
			var $t = $(this);
			$t.removeClass('edit');
			$('input.check', $t).prop('checked', false);
			reqData.push({
				pn : $('.pn', $t).html(),		//안심번호
				called1 : $('.pn1 input', $t).val(),	//1차 착신번호
				called2 : $('.pn2 input', $t).val(),	//2차 착신번호
				called3 : $('.pn3 input', $t).val()	//3차 착신번호	
			});
			$('input', $t).each(function(e){
				var $t_ = $(this);
				$t_.prev().html($t_.val());
			});
		})
		$('#btn-box').removeClass('edit');
		console.log( reqData );
	})

	// 착신번호 삭제
	.on('click', '.btn-delete', function(){
		var $t = $(this), $tr = $t.closest('tr');
		$tr.addClass('edit');

		if(!$('input.check:checked', $svcSchBox).length){
			alert('삭제하실 row 를 선택해주세요.');
			return;
		}
		var delList = [];
		$('tr', $cldListBox).each(function(){
			var $t = $(this);
			if( $('input.check', $t).is(':checked') ){
				var $t_ = $(this);
				delList.push({
					'pn' : $('.pn', $t_).html()
				})
			}
		})
		console.log(delList);
		ajaxManagementDelete(delList);

	})

	// 전체선택, 해제
	.on('change', '.checkAll', function(){
		var $t = $(this);
		$('tr > td:first-child input', $svcSchBox).prop('checked', $t.is(':checked'));
	 })
	
	 // excel down
	 .on('click', '.btn-exelDown', function(){
		if(!$('input.check:checked', $svcSchBox).length){
			alert('download 하실 row 를 선택해주세요.');
			return;
		}
		var downList = [];
		$('tr', $cldListBox).each(function(){
			var $t = $(this);
			if( $('input.check', $t).is(':checked') ){
				var $t_ = $(this);
				downList.push({
					'pn' : $('.pn', $t_).html()
				})
			}
		})
		console.log(downList);
	 })

	 // page
	 .on('click', '#pagination a', function(){
		var $t = $(this), target = $t.attr('data-target');
		if($t.is('.disabled')) return false;

		serviceRequestData.page = target;
		retrieveManagementList( serviceRequestData );

	 })

	 // 페이지 보여주는 건 변경
	 .on('change', 'select[data-name="rowCnt"]', function(){
		var $t = $(this); v = $t.val();
		serviceRequestData.page = target;
		retrieveManagementList( serviceRequestData );
	 })

 }


 $(function(){
	eventBind();
 });

