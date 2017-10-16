$(function() {
	var url = window.location.href;
	var flow;
	if(url.indexOf('standard')!=-1) {
		flow='standard';
	} else if(url.indexOf('implicit')!=-1) {
		flow='implicit';
	} else {
		flow='hybrid';
	}
		
	var keycloak = Keycloak();
	load(keycloak, flow);
	
	$("#refresh").click(function() {
		refresh(keycloak);
	});
	
	$("#logout").click(function() {
		logout(keycloak);
	});
	
});

function load(keycloak, flow) {
    keycloak.init({ onLoad: 'login-required',checkLoginIframe: false, flow: flow }).success(function(authenticated) {
        //alert(authenticated ? 'authenticated' : 'not authenticated');
    	showToken(keycloak.token);
    }).error(function() {
        alert('failed to initialize');
    });
}

function refresh(keycloak) {
	keycloak.updateToken(30).success(function() {
	    $("#token").val(keycloak.token);
	}).error(function() {
	    alert('Failed to refresh token');
	});
	
}

function logout(keycloak) {
	keycloak.logout();
//	var cookies = $.cookie();
//	for(var cookie in cookies) {
//		if(cookie=='JSESSIONID' || cookie=='OAuth_Token_Request_State')
//	   $.removeCookie(cookie);
//	}
}

function showToken(token) {
	$("#token").val(token);
}
