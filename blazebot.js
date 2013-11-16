// Make sure that we have everything we need!
var irc = require('irc');
var fs = require('fs');

// Find Our Plugins!
//var pl_minecraft = require(__dirname + '/plugins/minecraft.pl');

console.log('######################################');
console.log('#  Thank you for using blazebot-js!  #');
console.log('######################################');

fs.readFile(__dirname + '/plugins/minecraft.pl', 'utf8', function (err, data) {
  if (err) {
    console.log('Error Loading the Plugin Minecraft');
    console.log(err);
  }
  content = data.toString();
  eval(content);
});

// Configure your IRC bot!
var config = {
  channels: ["#gluxon"],
  server: "irc.freenode.net",
  nickname: "xBlazeBot",
  cmdprefix: "#"
};

var users = [];
fs.readFile(__dirname + '/settings/users.json', 'utf8', function (err, data) {
  if (err) {
    console.log('Error Reading Admins List');
    return;
  }

  users = JSON.parse(data);
  console.log(users);
});

// The Old Fashioned Way! :P
// var admins = ["xblaze", "liam"];


// Create the bot name
var bot = new irc.Client(config.server, config.nickname, {
  channels: config.channels
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  if(who == config.nickname) {
    bot.say(channel, "Hello everyone!");
  } else {
  bot.say(channel, "Let's all welcome back " + who + "!");
  }
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {

  console.log('[' + to + ']' + from + ': ' + text);
  if(text == config.cmdprefix + "die") {
    isAdmin(from, function(result) {
      if (result == true){
        bot.say(to, "Farewell Cruel World!");
        process.exit(1);
      } else {
        bot.say(to, from + ", You don't tell me what to do!");
      }
    });
  }

  if(text == config.cmdprefix + "") {
    bot.say(config.channels[0], "");
  }

});

// Check to see if user is on the admin list.
function isAdmin(name, callback) {
  var result = false;
  for(i in users.admins) {
    console.log('Comparting [' + name.toUpperCase() + '] with [' + users.admins[i].toUpperCase());
    if(name.toUpperCase() == users.admins[i].toUpperCase()) {
      result = true;
    }
  }
  callback(result);
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
 
process.stdin.on('data', function (chunk) {
  bot.say(config.channels, chunk);
});

console.log('[INFO] Bot started successfully! Awaiting Console Input!');
