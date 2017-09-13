$(function() {
	$("#rest_send").click(function() {
		send();
	});
});

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
