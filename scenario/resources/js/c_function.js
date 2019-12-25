$(function() {
	const Toast = Swal.mixin({
		toast : true,
		position : 'top-end',
		showConfirmButton : false,
		timer : 3000
	});
	
});

function setMenu(mid) {
	for (var i = 0; i < $(".nav-link").length; i++) {
		$(".nav-link")[i].className = "nav-link";
	}
	$("#"+mid.split("-")[0]).attr('class','nav-item has-treeview menu-open');
	$("#"+mid.split("-")[0]+"a").attr('class','nav-link active');
	$("#"+mid).attr('class','nav-link active');
}

function setDestTable(type){
	var html = "";
	for(var a=0; a<destList.length; a++){
		if(type=="list")html +="<tr><td>" + (a+1) +"</td><td>" +destList[a].dest_no+"</td></tr>"
		else html +="<tr><td>" + (a+1) +"</td><td><a href='#'  onclick='setDestSetting(\""+a+"\")'> " +destList[a].dest_no+"</a></td></tr>"
	}
	$("#destTable").html(html);
	if($("#example2_wrapper").html()!=null)$("#example2_wrapper").remove();
    $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
      });
}

function setDestSetting(index) {
	toastr.success("착신번호 : "+destList[index].dest_no + " 조회 되었습니다.");
	
	$("#dest_no").val(destList[index].dest_no);
	destList[index].cfb_flag==="1"?$("input:checkbox[name='cfb_flag']").prop("checked", true):$("input:checkbox[name='cfb_flag']").prop("checked", false);			
	destList[index].cfna_flag==="1"?$("input:checkbox[name='cfna_flag']").prop("checked", true):$("input:checkbox[name='cfna_flag']").prop("checked", false);			
	destList[index].cfu_flag==="1"?$("input:checkbox[name='cfu_flag']").prop("checked", true):$("input:checkbox[name='cfu_flag']").prop("checked", false);			
	destList[index].cfd_flag==="1"?$("input:checkbox[name='cfd_flag']").prop("checked", true):$("input:checkbox[name='cfd_flag']").prop("checked", false);			
	
	if(destList[index].cfb_flag==="0"&&destList[index].cfna_flag==="0"&&destList[index].cfu_flag==="0"&&destList[index].cfd_flag==="0"){
		$("input:checkbox[name='alloff']").prop("checked", true)
	}
	if(destList[index].dest_type==="1"){
		$('input:radio[name=dest_type]:input[value="1"]').attr("checked", true);
		$('input:radio[name=dest_type]:input[value="2"]').attr("checked", false);
	}else{
		$('input:radio[name=dest_type]:input[value="1"]').attr("checked", false);
		$('input:radio[name=dest_type]:input[value="2"]').attr("checked", true);
	}
}

function allOff() {
	if(!$("input:checkbox[name='alloff']").is(":checked")){
		toastr.info('모든정보가 초기화 됩니다.');
		$("input:checkbox[name='cfb_flag']").prop("checked", false);
		$("input:checkbox[name='cfna_flag']").prop("checked", false);
		$("input:checkbox[name='cfu_flag']").prop("checked", false);
		$("input:checkbox[name='cfd_flag']").prop("checked", false);
	}
}

