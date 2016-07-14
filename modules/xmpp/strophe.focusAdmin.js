var logger = require("jitsi-meet-logger").getLogger(__filename);

success = function(){};
failure = function(){};
module.exports = function(XMPP) {
    Strophe.addConnectionPlugin('focusAdmin', {
        connection: null,
        init: function(conn){
            this.connection = conn;
        },
        sendRemoteMuteAudio: function (jid, ssrc){
            var iq = $iq({to: jid,
                type: 'set'})
                .c('focusAdmin', {xmlns: 'cloudversify:focusAdmin',
                    action: 'admin-mute-audio',
                    target: jid,
                    ssrc: ssrc
                });

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);
            console.log('sending mute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteUnmuteAudio: function (jid, ssrc){
            var iq = $iq({to: jid,
                type: 'set'})
                .c('focusAdmin', {xmlns: 'cloudversify:focusAdmin',
                    action: 'admin-unmute-audio',
                    target: jid,
                    ssrc: ssrc
                });

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);
            console.log('sending mute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteMuteVideo: function (jid, ssrc){
            var iq = $iq({to: jid,
                type: 'set'})
                .c('focusAdmin', {xmlns: 'cloudversify:focusAdmin',
                    action: 'admin-mute-video',
                    target: jid,
                    ssrc: ssrc
                });

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);
            console.log('sending mute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteUnmuteVideo: function (jid, ssrc){
            var iq = $iq({to: jid,
                type: 'set'})
                .c('focusAdmin', {xmlns: 'cloudversify:focusAdmin',
                    action: 'admin-unmute-video',
                    target: jid,
                    ssrc: ssrc
                });

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);
            console.log('sending mute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        }
    });
};
