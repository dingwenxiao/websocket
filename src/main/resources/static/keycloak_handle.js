$(function() {
	var keycloak = Keycloak();
	load(keycloak);
	
	$("#refresh").click(function() {
		refresh(keycloak);
	});
	
	
});

function load(keycloak) {
    keycloak.init({ onLoad: 'login-required',checkLoginIframe: false }).success(function(authenticated) {
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

function showToken(token) {
	$("#token").val(token);
}