function setCfTable() {
	if($("#example2_wrapper").html()!=null){
		$("#example2_wrapper").remove();
		$("#tableInsert").html('<table id="example2" class="table table-bordered table-hover"></table>');
	}
	var html = '<thead><tr>'+
	'<th><input type="checkbox" name = "allCheck" onclick="allCheck3();"></th>'+
	'<th>NO.</th><th>착신번호</th>';
	
	var dest_no = "";
	var pCnt = 0;
	var editCfList = new Array();
	//all table 에서 최대 차수 구하기
	root:for(var a = 0; a < cfList.length; a++){
		if(pCnt<cfList[a].priority)pCnt = cfList[a].priority;
		if(editCfList.length===0){
			var jsonData = {
					dest_no : cfList[a].dest_no,
					priority : [cfList[a].priority],
					cf_type : [cfList[a].cf_type],
					altdst_no:[cfList[a].altdst_no]
			}
			editCfList.push(jsonData);
		}else{
			for(var aa = 0; aa<editCfList.length;aa++){
				if(editCfList[aa].dest_no==cfList[a].dest_no){
					editCfList[aa].priority.push(cfList[a].priority);
					editCfList[aa].cf_type.push(cfList[a].cf_type);
					editCfList[aa].altdst_no.push(cfList[a].altdst_no);
					continue root;
				}
			}
			var jsonData = {
					dest_no : cfList[a].dest_no,
					priority : [cfList[a].priority],
					cf_type : [cfList[a].cf_type],
					altdst_no:[cfList[a].altdst_no]
			}
			editCfList.push(jsonData);
		}
	}
	
	//최대값에 맞는 컬럼명 작성
	for(var a1=0; a1<pCnt; a1++){
		html+='<th>'+(a1+1)+'차 호 전환번호</th>';
	}
	
	//신규 row 작성
	html+='</tr></thead><tbody>';
	for(var a = 0; a < editCfList.length; a++){
		var jsonData = editCfList[a];
		html+='<tr><td><input type="checkbox" name="rowsCheck" id="rowsCheck" value="'+cfList[a].dest_no+'"></td>';
		html+='<td>'+(a+1)+'</td><td onclick="detailCF(\''+cfList[a].dest_no+'\');"><a href="#">'+cfList[a].dest_no+'</a></td>';
		for(var aa=0; aa < jsonData.cf_type.length; aa++){
			var type = jsonData.cf_type[aa];
			if(type=="1")type = "[무응답]";
			else if(type=="2")type = "[통화중]";
			else if(type=="3")type = "[장애시]";
			else if(type=="4")type = "[무조건]";
			
			var dest_no = jsonData.dest_no;
			var altdst_no = jsonData.altdst_no[aa];
			var priority = jsonData.priority[aa];
			
			html+='<td>'+altdst_no+type+'</td>';
		}
		var enCnt = pCnt - jsonData.cf_type.length;
		for(var a1=0; a1<enCnt; a1++){
			html+='<td></td>';
		}
		
		html+='</tr>';
	}
	html +='</tr></tbody>';
	
	$("#example2").html(html);
	$('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
      });
}

var itemCnt=2;
var itemMaxCnt=10;
function addITEM(){
	if(itemCnt>itemMaxCnt){
		toastr.error('더이상 추가할 수 없습니다.')
		return;
	}
	var itemName = "st"+itemCnt;
	var html = "";
	html  +='<div id="'+itemName+'" class="row">'+
			'<div class="col-12">'+
			'<div class="card">'+
			'<div class="card-header">'+
			'<h1 class="card-title"> '+itemCnt+'차 착신번호 </h1></div>'+
			'<div class="card-body" > <div class="form-group row">'+
			'<label style="margin-top: 5px;">착신조건</label><div class="col-4">'+
			'<select id="'+itemName+'_cf_type" name="'+itemName+'_cf_type"class="form-control form-control-sm">'+
			'<option value="0">선택하세요</option>'+
			'<option value="1">무응답</option>'+
			'<option value="2">통화중</option>'+
			'<option value="3">장애시</option>'+
			'<option value="4">무조건</option>'+
			'</select></div>'+
			'<label style="margin-top: 5px; margin-left: 20px;">전화번호</label>'+
			'<div class="col-4">'+
			'<select id="'+itemName+'_altdst_no" name="'+itemName+'_altdst_no" class="form-control form-control-sm">'+
			'</select></div></div></div></div></div></div>';
		
	$("#addItem").append(html);
	itemCnt++;
	$("#"+itemName+"_altdst_no").html(selectHt);
}

