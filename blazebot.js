// Make sure that we have everything we need!
var express = require('express');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');

// Set Up Express Application!
var app = express();
app.use(connect.bodyParser());
app.use(express.cookieParser());

//app.use(express.session());
app.use(express.session({secret: "alphaalpha"}));

// Create your databases should they not exist.
//var ordersDB = new sqlite3.Database(__dirname + "/system/databases/orders.db");

//  ordersDB.serialize(function() {
//  usersDB.run("CREATE TABLE orders (id AutoNumber)");

//  var stmt = usersDB.prepare("INSERT INTO lorem VALUES (?)");
//  for (var i = 0; i < 10; i++) {
//      stmt.run("Ipsum " + i);
//  }
//  stmt.finalize();

//  usersDB.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//      console.log(row.id + ": " + row.info);
//  });
//});

//usersDB.close();


app.get('/', function(req, res){

  var autoReload = req.query.ar;
  
  console.log(autoReload);
  res.writeHead(200, {'Content-Type': 'text/html'});

  if(req.query.ar == "true") {
    res.write("<head>");
    res.write("<!--AutoReload is ON-->");
    res.write('<meta http-equiv="refresh" content="5"/>');
    res.write('');
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/page/homepage.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }
  
  res.end('</body></html>');
});

app.get('/waitstaff', function(req, res){

  res.writeHead(200, {'Content-Type': 'text/html'});
 
  var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }

  var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }

  if(req.session.wauth) {
    res.write("<div class='span9' style='padding-top:75px;'>");
    res.write('You are logged in as: ' + req.session.wauth + '. ');
    res.write('</div>');

  } else {

    var array = fs.readFileSync(__dirname + '/system/content/util/waitstaff-login.html').toString().split("\n");
    for(i in array) {
        res.write(array[i] + "\n");
    }
  }
  
  res.end('</body></html>');
});

app.post('/waitstaff', function(req, res){
  var pin = req.body.pin;
  var profileLoc = __dirname + '/system/pins/' + pin + '.json';
  
  fs.readFile(profileLoc, 'utf8', function (err, data) {
    console.log('Waitstaff Authentication Recieved');
    console.log('Authenticating Pin: ' + req.body.pin);
    if (err) {
      console.log('Pin was not found!!');
      console.log('Displaying Authentication Failure Notice!');
      res.write('Your Username or Password was Incorrect!');
      res.redirect('/authfail');
    } else {
      console.log('We found a profile for the user!');
      var userInfo = JSON.parse(data);
      authenticate(userInfo);
    }
  });

  function authenticate(userInfo) {   
    req.session.wauth = req.body.pin;
  
    var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
    for(i in array) {
        res.write(array[i] + "\n");
    }
    
    var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
    for(i in array) {
        res.write(array[i] + "\n");
    }
      res.write("<div class='span9' style='padding-top:75px;'>");
      res.write('<p>Welcome back ' + userInfo.fullname + '!</p>');
      res.write('<p>You were born on the date: ' + userInfo.dateofbirth + '!</p>');
      res.write('</div>');
    
    res.end('</body></html>');
  }
});

app.get('/authfail', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/util/waitstaff-login-failed.html').toString().split("\n");
  for(i in array) {
      res.write(array[i] + "\n");
  }
  
  res.end('</body></html>');
});

app.get('/kitchen', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/dashboard/kitchen.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  res.end('</body></html>');
});

//BEGIN Administrator Login Functions

app.get('/admin', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/blocks/sidemenu.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  var array = fs.readFileSync(__dirname + '/system/content/util/admin-login.html').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  
  res.end('</body></html>');
});

app.post('/logout', function(req, res){
  res.clearCookie('loggedin');
});

app.post('/admin/login', function(req, res){
  var usernameIn = req.body.user;
  var passwordIn = req.body.pass;
  var profileLoc = __dirname + '/system/users/' + usernameIn + '.json';
  
  fs.readFile(profileLoc, 'utf8', function (err, data) {
    console.log('System is now looking for ' + usernameIn + '...');
    if (err) {
      console.log('User file not found for ' + usernameIn + '!');
      console.log('Displaying Authentication Failure Notice!');
      res.send('Your Username or Password was Incorrect!');
    } else {
      console.log('We found a profile for the user!');
      var userInfo = JSON.parse(data);
      authenticate();
    }
  });
  
  // The following line is used for debugging purposes only!
  console.log('Username: ' + usernameIn + ' Password: ' + passwordIn);

  function authenticate() {   
    res.writeHead(200, {'Content-Type': 'text/html'});
  
    var array = fs.readFileSync(__dirname + '/system/content/blocks/header.html').toString().split("\n");
    for(i in array) {
        res.write(array[i]);
    }
    
    var array = fs.readFileSync(__dirname + '/system/content/blocks/mainmenu.html').toString().split("\n");
    for(i in array) {
        res.write(array[i]);
    }
  
    var array = fs.readFileSync(__dirname + '/system/content/blocks/sidemenu.html').toString().split("\n");
    for(i in array) {
        res.write(array[i]);
    }
  
    if (usernameIn == "root" && passwordIn == "pass") {
      res.write('Authentication Sucessful! You are now logged in as ' + req.body.user + '!');
    } else {
      res.write('Your Username or Password was Incorrect!')
    }
    
    res.end('</body></html>');
  }
});

//END Administrator Login Functions


//BEGIN Real File Readouts

app.get('/css', function(req, res){
  var filename = req.query.q;
  var theme = req.query.theme;
  var array = fs.readFileSync(__dirname + '/system/content/themes/' + theme + '/' + filename + '.css').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

app.get('/img', function(req, res){
  var filename = req.query.q;
  var extention = req.query.ext;
  var array = fs.readFileSync(__dirname + '/system/content/img/' + filename + '.' + extention).toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

app.get('/js', function(req, res){
  var filename = req.query.q;
  var array = fs.readFileSync(__dirname + '/system/content/js/' + filename + '.js').toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

app.get('/file', function(req, res){
  var filename = req.query.q;
  var extention = req.query.ext;
  var array = fs.readFileSync(__dirname + '/system/content/files/' + filename + '.' + extention).toString().split("\n");
  for(i in array) {
      res.write(array[i]);
  }
  res.end();
});

//END Real File Readouts.


/* This is my way of using query. It is for my reference.
app.get('/hi', function(req, res){
  var body = req.query.body;
  res.end(body);
});
*/

app.listen(3000);
console.log('Listening on port 3000');
