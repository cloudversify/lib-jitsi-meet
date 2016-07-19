var logger = require("jitsi-meet-logger").getLogger(__filename);
//var XMPPEvents = require("../../service/xmpp/XMPPEvents");
var JitsiConferenceEvents = require("../../JitsiConferenceEvents");
success = function(){
    console.log('sendIQ returned success')
};
failure = function(){
    console.log('sendIQ returned failure')
};
module.exports = function(XMPP, eventEmitter) {
    Strophe.addConnectionPlugin('focusAdmin', {
        connection: null,
        init: function(conn){

            this.connection = conn;
            this.connection.addHandler(this.muteVideo.bind(this), 'cloudversify:mutevideo', 'iq', 'set', null, null, null);
            this.connection.addHandler(this.muteAudio.bind(this), 'cloudversify:muteaudio', 'iq', 'set', null, null, null);
            this.connection.addHandler(this.unmuteVideo.bind(this), 'cloudversify:unmutevideo', 'iq', 'set', null, null, null);
            this.connection.addHandler(this.unmuteAudio.bind(this), 'cloudversify:unmuteaudio', 'iq', 'set', null, null, null);
        },
        sendRemoteMuteAudio: function (focusJid, spoofJid, ssrc){
            //this.sendRemoteMVideo(focusJid, spoofJid, ssrc);

            //console.log("sending to JID: ", focusJid)
            console.log("sending to JID: ", spoofJid)
            var iq = $iq({to: spoofJid,
                //xmlns:'cloudversify:focusAdmin',
                //action: 'mute',
                type: 'set'})

            // var iq = $iq({to: spoofJid,
            //     type: 'set',
            //     id: 'muteVideo',
            //     xmlns: 'cloudversify:focusAdmin'})
                .c('mute', {xmlns: 'cloudversify:muteaudio',
                    action: 'muteAudio'})

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);
            console.log('sending mute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteUnmuteAudio: function (focusJid, spoofJid, ssrc){
            //this.sendRemoteMVideo(focusJid, spoofJid, ssrc);

            //console.log("sending to JID: ", focusJid)
            console.log("sending to JID: ", spoofJid)
            var iq = $iq({to: spoofJid,
                //xmlns:'cloudversify:focusAdmin',
                //action: 'mute',
                type: 'set'})

            // var iq = $iq({to: spoofJid,
            //     type: 'set',
            //     id: 'muteVideo',
            //     xmlns: 'cloudversify:focusAdmin'})
                .c('unmute', {xmlns: 'cloudversify:unmuteaudio',
                    action: 'unmuteAudio'})

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending unmute", iq);
            console.log('sending unmute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteMuteVideo: function (focusJid, spoofJid, ssrc){
            //this.sendRemoteMVideo(focusJid, spoofJid, ssrc);

            //console.log("sending to JID: ", focusJid)
            console.log("sending to JID: ", spoofJid)
            var iq = $iq({to: spoofJid,
                //xmlns:'cloudversify:focusAdmin',
                //action: 'mute',
                type: 'set'})

            // var iq = $iq({to: spoofJid,
            //     type: 'set',
            //     id: 'muteVideo',
            //     xmlns: 'cloudversify:focusAdmin'})
                .c('mute', {xmlns: 'cloudversify:mutevideo',
                    action: 'muteVideo'})

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending mute", iq);
            console.log('sending mute', iq);

            this.connection.sendIQ(iq,
                success,
                failure);
        },
        sendRemoteUnmuteVideo: function (focusJid, spoofJid, ssrc){
            //this.sendRemoteMVideo(focusJid, spoofJid, ssrc);

            //console.log("sending to JID: ", focusJid)
            console.log("sending to JID: ", spoofJid)
            var iq = $iq({to: spoofJid,
                //xmlns:'cloudversify:focusAdmin',
                //action: 'mute',
                type: 'set'})

            // var iq = $iq({to: spoofJid,
            //     type: 'set',
            //     id: 'muteVideo',
            //     xmlns: 'cloudversify:focusAdmin'})
                .c('unmute', {xmlns: 'cloudversify:unmutevideo',
                    action: 'unmuteVideo'})

            // Calling tree() to print something useful
            iq = iq.tree();
            logger.info("Sending unmute", iq);
            console.log('sending unmute', iq);

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
            console.log("Mute Video event?", iq)
            console.log('eventemitter: ', eventEmitter)
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
            console.log("Unmute Video event?", iq)
            console.log('eventemitter: ', eventEmitter)
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
            console.log("Mute Video event?", iq)
            console.log('eventemitter: ', eventEmitter)
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
            console.log("Unmute Video event?", iq)
            console.log('eventemitter: ', eventEmitter)
            eventEmitter.emit(JitsiConferenceEvents.CLOUDVERSIFY_UNMUTE_AUDIO);
            this.connection.send(ack);
            return true;
        }
    });
};
