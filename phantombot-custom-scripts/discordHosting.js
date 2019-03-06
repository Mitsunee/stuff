/**
 * discordHosting.js
 *
 * This script will post a similar embed to the online alert whenever you're (auto)hosting someone
 *
 * NOTE: The discord channel name is hardcoded and must be adjusted
 * The script can be in any folder in /scripts/
 *
 * @author Mitsunee <https://www.mitsunee.com>
 * @license https://github.com/Mitsunee/stuff/blob/master/LICENSE
 */
(function () {
    $.bind('ircPrivateMessage', function (event) {
        var message = event.getMessage().toLowerCase();

        if (message.indexOf('now hosting') !== -1) {
            var target = String(message).replace('now hosting ', '').replace('.', '');
            
            if(target == $.getSetIniDbString('discordHosting', 'lastChannel', '')) return;
            
            var targetChannel = $.twitch.GetStream(target).getJSONObject("stream"),
                targetPreview = String(targetChannel.getJSONObject("preview").getString("template")).replace('{width}','1280').replace('{height}','720'),
                targetLogo = String(targetChannel.getJSONObject("channel").getString("logo")),
                targetStatus = String(targetChannel.getJSONObject("channel").getString("status")),
                targetGame = String(targetChannel.getString("game"));

            $.discordAPI.sendMessageEmbed('host-hall', //** change host-hall to whatever discord channel you want the announcements to appear in **/
                new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(255, 180, 220)   //** You can adjust the color of the embed here **/
                    .withThumbnail(targetLogo)
                    .withTitle('Now Hosting '+target+' on Twitch')
                    .appendField($.lang.get('discord.streamhandler.common.game'), targetGame, false)
                    .appendField($.lang.get('discord.streamhandler.common.title'), targetStatus, false)
                    .withUrl('https://twitch.tv/' + target)
                    .withTimestamp(Date.now())
                    .withFooterText('Twitch')
                    .withFooterIcon(targetLogo)
                    .withImage(targetPreview + '?=' + $.randRange(1, 99999))
                .build()
            );
            
            $.setIniDbString('discordHosting', 'lastChannel', target);
        }
    });
})();