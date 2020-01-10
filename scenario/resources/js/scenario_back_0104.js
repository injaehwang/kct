var scenarioData = {};
var watchRowData = {};
var $scenarioListBox = $('#scenarioListBox');

var callBtnArray = ['0','1','2','3','4','5','6','7','8','9'];
var $numberOptions = null; // 0~9;
var $callNumberListoptions = null;
var $callSongListoptions = null;
var $coloringListoptions = null;

function scenarioInit(){

   // 시나리오 목록 조회
   retrieveScenarioList();

   // 전화번호 조회
   retrieveCallNumberList();

   // 음원 조회, 컬러링 조회
   retrieveCallSongList();

   // 이벤트 바인딩
   eventBind();

   // 0~9 option tag 만들기
   $templateSelectOptions = templateSelectOptions(
      [{value: 0, label: 0}, {value: 1, label: 1}, {value: 2, label: 2}, {value: 3, label: 3}, {value: 4, label: 4}, {value: 5, label: 5}, {value: 6, label: 6}, {value: 7, label: 7}, {value: 8, label: 8}, {value: 9, label: 9}],
      '선택'
   );

}

/**
 * 전화번호 조회
 */
function retrieveCallNumberList(){
   $.ajax({
      type: "POST",
      url: "/dest/ls",
      dataType:"json",
      contentType: "application/json; charset=UTF-8",
      success: function(result) {
         scenarioData.callNumbers = [];
         result.forEach(function(e){
            if(!isNaN(+e.dest_no)){
               scenarioData.callNumbers.push({label: e.dest_no, value: e.dest_no, data: e});
            }
         })
         $callNumberListoptions = templateSelectOptions(scenarioData.callNumbers);
      },
      error: function (error) {
         toastr.error('작신번호 정보가 잘못되었습니다.')
      }
   });

   // // 가짜 데이터 - 황인재 쪽 에서 이재형 과장님쪽 rest 요청이 cors 로 안될때 붙이는 코드
   var result = JSON.parse('[{"ua_no":"18771000","dest_no":"07011112222","dest_name":null,"dest_type":"2","cfu_flag":"1","cfb_flag":"1","cfna_flag":"1","cfd_flag":"0"},{"ua_no":"18771000","dest_no":"07012345678","dest_name":null,"dest_type":"1","cfu_flag":"0","cfb_flag":"1","cfna_flag":"1","cfd_flag":"0"},{"ua_no":"18771000","dest_no":"ARS_001","dest_name":null,"dest_type":"2","cfu_flag":"0","cfb_flag":"0","cfna_flag":"0","cfd_flag":"0"}]');
   scenarioData.callNumbers = [];
   result.forEach(function(e){
      if(!isNaN(+e.dest_no)){
         scenarioData.callNumbers.push({label: e.dest_no, value: e.dest_no, data: e});
      }
   })
   $callNumberListoptions = templateSelectOptions(scenarioData.callNumbers);

}

/**
 * 음원 조회
 */
function retrieveCallSongList(){
   $.ajax({
      type: "POST",
      url: "/ars/als",
      dataType:"json",
      contentType: "application/json; charset=UTF-8",
      success: function(result) {
         scenarioData.callSongs = [];
         scenarioData.colorings = [];
         console.log(result);
         result.forEach(function(e){
            scenarioData.callSongs.push({label: e.ann_name, value: e.user_num, data: e});
            scenarioData.colorings.push({label: e.user_num, value: e.user_num, data: e});
         });
         $callSongListoptions = templateSelectOptions(scenarioData.callSongs);
         $coloringListoptions = templateSelectOptions(scenarioData.colorings);
      },
      error: function (error) {
         toastr.error('작신번호 정보가 잘못되었습니다.')
      }
   });

   // 가짜 데이터 - 황인재 쪽 에서 이재형 과장님쪽 rest 요청이 cors 로 안될때 붙이는 코드
   var result = JSON.parse('[{"ann_no":"1","user_num":"18771000","ann_name":"test","ann_desc":"시험중입니다","ann_type":"1","timestamp":"2019-12-26 21:21:31.0"},{"ann_no":"2","user_num":"18771000","ann_name":"test2","ann_desc":"시험중","ann_type":"2","timestamp":"2019-12-26 21:21:49.0"}]');
   scenarioData.callSongs = [];
   scenarioData.colorings = [];
   console.log(result);
   result.forEach(function(e){
      scenarioData.callSongs.push({label: e.ann_name, value: e.user_num, data: e});
      scenarioData.colorings.push({label: e.user_num, value: e.user_num, data: e});
   });
   $callSongListoptions = templateSelectOptions(scenarioData.callSongs);
   $coloringListoptions = templateSelectOptions(scenarioData.colorings);
   
}

