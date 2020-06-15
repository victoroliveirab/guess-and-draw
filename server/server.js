var PORT = 33333;
var HOST = '127.0.0.1';

var CLIENT_PORT = "4266";

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var sentHistory = {};
var ackHistory= {};
var receiving = {};

const history = {
    'add': (message, id) => {
        sentHistory[id] = message;
        console.log('Added id:' + sentHistory)
    },
    'remove': (id) => {
        delete sentHistory[id];
        console.log('>WHOOSH ' + id + 'went down the toilet');
    },
    'show': ()=> {
        console.log(">>")
        console.log('>>>>> Hitowy( •̀ ω •́ )✧ <<<<')
        sentHistory.forEach(element => {
            console.log('>History id:' + element.id + "content: " + element.message);
        });
    },
    'get': (id) => {
        return sentHistory[id];
    }
}

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    console.log(`>server listening ${address.address}:${address.port}`);
    console.log('>UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function messageHandler(message, remote) {
    var syn = new Buffer.from("SYN");
    var synack = new Buffer.from("SYNACK"); 

    var type = message.toString().split('|')[0];
    var content = message.toString().split('|')[1];


    if (Buffer.compare(synack, message) === 0) {
        var helo = new Buffer.from("HELO from Server");
        server.send(helo, 0, helo.length, CLIENT_PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>SYNACK recieved from' + HOST +':'+ PORT);
            console.log('>HandShake completed \n>Listening... UwU q(≧▽≦q)');
          });
    } 
    else {
        // sendSocketDg[type](message);
        console.log('>type: ', type);
        console.log('>content: ', content);
        if ( 'a' ) {
            onHandler[type](message);
        }
        else {
            console.log('>empty');
        }
    } 
});


class Datagram {
    constructor(id, payload,headerSrc,headerDst,headerLength)  {
        this.payload= payload;
        this.headerSrc=headerSrc;
        this.headerDst=headerDst;
        this.headerLength=headerLength;
        this.headerChecksum=null;
        this.headerId=id;
    }
}

// take the data and return it in an not wrapped datagram
/**
 * wrapp the datagram into a packet to be and send forth
 * @param {*} data, the data to become a new Datagram object
 * @param { int } id, the header ID (int)
 */
function socketWrapper(data, id){
    var packet = new Datagram(id, data, HOST, HOST,0);
    console.log('>(from wrapper) datagram ' + JSON.stringify(packet));
    size = new Buffer.from("dt|" + JSON.stringify( packet));
    packet.headerLength = size.length;
    return packet;
}

function unwrapBuffer(message) {
    var data = message.toString().replace("dt", "").replace('|','') ;
    var recieved = JSON.parse(data);
    console.log('>>');
    console.log('>Unwrapped ' + data);
    console.log('>payload ' + recieved['payload']);
    console.log(' ');
    return recieved;
}

const unwrapper = {
    'dt': (message) => {
        console.log(">> Message " + message.toString());
        console.log(">> RAW " + message);
        var data = message.toString().replace("dt", "").replace('|','');
        console.log('> Unboxing ' + data + 'typeof data: ' + typeof(data));
        var recieved = JSON.parse(data);
        console.log('>>');
        console.log('>Unwrapped ' + data);
        console.log('>payload ' + recieved['payload']);
        console.log(' ');
        return recieved;
    },
    'message': (message) => {
        var data = message.toString().replace("message", "").replace('|','');
        var recieved = JSON.parse(data);
        // console.log('>>');
        // console.log('>Unwrapped ' + data);
        // console.log('>(from unwrapper) Message ' + recieved['payload']);
        console.log(' ');
        return recieved;
    },
    'ACK':(message) => {
        var data = message.toString().replace("ACK", "").replace('|','');
        // console.log('> Unboxing ' + data);
        var recieved = JSON.parse(data);
        console.log('>>');
        // console.log('>Unwrapped ' + data);
        // console.log('>payload ' + recieved['payload']);
        console.log(' ');
        return recieved;
    }, 
    'NACK': (message) => {
        var data = message.toString().replace('NAK', "").replace('|','');
        var parsed = JSON.parse(data);
        return parsed;
    },
    'SMPH': (message) => {
        var data = message.toString().replace('SMPH', "").replace('|','');
        var parsed = JSON.parse(data);
        return parsed;
    }

}

/**
 * wrapp the datagram into a packet to be and send forth
 * @param {*} packet the datagram to send
 */
function sendSocket(datagram, type) {
    packet = new Buffer.from(type + JSON.stringify(datagram));
    server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
        console.log('>Typesent ' + typeof(packet) );
        console.log('>Sent ' + packet);
        // console.log('>Pure ' + type );
        console.log('>>');
      });
}

