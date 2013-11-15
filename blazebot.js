// Make sure that we have everything we need!
var irc = require('irc');
var logger = require(__dir'compontents')

console.log('######################################');
console.log('#  Thank you for using blazebot-js!  #');
console.log('######################################');


// Configure your IRC bot!
var config = {
	channels: ["#davidwalshblog", "#mootools"],
	server: "irc.freenode.net",
	botName: "blazebot"
};

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

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

// Listen for joins
bot.addListener("join", function(channel, who) {
	// Welcome them in!
	bot.say(channel, who + "...dude...welcome back!");
});

// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
	bot.say(from, "¿Que?");
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
	bot.say(config.channels[0], "¿Public que?");
});

