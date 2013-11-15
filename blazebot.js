// Make sure that we have everything we need!
var irc = require('irc');

console.log('######################################');
console.log('#  Thank you for using blazebot-js!  #');
console.log('######################################');


// Configure your IRC bot!
var config = {
  channels: ["#xblaze", "#l"],
  server: "irc.esper.net",
  nickname: "Abigail",
  cmdprefix: "!"
};

// Create the bot name
var bot = new irc.Client(config.server, config.nickname, {
  channels: config.channels
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  // Welcome them in!
  bot.say(channel, who + "Welcome back " + who + "!");
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
  if(message == config.cmdprefix + "test") {
    bot.say(config.channels[0], "¿Public que?");
    bot.say(config.channels[1], "¿Public que?");
  }
});