function delITEM() {
	if(itemCnt<=2){
		toastr.error('더이상 삭제할 수 없습니다.')
		return;
	}
	itemCnt--;
	var html = $("#st"+itemCnt+"").remove();
}

function detailCF(dest) {
	itiDetailCF();
	// 착신호 html 배치
	for(var a = 0; a < cfList.length; a++)
		if(dest==cfList[a].dest_no)if($("#st"+cfList[a].priority+"_cf_type").val()==null)addITEM();
		
	//배치와 동시에 넣으면 오류 따로 해야함.
	for(var a = 0; a < cfList.length; a++){
		if(dest==cfList[a].dest_no){
			$("#dest_no").val(cfList[a].dest_no);
			$("#st"+cfList[a].priority+"_cf_type").val(cfList[a].cf_type);
			$("#st"+cfList[a].priority+"_altdst_no").val(cfList[a].altdst_no);
			
		}
	}
}

function detailCFver1() {
	var dest = $("#dest_no").val();
	itiDetailCF();
	// 착신호 html 배치
	for(var a = 0; a < cfList.length; a++)
		if(dest==cfList[a].dest_no)if($("#st"+cfList[a].priority+"_cf_type").val()==null)addITEM();
		
	//배치와 동시에 넣으면 오류 따로 해야함.
	for(var a = 0; a < cfList.length; a++){
		if(dest==cfList[a].dest_no){
			$("#dest_no").val(cfList[a].dest_no);
			$("#st"+cfList[a].priority+"_cf_type").val(cfList[a].cf_type);
			$("#st"+cfList[a].priority+"_altdst_no").val(cfList[a].altdst_no);
			continue;
		}
		$("#dest_no").val(dest);
	}
}

var selectHt = "";
function itiDetailCF() {
	var destSelectList='<option value="0">선택하세요</option>';
	var html = '<div class="card-header"><h3 class="card-title">호 전환 상세설정</h3></div>'+
			   '<div class="card-body"><div class="row"><div class="col-12"><div class="card">'+
			   '<div class="card-header"><div class="form-group row"><label style="margin-top: 5px;">착신번호</label>'+
			   '<div class="col-4"><select id="dest_no" name="dest_no" class="form-control form-control-sm" onchange="detailCFver1();">'+
			   '</select></div><div class="col-5" style="margin-left: 10px;"><label style="margin-right: 10px;"> 설정 착신번호</label>'+
			   '<button type="button" class="btn btn-primary" onclick="addITEM()" style="margin-right: 5px;">추가</button>'+
			   '<button type="button" class="btn btn-default" onclick="delITEM()">삭제</button>'+
			   '</div></div></div></div></div></div>'+
			   '<div id = "addItem"><div id="st1" class="row"><div class="col-12"><div class="card">'+
			   '<div class="card-header"><h1 class="card-title">1차 착신번호</h1></div>'+
			   '<div class="card-body" ><div class="form-group row"><label style="margin-top: 5px;">전환조건</label>'+
			   '<div class="col-4"><select id = "st1_cf_type" name = "st1_cf_type" class="form-control form-control-sm">'+
			   '<option value="0">선택하세요</option><option value="1">무응답</option><option value="2">통화중</option>'+
			   '<option value="3">장애시</option><option value="4">무조건</option></select></div>'+
			   '<label style="margin-top: 5px; margin-left: 20px;">전화번호</label><div class="col-4">'+
			   '<select id="st1_altdst_no" name="st1_altdst_no" class="form-control form-control-sm"></select>'+
			   '</div></div></div></div></div></div></div>'+
			   '<div class="card-footer" style="text-align: center; background-color:#ffffff">'+
			   '<button type="button" class="btn btn-block btn-primary btn-lg" style="width: 20%; display: inline;" onclick="inserCfAjax();">적용</button>'+
			   '<button type="button" class="btn btn-block btn-default btn-lg" style="width: 20%; display: inline; margin-top: 0px;">취 소</button>'+
			   '</div></div></div>';
	
	$("#detailCF").html(html);
	itemCnt = 2;
	for(var a=0; a < destList.length; a++)
		destSelectList +='<option value="'+destList[a].dest_no+'">'+destList[a].dest_no+'</option>';
	
	selectHt = destSelectList;
	$("#dest_no").html(destSelectList);
	$("#st1_altdst_no").html(destSelectList);
}

