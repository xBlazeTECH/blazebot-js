console.log('Loading Minecraft Plugin!'); 
bot.addListener("message", function(from, to, text, message) {
  var chars = text.split("");
  var words = text.split(" ");
  var player = ""; 

  if (chars[0].toUpperCase() == "<") {
  chars[0] = "";
    for (c in chars) {
      // Find the end of the player name
      if (chars[c] == ">") {
      console.log('Playername: [' + player + ']');
        // Look through the words and find commands
        for (i in words) {
          // Command Interpreter
          if (words[i].toUpperCase() == config.cmdprefix + "DIE") {
            console.log('I should die now!');
            isAdmin(player.toUpperCase(), function(result) {
              if (result == true){
                bot.say(to, "Farewell Cruel World!");
                process.exit(1);
              } else {
                bot.say(to, player + ", You don't tell me what to do!");
              }
            });
          }
          // Add more commands here!
        }
      }
      else {
        player = player + chars[c];
      }
    }
  }
});
