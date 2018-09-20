var db = Ti.Database.install('/db/saleskit', 'saleskit');
db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER, username TEXT, firstname TEXT, lastname TEXT, email TEXT, last_login TEXT, last_logout TEXT, active INTEGER)');
var sql = db.execute('select count(*) as jml from users');
var jml = sql.fieldByName('jml');

if(jml == 0){
	var personArray = [1,'','','','','','',0];
	db.execute('INSERT INTO users (id,username,firstname,lastname,email,last_login,last_logout,active) VALUES (?,?,?,?,?,?,?,?)', personArray);
	var active = 0;
}else{
	var qry = db.execute('SELECT * FROM users LIMIT 1');
	var active = qry.fieldByName('active');
}

// CEK STATUS ACTIVE
if(active == 1){
	// Jika active = 1: ke halaman Dashboard
	Alloy.createController("Dashboard").getView().open();
}else{
	// Jika active != 1: ke halaman Login
	Alloy.createController("LoginForm").getView().open();
}


