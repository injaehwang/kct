var scenarioData = {};
var $scenarioListBox = $('#scenarioListBox');

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
   $templateSelectOptions = templateSelectOptions([{value: 0, label: 0}, {value: 1, label: 1}, {value: 2, label: 2}, {value: 3, label: 3}, {value: 4, label: 4}, {value: 5, label: 5}, {value: 6, label: 6}, {value: 7, label: 7}, {value: 8, label: 8}, {value: 9, label: 9}]);

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
         var result = JSON.parse('[{"ua_no":"18771000","dest_no":"07011112222","dest_name":null,"dest_type":"2","cfu_flag":"1","cfb_flag":"1","cfna_flag":"1","cfd_flag":"0"},{"ua_no":"18771000","dest_no":"07012345678","dest_name":null,"dest_type":"1","cfu_flag":"0","cfb_flag":"1","cfna_flag":"1","cfd_flag":"0"},{"ua_no":"18771000","dest_no":"ARS_001","dest_name":null,"dest_type":"2","cfu_flag":"0","cfb_flag":"0","cfna_flag":"0","cfd_flag":"0"}]');
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

   // 임시
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
         var result = JSON.parse('[{"ann_no":"1","user_num":"18771000","ann_name":"test","ann_desc":"시험중입니다","ann_type":"1","timestamp":"2019-12-26 21:21:31.0"},{"ann_no":"2","user_num":"18771000","ann_name":"test2","ann_desc":"시험중","ann_type":"2","timestamp":"2019-12-26 21:21:49.0"}]');
         scenarioData.callSongs = [];
         scenarioData.colorings = [];
         result.forEach(function(e){
            scenarioData.callSongs.push({label: e.ann_name, value: e.ann_no, data: e});
            scenarioData.colorings.push({label: e.user_num, value: e.user_num, data: e});
         });
         $callSongListoptions = templateSelectOptions(scenarioData.callNumbers);
      },
      error: function (error) {
         toastr.error('작신번호 정보가 잘못되었습니다.')
      }
   });

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
      html += '   <td>'+ (i+1) +'</td>';
      html += '   <td>' + d.ann_name + '</td>';
      html += '   <td>' + d.timestamp + '</td>';
      html += '   <td class="text-center">';
      html += '      <button class="btn-down retrieveScenarioRow"><i class="fas fa-plus-circle"></i></button>';
      html += '   </td>';
      html += '</tr>';
      html += '<tr class="scenarioDetailRow" data-ars_id="' + d.ars_id + '">';

      html += '<td colspan="4" class="bg-gray-point add-row">';
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
      html += '                  <th class="cs-info">상담원 연결 번호</th>';
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
   // 임시
   setScenarioRow(ars_id, null);

}