/**
 * 시나리오 목록 기능
 */
function retrieveScenarioList(){

   $.ajax({
      type: "POST",
      url: "/ars/sls",
      dataType:"json",
      contentType: "application/json; charset=UTF-8",
      success: function(result) {
         setScenarioList(result);
      },
      error: function (error) {
         toastr.error('작신번호 정보가 잘못되었습니다.')
      }
   });

   // // 가짜 데이터 - 황인재 쪽 에서 이재형 과장님쪽 rest 요청이 cors 로 안될때 붙이는 코드
   setScenarioList();

}


function setScenarioList( data ){
   
   $scenarioListBox.html( templateScenario(data) );

}

function templateScenario(data){
   
   // 임시 tempdata
   var data = data || JSON.parse('[{"ua_no":"18771000","ars_id":"00000001","ars_name":"QWEEEQ_Test","ann_id":"1","ann_name":"test","timestamp":"2019-12-22 00:48:15.0"}]');
   
   var html = '';
   for(var i=0; i<data.length; i++){
      var d = data[i];
      html += '<tr class="scenarioListRow" data-ars_id="' +  d.ars_id + '" data-ars_name="' + d.ars_name + '">';
      html += '   <td><input class="delRow" type="checkbox" /></td>';
      html += '   <td>'+ (i+1) +'</td>';
      html += '   <td>' + d.ann_name + '</td>';
      html += '   <td>' + d.timestamp + '</td>';
      html += '   <td class="text-center">';
      html += '      <button class="btn-down retrieveScenarioRow expand"><i class="fas fa-plus-circle"></i></button>';
      html += '      <button class="btn-down retrieveScenarioRow fold"><i class="fas fa-minus-circle"></i></button>';
      html += '   </td>';
      html += '</tr>';
      html += '<tr class="scenarioDetailRow" data-ars_id="' + d.ars_id + '">';

      html += '<td colspan="5" class="bg-gray-point add-row">';
      html += '   <div class="step-box-wrapper">';
      html += '      <table class="step-box-table">';
      html += '         <thead class="">';
      html += '               <tr class="step-box thead-box">';
      html += '                  <th class="badge-box">단계</th>';
      html += '                  <th class="number">번호</th>';
      html += '                  <th class="number-name">번호명</th>';
      html += '                  <th class="number-type">착신유형</th>';
      html += '                  <th class="select-recept">착신정보</th>';
      html += '                  <th class="btn-functions">단계 기능</th>';
      html += '               </tr>';
      html += '         </thead>';
      // html += '         <tbody class="setting-box"></tbody>';
      html += '      </table>';
      html += '   </div>';

      html += '   <div class="add-step-box">';
      html += '      <button class="btn btn-primary addStep"><i class="fas fa-plus"></i>  단계 추가</button>';
      html += '   </div>';

      html += '   </div>';
      html += '   <div class="adviser-box">';
      html += '      <div class="row">';
      html += '            <div class="col-md-12 col-xs-12 text-center">';
      html += '               <button class="btn btn-primary btn-sm stepApplySave">적용</button>';
      html += '               <button class="btn btn-danger btn-sm stepApplyCancel">취소</button>';
      html += '            </div>';
      html += '      </div>';
      html += '   </div>';
      
      html += '</td>';

      html += '</tr>';
   }

   return html;

}


/**
 * 시나리오 목록 - 상세 기능
 */
function retrieveScenarioRow(ars_name, ars_id){

   console.log( ars_name );
   console.log( ars_id );

   $.ajax({
      type: "POST",
      url: "/ars/sls",
      dataType:"json",
      data: JSON.stringify({ars_name:ars_name,ars_id:ars_id}),
      contentType: "application/json; charset=UTF-8",
      success: function(data) {
         setScenarioRow(ars_id, data);
      },
      error: function (error) {
         toastr.error('작신번호 정보가 잘못되었습니다.')
      }
   });
   // // 가짜 데이터 - 황인재 쪽 에서 이재형 과장님쪽 rest 요청이 cors 로 안될때 붙이는 코드
   setScenarioRow(ars_id, null);

}