function setOctTable(){
	if($("#example2_wrapper").html()!=null){
		$("#example2_wrapper").remove();
		$("#tableInsert").html('<table id="example2" class="table table-bordered table-hover"></table>');
	}
	
	var html = '<thead><tr><th><input type="checkbox" name="allCheck" onclick="allCheck2();"></th>'+
		'<th>NO.</th><th>발신지</th><th>일정</th><th>착신번호</th><th>호 분배율</th></tr></thead><tbody>';
	
	if(otcList.length===0)
		html+="<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>";
	
	for(var a=0; a<otcList.length; a++){
		html+="<tr><td><input type='checkbox' name='rowsCheck' ></td><td>"+(a+1)+"</td>";
		
		//발신지 정보
		otcList[a].area_code==null?html +="<td></td>":html+="<td><a href='#' onclick='setOtcDetail(\""+a+"\")'> " 
				+otcList[a].area_code+"</a></td>";
		
		//일정 정보
		otcList[a].day_name==null?html +="<td></td>":html+="<td><a href='#' onclick='setOtcDetail(\""+a+"\")'> " 
				+otcList[a].day_name+"</a></td>";
		
		//dest_no 정보
		otcList[a].dest_no==null?html +="<td></td>":html+="<td><a href='#' onclick='setOtcDetail(\""+a+"\")'> " 
				+otcList[a].dest_no+"</a></td>";
		
		//cd_rate 정보
		otcList[a].cd_rate==null?html +="<td></td>":html+="<td><a href='#' onclick='setOtcDetail(\""+a+"\")'> " 
				+otcList[a].cd_rate+"%</a></td>";
	}
	html+="</tr></tbody>"
	
	$("#example2").html(html);
    $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
      });
	setOtcSetting();
}

function setOtcSetting() {
	var st = $(":input:radio[name=tdr_name]:checked").val();
	$("#editArea").html($("#type_"+st).html());
	
    $('.slider').bootstrapSlider();
    $('#range_1').ionRangeSlider({
        min     : 0,
        max     : 100,
        type    : 'single',
        step    : 10,
        postfix : ' %',
        prettify: false,
        hasGrid : true
      });
}

function setAreaZone(){
	var html = "<option value='all'>전체</option>";
	
	for(var a=0; a<ocgList.length; a++)
		html+="<option value='"+ocgList[a].zone_name+"'>"+ocgList[a].zone_name+"</option>";
		
	$("#gungu").html(html);

}

function addOCG() {
	$("#gungu").html(html);
	
}

function setOtcDetail() {
	var st = $(":input:radio[name=tdr_name]:checked").val();
	
}

