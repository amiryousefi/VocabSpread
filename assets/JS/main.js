window.onload = function() {
  
  
  
};

$(document).ready(function(){
  function addNewItem(newItemData){
    //console.log(newItemData);
    newItem = $(newItemSampleID).clone();
    newItem.removeClass('hide').removeAttr("id");
    newItem.attr('data-id',newItemData.item_id);
    newItem.find(".preview>h3").text(newItemData.given_title);
    //console.log(newItem.html());
	newItem.appendTo(itemListID);
   
  }
  var newItemSampleID = '#new-item-sample';
  var itemNewClass = 'new';
  var itemActiveClass = 'active';
  var hideClass = 'hide';
  itemListID = '.message-list';
  
  
  function save2storage(key,data){
    chrome.storage.local.set({key: data}, function() {
          // Notify that we saved.
          //message(key+' saved');
        });
  }
  
  function getFromStorage(key){
    chrome.storage.local.get(key, function(storage) {
        console.log(storage);
      });
    
  }
    
  
  
  function getItems(){
	$.ajax({
  type: "POST",
  url: 'https://getpocket.com/v3/get',
  data: {'consumer_key':'44562-1776b752c8a85a934cb4710c','access_token':'4fc70b12-06e2-a8e3-0c30-e3d5ba',"count":"10",
"detailType":"simple",'sort':'newest'}
}).done(function(data){
  //console.log(data.list);
  save2storage('list',data);
  $.each(data.list,function(id,data){
    //console.log("before add",data);
    addNewItem(data);
  });
	});
	//console.log($("#get-lsit").submit().text);
	
  }
 getItems();
 

$(".body *").mouseup(function() {
    var text=getSelectedText();
    if (text!=''){
      console.log(text);
       getFromStorage();
      var api_key = "AIzaSyB5ZLzP4oLzQfZQA-rEiSGDpu072SmqvQI";
      var url = "https://www.googleapis.com/language/translate/v2?key="+api_key+"&source=en&target=fa&q="+text;
      $.ajax({
        type:"GET",
        url:url
      }).done(function(data){
        
        $.each(data.data.translations,function(key,translations){
          
          console.log("translations",translations.translatedText);
          $(".bottombar #translated").show().html(translations.translatedText);
        });
        
      });
    } 
});

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}
 
});