/**
 * 시나리오 항목 초기화
 */
function scenarioRefresh(){
   $('tr.scenarioDetailRow.on .step-box-table tbody', $scenarioListBox).remove();
   $('tr.scenarioDetailRow.on', $scenarioListBox).removeClass('on');
}

function setScenarioRow( ars_id, data ){
   
   scenarioRefresh();

   var $targetTr = $('tr.scenarioDetailRow[data-ars_id=' + ars_id + ']', $scenarioListBox ).addClass('on');
   var $targetTrSettingTable = $('table', $targetTr );
      
   var data = data || JSON.parse('[{"ua_no":"18771000","ars_name":"QWEEEQ_Test","ars_id":"QWEEEQ_Test","first_depth_digit":"1","first_digit_name":null,"first_dest_type":"1","first_dest_no":"07012345678","first_ann_id":"2","second_depth_digit":"1","second_digit_name":null,"second_dest_type":"1","second_dest_no":"07011112222","second_ann_id":"1","third_depth_digit":"0","third_digit_name":null,"third_dest_type":null,"third_dest_no":null,"third_ann_id":null},{"ua_no":"18771000","ars_name":"QWEEEQ_Test","ars_id":"QWEEEQ_Test","first_depth_digit":"1","first_digit_name":null,"first_dest_type":"1","first_dest_no":"07012345678","first_ann_id":"2","second_depth_digit":"2","second_digit_name":null,"second_dest_type":"1","second_dest_no":"07011112222","second_ann_id":"1","third_depth_digit":"","third_digit_name":null,"third_dest_type":null,"third_dest_no":null,"third_ann_id":null}]');
   console.log(data);
   var parseData = {};
   
   data.forEach(function(d){

      if(+d.first_depth_digit > -1){
         parseData[d.first_depth_digit] = {
            ua_no: d.ua_no,
            ars_name: d.ars_name,
            ars_id: d.ars_id,
            depth_digit: d.first_depth_digit,
            digit_name: d.first_digit_name,
            dest_type: d.first_dest_type,
            dest_no: d.first_dest_no,
            ann_id: d.first_ann_id,
            children : (d.first_depth_digit in parseData) ? $.extend(parseData[d.first_depth_digit].children, {}) : {}
         };   
         if(+d.second_depth_digit > -1){
            parseData[d.first_depth_digit].children[d.second_depth_digit] = {
               depth_digit: d.second_depth_digit,
               digit_name: d.second_digit_name,
               dest_type: d.second_dest_type,
               dest_no: d.second_dest_no,
               ann_id: d.second_ann_id,
               children : (d.second_depth_digit in parseData[d.first_depth_digit].children) ? $.extend(parseData[d.first_depth_digit].children[d.second_depth_digit].children, {}) : {}
            };
            if(+d.third_depth_digit > -1){
               parseData[d.first_depth_digit].children[d.second_depth_digit].children[d.third_depth_digit] = {
                  depth_digit: d.third_depth_digit,
                  digit_name: d.third_digit_name,
                  dest_type: d.third_dest_type,
                  dest_no: d.thirrd_dest_no,
                  ann_id: d.third_ann_id
               };
            }
         }
      }
      
   })

   watchRowData = $.extend({}, parseData);

   $('tbody', $targetTrSettingTable).remove();
   $targetTrSettingTable.append( '<tbody class="setting-box">' + templateScenarioRow( parseData ) + '</tbody>' );
   $('select', $targetTrSettingTable).each(function(){
      var $t = $(this);
      var v = $t.attr('value');
      $('option[value="' + v + '"]', $t).attr('selected', 'selected');
   })

   if( Object.keys(watchRowData).length > 9 ){
      $('.addStep', $scenarioListBox).addClass('disabled');
   }else{
      $('.addStep', $scenarioListBox).removeClass('disabled');
   }
   
   
}