function setScenarioRow( ars_id, data ){
   var $targetTr = $('tr.scenarioDetailRow[data-ars_id=' + ars_id + ']', $scenarioListBox ).addClass('on');
   var $targetTrSettingTable = $('table', $targetTr );
   
   
   var data = data || JSON.parse('[{"ua_no":"18771000","ars_name":"QWEEEQ_Test","ars_id":"00000001","first_depth_digit":"1","first_digit_name":null,"first_dest_type":"1","first_dest_no":"07012345678","first_ann_id":null,"second_depth_digit":"0","second_digit_name":null,"second_dest_type":null,"second_dest_no":null,"second_ann_id":null,"third_depth_digit":"0","third_digit_name":null,"third_dest_type":null,"thirrd_dest_no":null,"third_ann_id":null},{"ua_no":"18771000","ars_name":"QWEEEQ_Test","ars_id":"00000001","first_depth_digit":"2","first_digit_name":null,"first_dest_type":"1","first_dest_no":"07011112222","first_ann_id":null,"second_depth_digit":"1","second_digit_name":null,"second_dest_type":"1","second_dest_no":"01011112222","second_ann_id":null,"third_depth_digit":"0","third_digit_name":null,"third_dest_type":null,"thirrd_dest_no":null,"third_ann_id":null},{"ua_no":"18771000","ars_name":"QWEEEQ_Test","ars_id":"00000001","first_depth_digit":"3","first_digit_name":null,"first_dest_type":"1","first_dest_no":null,"first_ann_id":null,"second_depth_digit":"1","second_digit_name":null,"second_dest_type":"1","second_dest_no":"07012345678","second_ann_id":null,"third_depth_digit":"1","third_digit_name":null,"third_dest_type":"1","thirrd_dest_no":null,"third_ann_id":null}]');
   console.log(data);
   var parseData = {};
   
   data.forEach(function(d){

      if(+d.first_depth_digit){
         parseData[d.first_depth_digit] = {
            ua_no: d.ua_no,
            ars_name: d.ars_name,
            ars_id: d.ars_id,
            depth_digit: d.first_depth_digit,
            digit_name: d.first_digit_name,
            dest_type: d.first_dest_type,
            dest_no: d.first_dest_no,
            ann_id: d.first_ann_id,
            children : {}
         };   
         if(+d.second_depth_digit){
            parseData[d.first_depth_digit].children[d.second_depth_digit] = {
               depth_digit: d.second_depth_digit,
               digit_name: d.second_digit_name,
               dest_type: d.second_dest_type,
               dest_no: d.second_dest_no,
               ann_id: d.second_ann_id,
               children: {}
            };
            if(+d.third_depth_digit){
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

   $('tbody', $targetTrSettingTable).remove();
   $targetTrSettingTable.append( templateScenarioRow( parseData ) );
   $('select', $targetTrSettingTable).each(function(){
      var $t = $(this);
      var v = $t.attr('value');
      $('option[value="' + v + '"]', $t).attr('selected', 'selected');
   })
   
   
}

function templateSelectOptions( data ){
   var optionHtml = '';
   data.forEach(function(e){
      optionHtml += '<option value="' + e.value + '">' + e.label + '</option>'
   })
   return optionHtml;
}

function templateStep(step, data){
   // console.log(data);
   var stepHtml = '<tbody class="setting-box">';
   stepHtml += '<tr class="step-box step-' + step + ' adviser-selected">';
   stepHtml += '<tr class="step-box step-' + step + '">';
   stepHtml += '   <td class="badge-box">';
   stepHtml += '      <div class="adviser-status"><button><i class="fas fa-phone"></i></button></div>';
   stepHtml += '      <span class="badge badge-success text-sm">' + step + '단계</span>';
   stepHtml += '      <input type="hidden" name="step" value="' + step + '">';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number">';
   stepHtml += '      <select class="form-control form-control-sm" name="depth_digit" value="' + data.depth_digit + '">';
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
   stepHtml += '      <button class="btn-function btn-down" onclick="stepDepthShow(this);" data-step="1"><i class="fas fa-arrow-down"></i></button>';
   stepHtml += '      <button class="btn-function btn-minus" onclick="stepDepthHide(this);"><i class="fas fa-minus"></i></button>';
   stepHtml += '      <button class="btn-function btn-adv-setting cancelable"><i class="fas fa-phone-slash"></i></button>';
   stepHtml += '      <button class="btn-function btn-adv-setting"><i class="fas fa-phone"></i></button>';
   stepHtml += '   </td>';
   stepHtml += '   <td class="cs-info">';
   stepHtml += '      <div class="adv-select-box">';
   stepHtml += '            <select class="form-control form-control-sm">';
   stepHtml += '               <option>0101015454</option>';
   stepHtml += '            </select>';
   stepHtml += '      </div>';
   stepHtml += '   </td>';
   stepHtml += '</tr>';
   stepHtml += '</tbody>';
   return stepHtml;
}


function templateScenarioRow(parseData){
   console.log(parseData);
   var html = '';
   for (var key in parseData) {
         var firstData = parseData[key];
         html += templateStep(1, firstData);

         for (var key in firstData.children){
            var secondData = firstData.children[key];
            html += templateStep(2, secondData);
          
            for (var key in secondData.children){
               var thirdData = secondData.children[key];
               html += templateStep(3, thirdData);
               
            }

         }

         html += '<tbody class="spacer"><tr><td colspan="4"></td></tr></tbody>';
         
   }

   return html;

}

/**
 * 이벤트 바인딩
 */

function eventBind(){
   
   $(document)

   // row 에서 설정 아이콘 클릭시 상세 정보 조회
   .on('click', '.retrieveScenarioRow', function(){
      var $t = $(this);
      var tr = $t.closest('tr');
      retrieveScenarioRow( tr.attr('data-ars_name'), tr.attr('data-ars_id') );
   })

   // 착신유형 변경
   .on('change', '.calltype-select', function(){
      var $t = $(this);
      $('.select-recept', $t.closest('tr')).attr('data-selecttype', 'select-' + this.value);
      console.log(this.value);
   })

   // 단계 추가
   .on('click', '.addStep', function(){
      console.log('단계추가');
      $('tr.scenarioDetailRow.on table.step-box-table').append( 
         templateStep(1, {depth_digit: 0, digit_name: null, dest_type: 1, dest_no: 0, ua_no: 0}) 
         + '<tbody class="spacer"><tr><td colspan="4"></td></tr></tbody>'
      );
   })

   // 적용
   .on('click', '.stepApplySave', function(){
      console.log('적용');
      
      var saveData = [];
      $('tr.scenarioDetailRow.on tbody').each(function(){
         var $t = $(this);
         var $form = $('<form><table></table></form>');
         $('table', $form).append( $t.clone() );
         saveData.push( $form.serializeObject() );
      });

      console.log( saveData );
      
   })
   
}

