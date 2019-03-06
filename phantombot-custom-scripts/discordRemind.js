/**
 * discordRemind.js
 *
 * Custom script for !remind on Discord
 *
 * Script must be in /scripts/custom/ to work
 *
 * @author Mitsunee <https://www.mitsunee.com>
 * @license https://github.com/Mitsunee/stuff/blob/master/LICENSE
 * 
 * Implements fork of Enhanced JS Timers interval.convert() for time units
 */
(function() {
    /**
     * @function userTimerPost
     * @param {String} [ch] channel
     * @param {String} [mention] the user's mention
     * @param {Number} [time] user's time in ms
     * @param {String} [userMessage] (optional) The user's message
     * @returns {void}
     */
    function userTimerPost(ch,mention,time,userMessage) {
        var message = mention + " your timer just ended!";
        if(userMessage) {
            message += "\n"+userMessage;
        }
        var func = function(){
            $.discord.say(ch, message);
        }
        setTimeout(func.bind(ch, message), time);
    }
    
    /**
     * @function timerUsage
     * @param {String} [channel]
     * @returns {void}
     */
    function timerUsage(channel) {
        $.discordAPI.sendMessageEmbed(channel,
            new Packages.sx.blah.discord.util.EmbedBuilder()
                .withColor(100, 65, 164)
                .withTitle('Reminder usage')
                .appendField('Command', '!remind time *[message]*\n**time** has to be units without spaces\n***message*** can have spaces (optional)', false)
                .appendField('Units', 'Current supported units are:', false)
                .appendField('Hours', 'h, hr, hrs', true)
                .appendField('Minutes', 'm, min', true)
                .appendField('Seconds', 's, sec', true)
            .build()
        );
    }
    
    $.bind('discordChannelCommand', function(event) {
        var command = event.getCommand(),
            args = event.getArgs(),
            channel = event.getChannel(),
            senderMention = event.getMention();
        
        
        /**
         * @commandpath remind - command to create reminders: !remind time [message]
         */
        if(command.equalsIgnoreCase('remind')) {
            if(!args[0]) return timerUsage(channel);
            
            var userTime = args[0],userMessage=[];
            
            var values,convertedTime=0,valueUnit,valueTime;
            values=userTime.match(/([0-9]+[a-z]+)/g);
            
            if(values==null) return timerUsage(channel);
            
            for(var i=0;i<values.length;i++) {
                valueUnit = values[i].match(/[a-z]+/g)[0];
                valueTime = Number(values[i].match(/[0-9]+/g)[0]);
                switch(valueUnit) {
                    case "h":
                    case "hr":
                    case "hrs":
                        convertedTime += valueTime * 3600000;
                        break;
                    case "m":
                    case "min":
                        convertedTime += valueTime * 60000;
                        break;				
                    case "s":
                    case "sec":
                        convertedTime += valueTime * 1000;
                        break;
                }
            }
            
            for(var i=1;args[i];i++) {
                userMessage.push(args[i]);
            }
            if (userMessage.length>0) {
                userMessage = userMessage.join(" ").replace(/[^a-zA-Z0-9 ]/g, '');
            } else userMessage = false;
            
            userTimerPost(channel,senderMention,convertedTime,userMessage);
            
            message = " I will remind you in "+(convertedTime/1000)+"s";
            $.discord.say(channel,senderMention + message);
        }
    });

    $.bind('initReady', function(){
        $.discord.registerCommand('./custom/discordRemind.js', 'remind', 0);
    });
})();