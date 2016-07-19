var logger = require("jitsi-meet-logger").getLogger(__filename);

success = function(){};
failure = function(){};
module.exports = function(XMPP) {
    Strophe.addConnectionPlugin('focusAdmin', {
        connection: null,
        init: function(conn){
            this.connection = conn;
            this.connection.addHandler(this.muteVideo.bind(this), 'cloudversify:focusAdmin', 'iq', 'mute', null, null);)
        },
        sendRemoteMuteAudio: function (jid, ssrc){
            var iq = $iq({to: jid,
                type: 'set'})
                .c('jingle', {xmlns: 'urn:xmpp:jingle:1',
                    action: 'source-remove'
                })
                .c('content',{name:"audio"
                })
                .c("description",{xmlns:"urn:xmpp:jingle:apps:rtp:1",
                    media : "audio"
                })
                .c('source',{xmlns:"urn:xmpp:jingle:apps:rtp:ssma:0",
                    ssrc:ssrc
                })
                .c('ssrc-info', {xmlns:"http://jitsi.org/jitmeet",
                    owner:jid
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
            // var iq = $iq({to: jid,
            //     type: 'set'})
            //     .c('jingle', {xmlns: 'urn:xmpp:jingle:1',
            //         action: 'source-remove'
            //     })
            //     .c('content',{name="audio"
            //     })
            //     .c("description",{xmlns="urn:xmpp:jingle:apps:rtp:1",
            //         media = "audio"
            //     })
            //     .c('source',{xmlns="urn:xmpp:jingle:apps:rtp:ssma:0",
            //         ssrc=ssrc
            //     })
            //     .c('ssrc-info', {xmlns="http://jitsi.org/jitmeet",
            //         owner=jid
            //     });

            // // Calling tree() to print something useful
            // iq = iq.tree();
            // logger.info("Sending mute", iq);
            // console.log('sending mute', iq);

            // this.connection.sendIQ(iq,
            //     success,
            //     failure);
        },
        sendRemoteMuteVideo: function (jid, ssrc){
            var iq = $iq({to: jid,
                type: 'set'})
                .c('jingle', {xmlns: 'urn:xmpp:jingle:1',
                    action: 'source-remove'
                })
                .c('content',{name:"video"
                })
                .c("description",{xmlns:"urn:xmpp:jingle:apps:rtp:1",
                    media : "video"
                })
                .c('source',{xmlns:"urn:xmpp:jingle:apps:rtp:ssma:0",
                    ssrc:ssrc
                })
                .c('ssrc-info', {xmlns:"http://jitsi.org/jitmeet",
                    owner:jid
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
            // var iq = $iq({to: jid,
            //     type: 'set'})
            //     .c('jingle', {xmlns: 'urn:xmpp:jingle:1',
            //         action: 'source-remove'
            //     })
            //     .c('content',{name="audio"
            //     })
            //     .c("description",{xmlns="urn:xmpp:jingle:apps:rtp:1",
            //         media = "audio"
            //     })
            //     .c('source',{xmlns="urn:xmpp:jingle:apps:rtp:ssma:0",
            //         ssrc=ssrc
            //     })
            //     .c('ssrc-info', {xmlns="http://jitsi.org/jitmeet",
            //         owner=jid
            //     });

            // // Calling tree() to print something useful
            // iq = iq.tree();
            // logger.info("Sending mute", iq);
            // console.log('sending mute', iq);

            // this.connection.sendIQ(iq,
            //     success,
            //     failure);
        }, 
        muteVideo: function (iq){

        },
        unmuteVideo: function (iq){
            
        },
        muteAudio: function (iq){

        },
        unmuteAudio: function (iq){

        },
    });
};