const onHandler = {
    'SYN': (message) => {
        var ack = new Buffer.from('ACK');
        server.send(ack, 0, ack.length, CLIENT_PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>SYN recieved from' + HOST +':'+ PORT);
            console.log('>APROVED: Sendind ACK');
          });
    },
    'SYNACK': (message) => {
        var helo = new Buffer.from("HELO from Server");
        server.send(helo, 0, helo.length, CLIENT_PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>SYNACK recieved from' + HOST +':'+ PORT);
            console.log('>HandShake completed \n>Listening... UwU q(≧▽≦q)');
          });
    },
    'dt': (message) => {
        var dtRcvd = unwrapper['dt'](message);
        console.log(">Datagram from "+remote.address+":" + remote.port + "\n"+ dtRcvd.payload);
        console.log(" ");
        console.log('>Header.id ' + dtRcvd.headerId);

        var wrapped = socketWrapper("ACK"+dtRcvd.headerId, dtRcvd.headerId) ;

        console.log('>(from on.message) has dt => ' + JSON.stringify(wrapped));
        // sendSocket(wrapped, 'ACK');
        sendSocketDg['ACK'](wrapped, dtRcvd.headerId);
        console.log('UDP ACK returned to ' + HOST +':'+ PORT);
    },
    'ACK': (message) => {
        console.log(" ");
        console.log(">"+message);
        var unboxed = unwrapper['ACK'](message);
        ackHistory[unboxed.headerId] = true;
        console.log(">>Gotcha catch 'em all!! ~o( =∩ω∩= )m┏ (゜ω゜)=☞ GOT: " + unboxed['payload'] + ' id: ' + unboxed['headerId']);
        // sendSocketDg["message"]();
    },
    'message': (message) => {
        console.log(' ');
        var unboxed = unwrapper['message'](message);
        console.log('>message received ' + JSON.stringify(unboxed) );
        var wrapped = socketWrapper("ACK"+unboxed.headerId, unboxed.headerId) ;
        sendSocketDg['ACK'](wrapped);
    },
    'NAK': (message) => {
        var nack = unwrapper['NACK'](message);
        var resend = history['get'](nack.id)
        sendSocketDg['dt'](resend);
        console.log(">NAK:"+ nack.id + " resending = " + JSON.stringify(resend));
    },
    'SMPH': (message) => {
        var unboxed = unwrapper['SMPH'](message);
        console.log('>unbox ' + JSON.stringify(unboxed));
        // var parsed = JSON.parse(unboxed);
        receiving[rid] = unboxed.idRange;
        rid++;
        console.log(">SMPH request aproved, sending SMPHACK...");
        sendSocketDg['SMPHACK']();
    },
    'SMPHACK': (message) => {
        if (rid >0) {
            var start = receiving[rid-1].split('-')[0];
            var end = receiving[rid-1].split('-')[1];
        }
        for (let id = start; id <= end; id++) {
            sendSocketDg['dt'](history['get'](id));
        }
    }
}



var id = 0;
var range;
var rid = 0; // receiving id
const sendSocketDg = {
    "dt":
        (datagram) => {
            var packet = new Buffer.from("dt|" + JSON.stringify(datagram));
            console.log('\n>Sending '+ JSON.stringify(datagram) + ' tipo ' + typeof(datagram));
            server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP datagram sent to ' + HOST +':'+ PORT);
            });
    },
    'SMPH':  // Simple Multi-Packet Header
        (dtList) => {
            var first = id;
            // dtList.forEach((datagram) => {
            for (key in dtList) {
                history['add'](dtList[key], id);
                id = id + 1;
            }
            // });
            var last = id;
            var range = first + '-' + last;
            var obj =  {};
            obj[idRange] = range;
            var packet = new Buffer.from('SMPH|'+ JSON.stringify(obj));
            server.send(packet, 0, packet.length, PORT, HOST, (err, bytes) => {
                if (err) throw err;
                console.log('>SMPH request sent awaiting SMPHACK...');
            });
    },
    'SMPHACK':
        () => {
            var message = new Buffer.from("SMPHACK");
            server.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
                if (err) throw err;
                console.log('>SMPH accepted awaiting pkts...');
            });
            console.log(' ');
    },
    "ACK":
            (datagram) => {
            var packet = new Buffer.from("ACK|" + JSON.stringify(datagram));
            server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP ACK retured to ' + HOST +':'+ PORT);
            });
    },
    "message": 
            (message, id) => {
                var datagram = socketWrapper(message, id);
                var packet = new Buffer.from('message|' + JSON.stringify(datagram));
                server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
                if (err) throw err;
                console.log('UDP message to ' + HOST +':'+ PORT);
                });
    },
    'NAK': (id) => {
            var datagram = socketWrapper(' {"id":'+id+'} ');
            var packet = new Buffer.from('NAK|' + JSON.stringify(datagram));
            server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP NAK to ' + HOST +':'+ PORT);
            });
    }
}


server.bind(PORT, HOST);
console.log('(❤´艸｀❤)(⓿_⓿)')