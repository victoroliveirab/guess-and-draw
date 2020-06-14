var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
// var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');
// client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
//   if (err) throw err;
//   console.log('HELO from oldman.client at ' + HOST +':'+ PORT);
//   client.close();
// });
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

// function msgHandler(message, remote) {
//     if (message === 'ACK') {
//         var synack = socketWrapper("SYNACK");
//         client.send(ack, 0, ack.length, PORT, HOST, function(err, bytes) {
//             if (err) throw err;
//             console.log('>ACK recieved from' + HOST +':'+ PORT);
//             console.log('>APROVED: Sendind SYNACK'); 
//           });
//     } 
//     else {
//         var synack = socketWrapper("SYNACK");
//         client.send(ack, 0, ack.length, PORT, HOST, function(err, bytes) {
//             if (err) throw err;
//             console.log('>ACK recieved from' + HOST +':'+ PORT);
//             console.log('>APROVED: Sendind SYNACK');
//           });
//     }
// }

client.on('listening', () => {
    const address = client.address();
    console.log(`>client listening ${address.address}:${address.port}`);
    // console.log('>Client listening on ' + address.address + ':' + address.port);
});

const sendSocketDg = {
    "dt":
        (datagram) => {
            var packet = new Buffer.from("dt" + JSON.stringify(datagram));
            client.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP ( •̀ ω •́ )✧ datagwam sent to ' + HOST +':'+ PORT + ' id: ' + datagram.headerId);
            });
    },
    "ACK":
            (packet) => {
            var packet = new Buffer.from("ACK" + JSON.stringify(datagram));
            client.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP ACK retured to ' + HOST +':'+ PORT);
            });
    },
    "message": 
            (message, id) => {
                var datagram = socketWrapper(message, id);
                var packet = new Buffer.from('message' + JSON.stringify(datagram));
                client.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
                if (err) throw err;
                console.log('UDP message to ' + HOST +':'+ PORT);
                });
            }
}

const unwrapper = {
    'dt': (message) => {
        var data = message.toString().replace("dt", "") ;
        var recieved = JSON.parse(data);
        console.log('>>');
        console.log('>Unwrapped ' + data);
        console.log('>payload ' + recieved['payload']);
        console.log(' ');
        return recieved;
    },
    'message': (message) => {
        var data = message.toString().replace("message", "") ;
        var recieved = JSON.parse(data);
        console.log('>>');
        console.log('>Unwrapped ' + data);
        console.log('>(from unwrapper) Message ' + recieved['payload']);
        console.log(' ');
        return recieved;
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
    // console.log('>(from wrapper) datagram ' + JSON.stringify(packet));
    size = new Buffer.from("dt" + JSON.stringify( packet));
    packet.headerLength = size.length;
    return packet;
}

function secureChTest() {
    var data = "I'm packet n";
    for (let i = 0; i < 10; i++) {
        var boxed = socketWrapper(data+i, i+1);
        sendSocketDg['dt'](boxed);
    }
}

function unwrapBuffer(message) {
    var data = message.toString().replace("dt", "") ;
    var recieved = JSON.parse(data);
    console.log('>>');
    console.log('>Unwrapped ' + data);
    console.log('>payload ' + recieved['payload']);
    console.log(' ');
    return recieved;
}

function timedSend() {
    // timeout for ack
}

function reliableSnd(datagram) {
    // sends ack back

}

/**
 * wrapp the datagram into a packet to be and send forth
 * @param {*} packet the datagram to send
 */
function sendSocket(datagram, type) {
    packet = new Buffer.from(type + JSON.stringify(datagram));
    client.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
        console.log('>Typesent ' + typeof(packet) );
        console.log('>Sent ' + type);
        // console.log('>Pure ' + type );
        console.log('>>');
      });
}

let handshaked = false;
client.on('message', function messageHandler(message, remote) {

    if (message.toString() === 'ACK' && handshaked === false) {
        var synack = new Buffer.from("SYNACK");
        client.send(synack, 0, synack.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>ACK recieved from' + HOST +':'+ PORT);
            console.log('>APROVED: Sendind SYNACK'); 
          }); 
        handshaked = true;
    } else if (message.toString().match("HELO") && handshaked) {
        console.log(">"+message);
        console.log(" ");
        sendSocket(socketWrapper("Just livin on database wooo wooo", 0),"message");

    } 
    else if (message.toString().match('message')) {
        console.log(' ');
        var unboxed = unwrapper['message'](message);
        console.log('>message received ' + JSON.stringify(unboxed) );
        var wrapped = socketWrapper("ACK"+unboxed.headerId, unboxed.headerId) ;
        sendSocketDg['ACK'](wrapped);

    }
    // secure channel recieving
    else if (message.toString().match('dt')) {
        var dtRcvd = unwrapBuffer(message);
        console.log(">Packet from "+remote.address+":" + remote.port + "\n"+dtRcvd);
        console.log(" ");
        sendSocket(socketWrapper("ACK", dtRcvd.headerId));

    }
    else if (message.toString().match("ACK")) {
        console.log(">"+message);
        console.log(" ");
        console.log(">>Gotcha catch 'em all!!");
        // sendSocketDg["message"]();
    }
    else {
        console.log('>incoming msg from ' + remote.address + ':' + remote.port +' - ' + message);
    } 
});

function init3WHandShake() {
    var syn = new Buffer.from("SYN");

    client.send(syn, 0, syn.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('>SYN sent, awating ACK');
    });
}

client.bind("4266", HOST)
init3WHandShake();
console.warn("WHEEEEEW");
console.log('(* ￣︿￣)◑﹏◐');
setTimeout(secureChTest, 1500);