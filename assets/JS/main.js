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
  
  
  //addNewItem('');
  
  function getItems(){
	$.ajax({
  type: "POST",
  url: 'https://getpocket.com/v3/get',
  data: {'consumer_key':'44562-1776b752c8a85a934cb4710c','access_token':'4fc70b12-06e2-a8e3-0c30-e3d5ba',"count":"10",
"detailType":"simple",'sort':'newest'}
}).done(function(data){
  console.log(data.list);
  $.each(data.list,function(id,data){
    console.log("before add",data);
    addNewItem(data);
  });
	});
	//console.log($("#get-lsit").submit().text);
	
  }
 getItems();
 console.log("test");
});