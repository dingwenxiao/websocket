$(function() {
	$("#rest_send").click(function() {
		send();
	});
	
	$("#add-header").click(function() {
		addHeader();
	});
	
	$("#remove-header").click(function() {
		removeHeader();
	});
});

function addHeader() {
//	$(".add-header").prev().after(
//	'<div class="col-sm-12 header-col">'
//	+'<input type="text" name="header_name" class="span10" placeholder="header name">'
//    +'<input type="text" name="header_value" class="span10" placeholder="header value">'
//   +'</div>');
	
	$(".header-group").prepend('<div class="col-sm-12 header-col">'
			+'<input type="text" name="header_name" class="span10" placeholder="header name">'
		    +'<input type="text" name="header_value" class="span10" placeholder="header value">'
		   +'</div>');
}

function removeHeader() {
	$(".add-header").prev().remove();
}

function send() {
	var method = $("#method").val();
	var data = $("#request_body").val();
	var headers = getHeaders();
	var url = $("#url").val();
	
	var requestData={'method':method, 'headers':headers, 'url': url, 'data':data};
	
	restRquest(requestData);
}

function getHeaders() {
	var num = $(".header-group").children().length;
	var headers = {};
	for (var i = 0; i < num - 1; i++) {
		var headerName = $(".header-group").children().eq(i).children().eq(0)
				.val();
		var headerValue = $(".header-group").children().eq(i).children().eq(1)
				.val();
		headers[headerName] = headerValue;
	}
	return headers;
}

function restRquest(requestData) {
	$.ajax({
		method : 'post',
		url : "execute_request",
		data : JSON.stringify(requestData),
		contentType:'application/json',
		success: function (response) {
            	$("#response_body").val(response);
        },
        error: function(request, status, error) {
        	$("#response_body").val(error);
         }
	});
	
//	.done(function(msg) {
//		$("#response_body").val(message);
//		alert("Data Saved: " + msg);
//	});
}

function requestWithoutData(method, url, headers) {
	$.ajax({
		method : method,
		url : url,
		headers : headers
	}).done(function(msg) {
		$("#response_body").val(message);
		alert("Data Saved: " + msg);
	});
}
