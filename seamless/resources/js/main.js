/**
 * temp page loader
 * - jsp 의 serverside rendering 을 대신한 jquery load 기능
 */ 

 var viewPath = '../../';
 function tempIcluder(target, url){
    $(target).load(viewPath + url);
 };
