jQuery.fn.serializeObject = function() { 
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
		data: JSON.stringify($("#findUa_no").serializeObject()),
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			location.reload();
		},
		error: function (error) {
			location.reload();
		}
	});
}

function selectSubsInfoAjax(){
	$.ajax({
		type: "POST",
		url: "/subs/sel",
		data: JSON.stringify($("#uan_subs_info").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if($("#num_cf").length>0){
				result.odr_flag==="1"?$("input:checkbox[name='odr_flag']").prop("checked", true):$("input:checkbox[name='odr_flag']").prop("checked", false);			
				result.tdr_type==="3"?$("input:checkbox[name='tdr_type']").prop("checked", true):$("input:checkbox[name='tdr_type']").prop("checked", false);			
				result.cd_flag==="1"?$("input:checkbox[name='cd_flag']").prop("checked", true):$("input:checkbox[name='cd_flag']").prop("checked", false);			
				$('input:radio[name=ocs_type]:input[value=' + result.ocs_type + ']').attr("checked", true);
				$('input:radio[name=def_dest_type]:input[value=' + result.def_dest_type + ']').attr("checked", true);
				$("#num_cf").val(result.num_cf);
				$("#na_timer").val(result.na_timer);
				
				$('input:radio[name=crbt_flag]:input[value=' + result.crbt_flag + ']').attr("checked", true);
				$('input:radio[name=billann_flag]:input[value=' + result.billann_flag + ']').attr("checked", true);
			}else{
				$('input:radio[name=ocs_type]:input[value=' + result.ocs_type + ']').attr("checked", true);
				setBWList();
			}

		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}


function updateSubsInfoAjax(){
	
	$.ajax({
		type: "POST",
		url: "/subs/update",
		data: JSON.stringify($("#uan_subs_info").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result===1){
				toastr.success('정보가 변경되었습니다.');
			}else{
				toastr.error('정보가 잘못되었습니다.');
			}
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}
var destList;
function selectDestListAjax(type){
	$.ajax({
		type: "POST",
		url: "/dest/ls",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			destList = result;
			setDestTable(type);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}

/*function selectSubsInfoAjax(){
	$.ajax({
		type: "POST",
		url: "/dest/ls",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			destList = result;
			setDestTable();
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}
*/
function updateDestAjax(){
	$.ajax({
		type: "POST",
		url: "/subs/destUp",
		data: JSON.stringify($("#dest_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result===1){
				toastr.success('정보가 변경되었습니다.');
				$.ajax({
					type: "POST",
					url: "/dest/ls",
					dataType:"json",
					contentType: "application/json; charset=UTF-8",
					success: function(result) {destList = result;},
					error: function (error) {toastr.error('정보가 잘못되었습니다.')}
				});
			}else{
				toastr.error('정보가 잘못되었습니다.');
			}
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}
var cfList;
function selectCfListAjax(){
	$.ajax({
		type: "POST",
		url: "/dest/ls",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			destList = result;
			itiDetailCF();
		},
		error: function (error) {toastr.error('정보가 잘못되었습니다.')}
	});
	
	$.ajax({
		type: "POST",
		url: "/dest/cflist",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result){
			cfList = result;
			setCfTable();
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}

function inserCfAjax() {
	$.ajax({
		type: "POST",
		url: "/dest/cfup",
		data: JSON.stringify($("#cf_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result) {
				toastr.success(result);
//				location.reload();
				selectCfListAjax();
				
			}
			else toastr.error(result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}

function deleteCfAjax() {
//	JSON.stringify($("#cf_setting").serializeObject())
	var dd = getCheck();
	$.ajax({
		type: "POST",
		url: "/dest/cfdel",
		data: {data:dd},
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result) {
				toastr.success(result);
//				location.reload();
				selectCfListAjax();
			}
			else toastr.error(result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}

var otcList;
function selectOtcListAjax(){
	$.ajax({
		type: "POST",
		url: "/dest/otclist",
		data: JSON.stringify($("#otc_info").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result){
			otcList = result;
			setOctTable();
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}

var ocgList;
function selectOcgListAjax(){
	$.ajax({
		type: "POST",
		url: "/dest/ocg",
		data: JSON.stringify({area_code:$("#sido").val()}),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result){
			ocgList = result;
			setAreaZone();
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}

function selectDayListAjax(){
	$.ajax({
		type: "POST",
		url: "/con/dls",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result){
			setDayDetail(result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}

function updateDayAjax(){
	var totalDay="";
	$("input[name='day_names']").each(function (i){
		var data = $("input[name='day_names']").eq(i).val();
		if(data!=""){
			if(totalDay=="")totalDay+=$("input[name='day_names']").eq(i).val();
			else totalDay+=","+$("input[name='day_names']").eq(i).val();
		}
	});
	
	$("#day_name").val(totalDay);
	$.ajax({
		type: "POST",
		url: "/con/dup",
		data: JSON.stringify($("#day_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			toastr.success(data.result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}


function selectTimeListAjax(){
	$.ajax({
		type: "POST",
		url: "/con/tls",
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result){
			setTimeDetail(result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}

function updateTimeAjax(){
	setTimeTR();
	$.ajax({
		type: "POST",
		url: "/con/tup",
		data: JSON.stringify($("#time_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			toastr.success(data.result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}

function selectNoneAjax(){
	$.ajax({
		type: "POST",
		url: "/con/wls",
		data: JSON.stringify($("#bw_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			$("#example2").html("");
			toastr.success(data.result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}

var whiteList;
function selectWhiteAjax(){
	$.ajax({
		type: "POST",
		url: "/con/wls",
		data: JSON.stringify($("#bw_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			whiteList = data;
			setBWListTable("white");
			toastr.success(data.result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}

var ocsList;
function selectOcsAjax(){
	$.ajax({
		type: "POST",
		url: "/con/ols",
		data: JSON.stringify($("#bw_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			ocsList = data;
			setBWListTable("ocs");
			toastr.success(data.result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
		}
	});
}

function insertBWAjax(type){
	
	$.ajax({
		type: "POST",
		url: type=="1"? "/con/win":"/con/oin",
		data: JSON.stringify($("#bw_setting").serializeObject()),
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(data) {
			toastr.success(data.result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.');
			if(type=="1")selectWhiteAjax();
			else selectOcsAjax();
		}
	});
}

function deleteCfAjax() {
//	JSON.stringify($("#cf_setting").serializeObject())
	var dd = getCheck();
	$.ajax({
		type: "POST",
		url: "/dest/cfdel",
		data: {data:dd},
		dataType:"json",
		contentType: "application/json; charset=UTF-8",
		success: function(result) {
			if(result) {
				toastr.success(result);
//				location.reload();
				selectCfListAjax();
			}
			else toastr.error(result);
		},
		error: function (error) {
			toastr.error('정보가 잘못되었습니다.')
		}
	});
}



