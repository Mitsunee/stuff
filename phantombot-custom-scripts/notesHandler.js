/**
 * notesHandler.js
 *
 * This script provides a twitch command that will post an embed with a message into a hardcoded discord channel.
 *
 * NOTE: The discord channel name is hardcoded and must be adjusted
 * Script must be in /scripts/custom/ to work
 *
 * @author Mitsunee <https://www.mitsunee.com>
 * @license https://github.com/Mitsunee/stuff/blob/master/LICENSE
 */
(function() {
    $.bind('command', function(event) {
        var command = event.getCommand(),
            arg = String(event.getArguments()),
            user = event.getSender().toLowerCase();
        

        if(command.equalsIgnoreCase('note')) {
            var target = $.twitch.GetChannel(user);
            var targetLogo = String(target.getString("logo"));
            
            if(arg=="") {
                $.say("Usage: !note text here");
                return;
            }
            
            message = new Packages.sx.blah.discord.util.EmbedBuilder()
                .withTitle("Note")
                .withColor(255,180,220)
                .withDesc(arg)
                .withTimestamp(Date.now())
                .withFooterText(user)
                .withFooterIcon(targetLogo)
            .build();
            $.discordAPI.sendMessageEmbed("moderator-room",message);//** change moderator-room to whatever channel you want **//
            $.say("Saved note!");
        }
    });
    
    $.bind('initReady', function(){
        $.registerChatCommand('./custom/notesHandler.js', 'note', 2);//Permission level: 2 (Moderator), change to 1 for Admin or 0 for Caster
    });
})();