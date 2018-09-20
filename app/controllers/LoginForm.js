// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// Bersihkan table users SQLite
var db = Ti.Database.install('/db/saleskit', 'saleskit');
db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER, username TEXT, firstname TEXT, lastname TEXT, email TEXT, last_login TEXT, last_logout TEXT, active INTEGER)');
db.execute('DELETE FROM users');

// Isi dengan data Dummy
var personArray = [1,'','','','','','',0];
db.execute('INSERT INTO users (id,username,firstname,lastname,email,last_login,last_logout,active) VALUES (?,?,?,?,?,?,?,?)', personArray);

// Database Close
db.close();

function loadDashboard(){
	var dashboard = Alloy.createController('Dashboard').getView();
	dashboard.open();
}

function doLogin(){
	var url = 'http://edpjb.com/saleskit-api/access/login';
	var client = Ti.Network.createHTTPClient({
		onerror: function(e){
			alert('There was an error during the connection');
		},
		timeout: 5000
	});	
	client.open('POST', url);
	var params = {
		username: $.username.value,
		password: $.password.value
	};
	client.send(params);
	
	client.onload = function(){
		var json = JSON.parse(this.responseText);
		var status = json.status;
		
		if(status == true){
			var db = Ti.Database.open('saleskit');
			db.execute('DELETE FROM users');
			
			var dataArray = [1,json.username,json.firstname,json.lastname,json.email,'','',1];
			db.execute('INSERT INTO users (id,username,firstname,lastname,email,last_login,last_logout,active) VALUES (?,?,?,?,?,?,?,?)', dataArray);
			
			loadDashboard();
			
		}else{
			alert('Login Gagal');
		}
	};
}

function getUser(){
	
	var url = 'http://edpjb.com/saleskit-api/access/getuser';
	var client = Ti.Network.createHTTPClient({
		onload: function(){
			var json = JSON.parse(this.responseText);
			var json = json.status;			
			alert(json);
		},
		onerror: function(e){
			Ti.API.debug(e.error);
			alert('error');
		},		
		timeout: 5000
	});
	
	client.open('GET', url);
	client.send();		
	
}
