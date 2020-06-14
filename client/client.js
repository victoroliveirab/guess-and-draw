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


function socketWrapper(data, id){
    var packet = new Datagram(id, data, HOST, HOST,0);
    size = new Buffer.from("dt" + JSON.stringify(packet));
    packet.headerLength = size.length;
    return packet;
}

function secureChTest() {
    var data = "I'm packet n";
    for (let i = 0; i < 10; i++) {

    }
}

function unwrapBuffer(message) {
    var datagramJSON = (message.toString());
    var recieved = JSON.parse(datagramJSON);
    return recieved;
}

function timedSend() {
    // timeout for ack
}

function reliableSnd(datagram) {
    // sends ack back

}

function sendSocket(datagram) {
    packet = new Buffer.from("dt" + JSON.stringify( datagram));
    client.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
      });
}

client.on('message', function messageHandler(message, remote) {
    if (message.toString() === 'ACK') {
        var synack = new Buffer.from("SYNACK");
        client.send(synack, 0, synack.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>ACK recieved from' + HOST +':'+ PORT);
            console.log('>APROVED: Sendind SYNACK'); 
          }); 
    } else if (message.toString().match("HELO")) {
        console.log(">"+message);
        console.log(" ");
        sendSocket(socketWrapper("Just livin on database wooo wooo", 0) );
    } 
    // secure channel recieving
    else if (message.toString().match('dt')) {
        var dtRcvd = unwrapBuffer(message);
        console.log(">Packet from "+remote.address+":" + remote.port + "\n"+dtRcvd);
        console.log(" ");
        sendSocket(socketWrapper("ACK"+dtRcvd.headerId, dtRcvd.headerId));
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