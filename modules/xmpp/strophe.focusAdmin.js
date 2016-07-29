/* global Strophe, $, $pres, $iq, $msg */
/* jshint -W101,-W069 */
var logger = require("jitsi-meet-logger").getLogger(__filename);
//var XMPPEvents = require("../../service/xmpp/XMPPEvents");
var JitsiConferenceEvents = require("../../JitsiConferenceEvents");
success = function(){};
failure = function(){};
module.exports = function(XMPP, eventEmitter) {
    Strophe.addConnectionPlugin('focusAdmin', {
        connection: null,
        init: function(conn){

            this.connection = conn;
            this.connection.addHandler(this.muteVideo.bind(this),
                'cloudversify:mutevideo', 'iq', 'set', null, null, null);
            this.connection.addHandler(this.muteAudio.bind(this),
                'cloudversify:muteaudio', 'iq', 'set', null, null, null);
            this.connection.addHandler(this.unmuteVideo.bind(this),
                'cloudversify:unmutevideo', 'iq', 'set', null, null, null);
            this.connection.addHandler(this.unmuteAudio.bind(this),
                'cloudversify:unmuteaudio', 'iq', 'set', null, null, null);
        },
        sendRemoteMuteAudio: function (Jid){
            var iq = $iq({to: Jid,
                type: 'set'})
                .c('mute', {xmlns: 'cloudversify:muteaudio',
                    action: 'muteAudio'});

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteUnmuteAudio: function (Jid){
            var iq = $iq({to: Jid, type: 'set'})
                .c('unmute', {xmlns: 'cloudversify:unmuteaudio',
                    action: 'unmuteAudio'});

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending unmute", iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteMuteVideo: function (Jid){
            var iq = $iq({to: Jid, type: 'set'})
                .c('mute', {xmlns: 'cloudversify:mutevideo',
                    action: 'muteVideo'});

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteUnmuteVideo: function (Jid){
            var iq = $iq({to: Jid, type: 'set'})
                .c('unmute', {xmlns: 'cloudversify:unmutevideo',
                    action: 'unmuteVideo'});

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending unmute", iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        muteVideo: function (iq){
            var fromJid = iq.getAttribute('from');
            // send ack first
            var ack = $iq({type: 'result',
                to: fromJid,
                id: iq.getAttribute('id')
            });
            eventEmitter.emit(JitsiConferenceEvents.CLOUDVERSIFY_MUTE_VIDEO);
            this.connection.send(ack);
            return true;
        },
        unmuteVideo: function (iq){
            var fromJid = iq.getAttribute('from');
            // send ack first
            var ack = $iq({type: 'result',
                to: fromJid,
                id: iq.getAttribute('id')
            });
            eventEmitter.emit(JitsiConferenceEvents.CLOUDVERSIFY_UNMUTE_VIDEO);
            this.connection.send(ack);
            return true;
        },
        muteAudio: function (iq){
            var fromJid = iq.getAttribute('from');
            // send ack first
            var ack = $iq({type: 'result',
                to: fromJid,
                id: iq.getAttribute('id')
            });
            eventEmitter.emit(JitsiConferenceEvents.CLOUDVERSIFY_MUTE_AUDIO);
            this.connection.send(ack);
            return true;
        },
        unmuteAudio: function (iq){
            var fromJid = iq.getAttribute('from');
            // send ack first
            var ack = $iq({type: 'result',
                to: fromJid,
                id: iq.getAttribute('id')
            });
            eventEmitter.emit(JitsiConferenceEvents.CLOUDVERSIFY_UNMUTE_AUDIO);
            this.connection.send(ack);
            return true;
        }
    });
};
