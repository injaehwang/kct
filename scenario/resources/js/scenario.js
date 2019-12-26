var $scenarioListBox = $('#scenarioListBox');

function scenarioInit(){

   // 시나리오 목록 조회
   retrieveScenarioList();

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
      html += '                  <th class="select-bgm">음원선택</th>';
      html += '                  <th class="btn-functions">단계 기능</th>';
      html += '                  <th class="cs-info">상담원 연결 번호</th>';
      html += '               </tr>';
      html += '         </thead>';
      // html += '         <tbody class="setting-box"></tbody>';
      html += '      </table>';
      html += '   </div>';

      html += '   <div class="add-step-box">';
      html += '      <button class="btn btn-primary"><i class="fas fa-plus"></i>  단계 추가</button>';
      html += '   </div>';

      html += '   </div>';
      html += '   <div class="adviser-box">';
      html += '      <div class="row">';
      html += '            <div class="col-md-12 col-xs-12 text-center">';
      html += '               <button class="btn btn-primary btn-sm">적용</button>';
      html += '               <button class="btn btn-danger btn-sm">취소</button>';
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
   
}

function templateStep(step, data){
   console.log(data);
   var stepHtml = '<tbody class="setting-box">';
   stepHtml += '<tr class="step-box step-' + step + ' adviser-selected">';
   stepHtml += '<tr class="step-box step-' + step + '">';
   stepHtml += '   <td class="badge-box">';
   stepHtml += '      <div class="adviser-status"><button><i class="fas fa-phone"></i></button></div>';
   stepHtml += '      <span class="badge badge-success text-sm">' + step + '단계</span>';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number">';
   stepHtml += '      <select class="form-control form-control-sm">';
   stepHtml += '            <option>' + data.depth_digit + '</option>';
   stepHtml += '      </select>';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number-name">';
   stepHtml += '      <input type="text" class="form-control form-control-sm" value="' + data.digit_name + '">';
   stepHtml += '   </td>';
   stepHtml += '   <td class="number-type">';
   stepHtml += '      <select class="form-control form-control-sm">';
   stepHtml += '            <option value="1" ' + ((data.dest_type == 1) ? "selected" : "") + '>전화번호</option>';
   stepHtml += '            <option value="2" ' + ((data.dest_type == 2) ? "selected" : "") + '>안내방송</option>';
   stepHtml += '      </select>';
   stepHtml += '   </td>';
   stepHtml += '   <td class="select-bgm">';
   stepHtml += '      <select class="form-control form-control-sm">';
   stepHtml += '            <option>선택하세요</option>';
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

$scenarioListBox.on('click', '.retrieveScenarioRow', function(){
   var $t = $(this);
   var tr = $t.closest('tr');
   retrieveScenarioRow( tr.attr('data-ars_name'), tr.attr('data-ars_id') );
})