// 서비스 목록
var $tableInsertTable = $('#tableInsertTable');
var $tableInsertTbody = $('#tableInsertTable tbody');
var $joinMember = $('#joinMember');
var memberDetailInfo;
var memberDataTable;

// 서비스 디테일
var $memberDetailBox = $('#memberDetailBox');

/**
 * 가입자관리 목록조회 ( 모든정보가 조회됨 )
 */
function retrieveMembersList(role, id){
	$.ajax({
		type: "POST",
		url: "/biz/subList",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result.result=="OK"){
                toastr.success(result.reason);
                console.log(role);
                console.log(result.body);
                var tempData = JSON.parse('[{"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}]');
                switch(role){
                    case 'retreiveMemberList':
                        setMembersList(tempData);
                        break;
                    case 'checkHasId':
                        checkHasId(tempData, id);
                        break;
                    case 'retrieveMemberDetail':
                        var detailData = tempData.filter(function(d){
                            return d.subs_key == id;
                        })[0];
                        memberDetailInfo = detailData;
                        setMembersDetail(detailData);
                        break;
                }
                
			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
    });
    
    var tempData = JSON.parse('[{"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}, {"subs_key":"1","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null},{"subs_key":"1000000","subs_id":null,"subs_name":null,"subs_title":null,"admin_key":null,"admin_so_code":null,"reg_date":null,"email":null,"addr":null,"pin":null,"phone":null,"status":"1","web_index":null}]');
    switch(role){
        case 'retreiveMemberList':
            setMembersList(tempData);
            break;
        case 'checkHasId':
            checkHasId(tempData, id);
            break;
        case 'retrieveMemberDetail':
            var detailData = tempData.filter(function(d){
                return d.subs_key == id;
            })[0];
            memberDetailInfo = detailData;
            setMembersDetail(detailData);
            break;
    }
}

/**
 * 가입자 정보 수정
 */
function memberInfoUpdate(data){
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

function checkHasId(data, id){
    var validateId = true;
    data.forEach(function(d, i){
        if(d.subs_key == id) validateId = false;
    })
    if(!validateId){
        $joinMember.addClass('needValidate');
        $('#validateErrorText').html('중복된 고객번호 입니다.');
        $('#field_error_modal').modal();
        return false;
    }else{
        $('#validateErrorText').html('사용 가능한 고객번호 입니다.');
        $('#field_error_modal').modal();
        $joinMember.removeClass('needValidate');
        
    }
    //return validateId;
}

function setMembersList(data){

    console.log(data);    

    var html = '';
    data.forEach(function(d){
        html += '<tr>';
        html += '<td><input type="checkbox"/></td>';
        html += '<td><a href="http://www.' + d.subs_key + '.com"><u>' + d.subs_key + '</u></a></td>';
        html += '<td>' + d.subs_name + '</td>';
        html += '<td>' + d.subs_title + '</td>';
        html += '<td>' + d.subs_name + '</td>';
        html += '<td>' + (+d.status ? '사용' : '미사용') + '</td>';
        html += '<td>' + (+d.status ? '사용' : '미사용') + '</td>';
        html += '<td>' + d.reg_date + '</td>';
        html += '</tr>';
    })
    $tableInsertTbody.html(html);
    memberDataTable = $('#tableInsertTable').dataTable();
}

function setMembersDetail(data){
    console.log(data);
    var deepData = $.extend({}, data);
    deepData.subs_name = deepData.subs_name ? deepData.subs_name.slice(0, -1) + '*' : '';
    if(+deepData.status) $('td[data-status]', $memberDetailBox).addClass('ok');    
    $('td[data-role]', $memberDetailBox).each(function(){
        var $t = $(this);
        var key = $t.attr('data-role');
        $t.html(deepData[key]);        
    })
}

/**
 * 고객등록
 */
function newMember(data){
    console.log(JSON.stringify(data));
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

/**
 * 고객삭제
 */
function memberDelete(data){
// 	var data = [{
// 		subs_key: "" //고객번호            
// 	},
// 	{
// 		subs_key: "" //고객번호            
// 	}
// ];
	console.log(data);
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


/**
 * 서비스 현황 조회
 */
function retrieveSvcList(data){
	// var data = {
	// 	subs_key: "" //고객번호            
	// };
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
                setSvcList(result.body);
			}else{
				toastr.error(result.reason);
			}
		},
		error: function (error) {
			toastr.error("서버와 연결이 원활하지 않습니다.");
		}
    });
    // var tempData = 
    setSvcList();
}

