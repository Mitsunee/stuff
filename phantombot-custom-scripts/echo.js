/**
 * echo.js
 *
 * advanced !echo command for Discord
 *
 * Script must be in /scripts/custom/ to work
 *
 * @author Mitsunee <https://www.mitsunee.com>
 * @license https://github.com/Mitsunee/stuff/blob/master/LICENSE
 */
(function() {
    $.bind('discordChannelCommand', function(event) {//Discord command: !echo
        var command = event.getCommand();
        var channel = event.getChannel();
        var arguments = event.getArguments();
        var args = event.getArgs();
        
         /**
         * @commandpath echo - command to say someone in a channel or in twitch just: !echo targetChannel message
         */
        if (command.equalsIgnoreCase('echo')) {
            targetChannel = args[0];//get the channel
            if(targetChannel === undefined || targetChannel === "undefined") {//validate input
                $.discord.say(channel,"echo what and where? o:");
            } else if(targetChannel == "twitch") {//special case: twitch, needs a different output command
                message = arguments.substr((""+targetChannel).length+1);//get the message
                if(message == "") {//validate input
                    $.discord.say(channel,"echo what?! o:");//print message
                    return;//no message given, stop execution
                }
                $.say(message);//print message
                $.discord.say(channel, "I posted the message on twitch");//print message
            } else {
                message = arguments.substr((""+targetChannel).length+1);//get the message
                if(message == "") {//validate input
                    $.discord.say(channel,"echo what?! o:");//print message
                    return;//no message given, stop execution
                }
                $.discord.say(targetChannel, message);//print message
                $.discord.say(channel, "I posted the message in "+targetChannel);//print message
            }
            
        
            return;//stop execution
        }
    });
        
    $.bind('initReady', function(){
        $.discord.registerCommand('./custom/echo.js', 'echo', 1);
    });
    
})();