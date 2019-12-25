function maxLengthCheck(object) {
	if (object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}

function setDestSelectOption(id){
	var html = "";
	
	
	$("#"+id).html();
	
	
}

function allCheck(){
	var tt=$("input:checkbox[name=allCheck]").is(":checked")
	$("input[name=rowsCheck]:checkbox").each(function() {
		if(tt)$(this).attr("checked", true);
		else $(this).attr("checked", false);
	});
}

function allCheck2(){
	var tt=$("input:checkbox[name=allCheck]").is(":checked")
	$("input[name=rowsCheck]:checkbox").each(function() {
		if(tt)$(this).attr("checked", true);
		else $(this).attr("checked", false);
	});
}

function allCheck3(){
	var tt=$("input:checkbox[name=allCheck]").is(":checked")
	$("input[name=rowsCheck]:checkbox").each(function() {
		if(tt)$(this).attr("checked", true);
		else $(this).attr("checked", false);
	});
}

function getCheck(){
	var data = "";
	 $('input:checkbox[name="rowsCheck"]').each(function() {
		 if(this.checked){
			 if(data=="")data = this.value;
			 else data += ","+ this.value;
		 }
	 });
	 return data;
}