function setSvcList(data){

    console.log(data);    

    var html = '';
    data.forEach(function(d){
        html += '<tr>';
        html += '<td><input type="checkbox"/></td>';
        html += '<td><a href="http://www.' + d.subs_key + '.com"><u>' + d.subs_key + '</u></a></td>';
        html += '<td>' + d.subs_name + '</td>';
        html += '<td>' + d.subs_title + '</td>';
        html += '<td>' + d.subs_name + '</td>';
        html += '<td>' + (+d.status ? '사용' : '미사용') + '</td>';
        html += '<td>' + (+d.status ? '사용' : '미사용') + '</td>';
        html += '<td>' + d.reg_date + '</td>';
        html += '</tr>';
    })
    $tableInsertTbody.html(html);
    memberDataTable = $('#tableInsertTable').dataTable();
}

function setMembersDetail(data){
    console.log(data);
    var deepData = $.extend({}, data);
    deepData.subs_name = deepData.subs_name ? deepData.subs_name.slice(0, -1) + '*' : '';
    if(+deepData.status){
        $('td[data-status]', $memberDetailBox).addClass('ok');    
    }
    console.log(deepData);
    $('td[data-status] select', $memberDetailBox).val(deepData.status);
    $('td[data-role]', $memberDetailBox).each(function(){
        var $t = $(this);
        var key = $t.attr('data-role');
        $t.html(deepData[key]);        
    })
}

/**
 * 작업이력 조회
 */
function retrieveHisList(){
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

function eventBind(){
    $(document)

    .on('click', '#memberBtns .join', function(){
        $joinMember.addClass('on');
    })
    .on('click', '#memberBtns .upload', function(){
        console.log('upload');
    })
    .on('click', '#memberBtns .remove', function(){
        console.log('remove');
    })

    // 가입자 등록 고객번호 중복 확인
    .on('click', '.checkHasId', function(){
        var newMemberKey = $('#newMemberKey').val();
        if(!newMemberKey){
            $('#validateErrorText').html('고객번호 입력 필수');
            $('#field_error_modal').modal();
            return false;
        }
        retrieveMembersList('checkHasId', +newMemberKey);
    })
    .on('keyup', '#newMemberKey', function(){
        $joinMember.addClass('needValidate');
    })
    .on('click', '.addMemberBtnBox .addMember', function(){
        console.log('고객등록');
        var values = $('#joinMemberForm').serializeObject();
        if($joinMember.is('.needValidate')){
            $('#validateErrorText').html('고객번호 중복확인 필수');
            $('#field_error_modal').modal();
            return false;
        }

        if(!values.subs_key || !values.subs_name || !values.subs_title){
            $('#validateErrorText').html('고객번호 및 가입자명, 상호명은 반드시 입력해야 합니다.');
            $('#field_error_modal').modal();
            return false;
        }
        $joinMember.removeClass('on').addClass('needValidate');
        $('input', $joinMember).val('');
        newMember([values]);
    })
    .on('click', '.addMemberBtnBox .addService', function(){
        console.log('서비스등록');
    })

    // table checkbox
    .on('change', '.checkAll', function(){
		var $t = $(this);
		$('tr > td:first-child input', $tableInsertTable).prop('checked', $t.is(':checked'));
     })

     // 고객 삭제
     .on('click', '.confirmDeleteMember', function(){
         var data = [{
             subs_key: $('td[data-role=subs_key]', $memberDetailBox).html()
         }]
        memberDelete(data);
        $('#customer_delete_modal').modal('hide');
     })

     // 서비스 조회
     .on('click', '.searchServiceList', function(){
        var data = {
            subs_key: $('td[data-role=subs_key]', $memberDetailBox).html()
        };
        retrieveSvcList(data);
     })

     // 가입자 상세정보 - 고객상태 수정
     .on('click', '.svcStatusEdit', function(){
        console.log('고객상태 수정');
        $('td[data-status]', $memberDetailBox).addClass('edit');
    })
    .on('click', '.svcStatusEditSave', function(){
        console.log('고객상태 수정 완료');
        $('td[data-status]', $memberDetailBox).removeClass('edit');
        memberDetailInfo.status = $('td[data-status] select', $memberDetailBox).val();
        memberInfoUpdate(memberDetailInfo);
    })

     
}


$(function(){
    eventBind();
})