function setTimeDetail(timeD) {
	if(timeD.time_name1!=null){
		$("input[name='starttime1']").val(timeD.starttime1);
		$("input[name='endtime1']").val(timeD.endtime1);
		$("#time_name1").val(timeD.time_name1);
	}
	
	if(timeD.time_name2!=null){
		$("input[name='starttime2']").val(timeD.starttime2);
		$("input[name='endtime2']").val(timeD.endtime2);
		$("#time_name2").val(timeD.time_name2);
	}
	
	if(timeD.time_name3!=null){
		$("input[name='starttime3']").val(timeD.starttime3);
		$("input[name='endtime3']").val(timeD.endtime3);
		$("#time_name3").val(timeD.time_name3);
	}
	
	if(timeD.time_name4!=null){
		$("input[name='starttime4']").val(timeD.starttime4);
		$("input[name='endtime4']").val(timeD.endtime4);
		$("#time_name4").val(timeD.time_name4);
	}
	
	if(timeD.time_name5!=null){
		$("input[name='starttime5']").val(timeD.starttim5);
		$("input[name='endtime5']").val(timeD.endtime5);
		$("#time_name5").val(timeD.time_name5);
	}
	
	if(timeD.time_name6!=null){
		$("input[name='starttime6']").val(timeD.starttime6);
		$("input[name='endtime6']").val(timeD.endtime6);
		$("#time_name6").val(timeD.time_name6);
	}
	
	if(timeD.time_name7!=null){
		$("input[name='starttime7']").val(timeD.starttime7);
		$("input[name='endtime7']").val(timeD.endtime7);
		$("#time_name7").val(timeD.time_name7);
	}
	
	if(timeD.time_name8!=null){
		$("input[name='starttime8']").val(timeD.starttime8);
		$("input[name='endtime8']").val(timeD.endtime8);
		$("#time_name8").val(timeD.time_name8);
	}
	
	if(timeD.time_name9!=null){
		$("input[name='starttime9']").val(timeD.starttime9);
		$("input[name='endtime9']").val(timeD.endtime9);
		$("#time_name9").val(timeD.time_name9);
	}
	
	if(timeD.time_name10!=null){
		$("input[name='starttime10']").val(timeD.starttime10);
		$("input[name='endtime10']").val(timeD.endtime10);
		$("#time_name10").val(timeD.time_name10);
	}
}



function setTimeTR(){
	$("input[id='starttime']").each(function (i){
		var data = $("input[id='starttime']").eq(i).val().replace(":","");
		$("input[id='starttime']").eq(i).val(data);
		data = $("input[id='endtime']").eq(i).val().replace(":","");
		$("input[id='endtime']").eq(i).val(data);
	});
}























function setDayDetail(list){
	$("input[name='day_names']").each(function (i){
		if(list[i]!=null)$("input[name='day_names']").eq(i).val(list[i].day_name);
	});
}

function setBWList(){
	//허용일때
	if($('input:radio[name=ocs_type]:checked').val()=="1")selectWhiteAjax();
	//차단일때
	else if($('input:radio[name=ocs_type]:checked').val()=="2")selectOcsAjax();
	
	else {
		selectNoneAjax();
	}
}

function setBWListTable(type){
	var html = "";
	if($("#example2_wrapper").html()!=null){
		$("#example2_wrapper").remove();
		$("#tableInsert").html('<table id="example2" class="table table-bordered table-hover"></table>');
	}
	var html = '<thead><tr>'+
	'<th><input type="checkbox" name = "allCheck" onclick="allCheck3();"></th>'+
	'<th>NO.</th><th>착신번호</th></thead><tbody>';
	if(type=="white"){
		for(var a=0; a<whiteList.length; a++){
			html+='<tr><td><input type="checkbox" name="rowsCheck" id="rowsCheck" value="'+whiteList[a].white_no+'"></td>';
			html +="<td>" + (a+1) +"</td><td>" +whiteList[a].white_no+"</td></tr>";
		}
	}else{
		for(var a=0; a<ocsList.length; a++){
			html+='<tr><td><input type="checkbox" name="rowsCheck" id="rowsCheck" value="'+ocsList[a].ocs_no+'"></td>';
			html +="<td>" + (a+1) +"</td><td>" +ocsList[a].ocs_no+"</td></tr>";
		}
	}
	html+='</tbody>';
	$("#example2").html(html);
    $('#example2').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
      });
}

function addBWNumber(){
	//허용일때
	if($('input:radio[name=ocs_type]:checked').val()=="1")insertBWAjax("1");
	//차단일때
	else if($('input:radio[name=ocs_type]:checked').val()=="2")insertBWAjax("2");
	
	else toastr.error('설정된 정보를 확인하세요.');
	
}

