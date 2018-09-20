// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function setting(){
	
}

function scan(){
	
}

function Profile(){
	alert('profile');
}

function Logout(){
	// Bersihkan table users SQLite
	var db = Ti.Database.install('/db/saleskit', 'saleskit');
	db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER, username TEXT, firstname TEXT, lastname TEXT, email TEXT, last_login TEXT, last_logout TEXT, active INTEGER)');
	db.execute('DELETE FROM users');
	
	// Isi dengan data Dummy
	var personArray = [1,'','','','','','',0];
	db.execute('INSERT INTO users (id,username,firstname,lastname,email,last_login,last_logout,active) VALUES (?,?,?,?,?,?,?,?)', personArray);
	
	// Database Close
	db.close();
	
	$.tabDashboard.close();
	Alloy.createController("LoginForm").getView().open();
}