function templateSelectOptions( data, init ){
   var optionHtml = '';
   if(init) optionHtml += '<option value="-1">' + init + '</option>';
   data.forEach(function(e){
      optionHtml += '<option value="' + e.value + '">' + e.label + '</option>';
   })
   return optionHtml;
}

function templateStep(step, data, basicSelect){
   // console.log(basicSelect);
   // var stepHtml = '<tbody class="setting-box">';
   var stepHtml = '';
   // stepHtml += '<tr class="step-box step-' + step + ' adviser-selected">';
   stepHtml += '<tr class="step-box step-' + step + '" data-step="' + step + '">';
   stepHtml += '   <td class="badge-box">';
   stepHtml += '      <div class="adviser-status"><button><i class="fas fa-phone"></i></button></div>';
   stepHtml += '      <span class="badge badge-success text-sm">' + step + '단계</span>';
   stepHtml += '      <input type="hidden" name="step" value="' + step + '">';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number">';
   // stepHtml += '      <select class="form-control form-control-sm" name="depth_digit" value="' + (basicSelect ? basicSelect : data.depth_digit) + '">';
   stepHtml += '      <select class="form-control form-control-sm" name="depth_digit" value="' + (data.depth_digit) + '">';
   stepHtml += $templateSelectOptions;
   stepHtml += '      </select>';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number-name">';
   stepHtml += '      <input type="text" class="form-control form-control-sm" name="digit_name" value="' + data.digit_name + '">';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number-type">';
   stepHtml += '      <select class="form-control form-control-sm calltype-select" name="dest_type">';
   stepHtml += '            <option value="1" ' + ((data.dest_type == 1) ? "selected" : "") + '>전화번호</option>';
   stepHtml += '            <option value="2" ' + ((data.dest_type == 2) ? "selected" : "") + '>안내방송</option>';
   stepHtml += '      </select>';
   stepHtml += '   </td>';
   stepHtml += '   <td class="select-recept" data-selectType="select-' + data.dest_type + '">';

   stepHtml += '      <select class="form-control form-control-sm callType" name="dest_no" value="' + data.dest_no +  '">';
   stepHtml +=          $callNumberListoptions;
   stepHtml += '      </select>';

   stepHtml += '      <select class="form-control form-control-sm introType" name="coloring_ua_no" value="' + data.ua_no +  '">';
   stepHtml +=          $coloringListoptions;
   stepHtml += '      </select>';

   stepHtml += '      <select class="form-control form-control-sm introType" name="callsong_ua_no" value="' + data.ua_no +  '">';
   stepHtml +=          $callSongListoptions;
   stepHtml += '      </select>';

   stepHtml += '   </td>';
   stepHtml += '   <td class="btn-functions">';
   stepHtml += '      <button class="btn-function btn-down" data-step="' + step + '"><i class="fas fa-arrow-down"></i></button>';
   stepHtml += '      <button class="btn-function btn-minus" data-step="' + step + '"><i class="fas fa-minus"></i></button>';
   // stepHtml += '      <button class="btn-function btn-adv-setting cancelable"><i class="fas fa-phone-slash"></i></button>';
   // stepHtml += '      <button class="btn-function btn-adv-setting"><i class="fas fa-phone"></i></button>';
   stepHtml += '   </td>';
   stepHtml += '</tr>';
   // stepHtml += '</tbody>';
   return stepHtml;
}


function templateScenarioRow(parseData){
   console.log(parseData);
   var html = '';
   for (var key in parseData) {
         var firstData = parseData[key];
         html += '<tbody class="setting-box" data-originIdx="' + firstData.depth_digit + '">';
         html += templateStep(1, firstData);

         for (var key in firstData.children){
            var secondData = firstData.children[key];
            html += templateStep(2, secondData);
          
            for (var key in secondData.children){
               var thirdData = secondData.children[key];
               html += templateStep(3, thirdData);
               
            }

         }
         html += '</tbody>';
         html += '<tbody class="spacer"><tr><td colspan="7"></td></tr></tbody>';
         
   }

   return html;

}

/**
 * 삭제 가능버튼 노출 여부 
 */
function deletableCheck(){
   $('tr.step-box.step-1', $scenarioListBox).each(function(){
      var $t = $(this);
      !$t.next().length ? $t.addClass('deletable') : $t.removeClass('deletable');
   });
   $('tr.step-box.step-2', $scenarioListBox).each(function(){
      var $t = $(this);
      (!$t.next().is('.step-3') || !$t.next().length) ? $t.addClass('deletable') : $t.removeClass('deletable');
   });
}

