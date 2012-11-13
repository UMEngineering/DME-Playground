// JavaScript Document
// Result page js
$(document).ready(function(){
	var param = split_cookie();
});

// Split the cookie to get data from each one of cookie
function split_cookie(){
	// All cookies are in one string, and break them apart by ";"
	var str_cookie = document.cookie;
	
	//alert(str_cookie);
	
	var arr_cookie = str_cookie.split("; ");
	if (arr_cookie.length != 6) {
		//alert("Failed!");
	} else {
		var arr_split_cookie = new Array();
		for (var i=0; i<arr_cookie.length-1; i++){
			arr_split_cookie[i] = arr_cookie[i].split("=");
		}
		//alert(arr_split_cookie);
	}
}