/**
 * 단계 선택번호 필터링
 */
function stepFilter(step, $parent){
   var usedNums = [];
   var validate = true;
   var $p = $parent;
   if(step == 3){
      $p = $parent.prevUntil('.step-2').add($parent).add( $parent.nextUntil('.step-2') );
   }

   $( step < 3 ? '.step-' + step + ' td.number select' : 'td.number select', $p).each(function(){
      var v = $(this).val();

      if(v > 0){
         if( usedNums.indexOf( $(this).val() ) < 0 ){
            usedNums.push($(this).val());
         }else{
            validate = false;
         }
      }
   })
   return validate;
}

/**
 * 저장시 유효성 검사
 */
function saveValidateCheck(o){
   var validate = true;
   o.forEach(function(e){
      if(e.depth_digit < 0 || !e.digit_name) validate = false;
   })
   return validate;
}

/**
 * 이벤트 바인딩
 */

function eventBind(){
   
   $(document)

   // row 에서 설정 아이콘 클릭시 상세 정보 조회
   .on('click', '.retrieveScenarioRow.expand', function(){
      var $t = $(this);
      var tr = $t.closest('tr');
      retrieveScenarioRow( tr.attr('data-ars_name'), tr.attr('data-ars_id') );
      deletableCheck();
      $('tr.scenarioListRow.expand', $scenarioListBox).removeClass('expand');      
      tr.addClass('expand');
   })
   
   // 취소
   .on('click', '.retrieveScenarioRow.fold, .stepApplyCancel', function(){
      var $t = $(this);
      var tr = $t.closest('tr');
      $('tr.scenarioDetailRow.on .step-box-table tbody', $scenarioListBox).remove();
      $('tr.scenarioDetailRow.on', $scenarioListBox).removeClass('on');

      $('tr.scenarioListRow.expand', $scenarioListBox).removeClass('expand');
      tr.removeClass('expand');
   })

   // 착신유형 변경
   .on('change', '.calltype-select', function(){
      var $t = $(this);
      $('.select-recept', $t.closest('tr')).attr('data-selecttype', 'select-' + this.value);
   })

   // 단계 추가
   .on('click', '.addStep', function(){
      console.log('단계추가');

      var $t = $(this);

      if($t.is('.disabled')){
         alert('단계를 더이상 추가하실 수 없습니다 (1단계 최대 10개)');
         // toastr.error('단계를 더이상 추가하실 수 없습니다 (1단계 최대 10개)');
         return false;
      }
      var arsId = $t.closest('tr.scenarioDetailRow').attr('data-ars_id');
      var ableIndex = _.difference(callBtnArray , Object.keys(watchRowData));
      var thisIndex = ableIndex[0];
      var $newStep1 = $(
         '<tbody class="setting-box" data-originIdx="' + thisIndex + '">'
         + templateStep(1, {depth_digit: -1, digit_name: null, dest_type: 1, dest_no: 0, ua_no: 0}) 
         + '</tbody><tbody class="spacer"><tr><td colspan="7"></td></tr></tbody>'
      );

      // $('tr.step-1 .number select', $newStep1).val( thisIndex ).trigger('change')
      $('tr.scenarioDetailRow.on table.step-box-table').append( $newStep1 );

      watchRowData[thisIndex] = {};

      if( Object.keys(watchRowData).length > 9 ){
         $(this).addClass('disabled');
      }

      deletableCheck();
   })

   // 적용
   .on('click', '.stepApplySave', function(){
      console.log('적용');
      
      var getData = [];
      $('tr.scenarioDetailRow.on .step-box-table tbody:not(.spacer) tr').each(function(){
         var $t = $(this);
         var $form = $('<form><table></table></form>');
         $('table', $form).append( $t.clone() );

         getData.push( $form.serializeObject() );
      });

      if( !saveValidateCheck(getData) ){
         alert('모든 번호와 번호명을 입력해 주세요.');
         return false;
      }

      // first, second, third - prefix
      var stepStr = ['first_', 'second_', 'third_'];
      var saveData = [];
      getData.forEach(function(e){
         
         var deparse = {};
         var preStr = stepStr[e.step-1];
         deparse[ preStr + 'depth_digit' ] = e.depth_digit;
         deparse[ preStr + 'digit_name' ] = e.digit_name;
         deparse[ preStr + 'dest_type' ] = e.dest_type;
         deparse[ preStr + 'dest_no' ] = e.dest_no;
         deparse['coloring_ua_no'] = e.coloring_ua_no;
         deparse['callsong_ua_no'] = e.callsong_ua_no;
         
         saveData.push(deparse);
      })

      console.log( saveData );

   })

   .on('click', 'button.btn-function.btn-down', function(){

      // 단계 스텝 추가
      var $t = $(this);
      var thisStep = $t.attr('data-step');
      var nextStepClass = 'thisStep-'+(+thisStep+1);
      var $newStep = $(templateStep(+thisStep+1, {depth_digit: -1, digit_name: null, dest_type: 1, dest_no: 0, ua_no: 0}))
      var $targetTr = $t.closest('tr').nextUntil('tr.step-box.step-'+(+thisStep+2)).first();

      $targetTr.length ? $targetTr.before( $newStep ) : $t.closest('tr').after($newStep);
      deletableCheck();

   })
   
   .on('click', 'button.btn-function.btn-minus', function(){

      // 단계 스텝 삭제
      var $t = $(this);
      var thisStep = $t.attr('data-step');
      // $t.closest('tr').remove();

      if(thisStep<3){
         // console.log('remove all!');
      }

      switch(thisStep){
         case '1':
            var $tb = $t.closest('tbody');
            $tb.next('tbody.spacer').remove();
            $tb.remove();
            delete watchRowData[$tb.attr('data-originidx')];

            if( Object.keys(watchRowData).length <= 9 ){
               $('tr.scenarioDetailRow.on .addStep', $scenarioListBox).removeClass('disabled');
            }
            
            break;
         case '2':
            $t.closest('tr').nextUntil('tr.step-box.step-'+(+thisStep)).remove();
            break;
      }


      $t.closest('tr').remove();
      deletableCheck();

      

   })

   // 단계 선택
   .on('change', 'select', function(){
      var $t = $(this);
      var v = $t.val();
      $('option[value="' + v + '"]', $t).attr('selected', 'selected').prop('selected', true).siblings().removeAttr('selected');
      
   })

   .on('change', '.step-box td.number select', function(){
      var $t = $(this);
      var v = $t.val();
      var originVal = $t.attr('value');
      var thisStep = $t.closest('tr.step-box').attr('data-step'); 

      $('option[selected="selected"]', $t).removeAttr('selected');

      if( v > 0){
         var $closest = thisStep == 1 ? $t.closest('table.step-box-table') : (thisStep == 2 ? $t.closest('tbody.setting-box') : $t.closest('tr') );
         var stepChk = stepFilter( thisStep,  $closest);

         if(stepChk){
            $t.attr('value', v);
            $('option[value="' + v + '"]', $t).attr('selected', 'selected').prop('selected', true);
         }else{
            alert(v + '은 이미 사용하고 있는 번호 입니다');
            setTimeout(function(){
               console.log(originVal);
               $('option[selected="selected"]', $t).removeAttr('selected');
               $('option[value="' + originVal + '"]', $t).attr('selected', 'selected').prop('selected', true);
            },100)
            
         }
      }else{
         $t.attr('value', v);
         $('option[value="' + v + '"]', $t).attr('selected', 'selected').prop('selected', true);
      }
      // console.log(stepChk);
   })

   // check list
   .on('change', '.checkAll', function(){
      var $t = $(this);
      $('tr > td:first-child input', $t.closest('thead').next()).prop('checked', $t.is(':checked'));
   })

   // delete list
   .on('click', '.deleteScenarioRow', function(){
      var deleteList = [];
      $('#scenarioListTable tbody tr').each(function(){
         var $t = $(this);
         if( $('.delRow', $t).is(':checked') ){
            deleteList.push({
               arsid: $t.attr('data-ars_id'),
               arsname: $t.attr('data-ars_name')
            });
         }
      })

      if(!deleteList.length){
         alert('select delete row!!');
      }else{
         console.log(deleteList);
      }

      console.log('deleteAnnList!!!');

   })
}

