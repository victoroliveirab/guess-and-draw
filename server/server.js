var PORT = 33333;
var HOST = '127.0.0.1';

var CLIENT_PORT = "4266";

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

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

    if (Buffer.compare(syn, message) === 0) {
        var ack = new Buffer.from('ACK');
        server.send(ack, 0, ack.length, CLIENT_PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>SYN recieved from' + HOST +':'+ PORT);
            console.log('>APROVED: Sendind ACK');
          });
    } 
    else if (Buffer.compare(synack, message) === 0) {
        var helo = new Buffer.from("HELO from Server");
        server.send(helo, 0, helo.length, CLIENT_PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('>SYNACK recieved from' + HOST +':'+ PORT);
            console.log('>HandShake completed \n>Listening...');
          });
    } 
    else if (message.toString().match('dt')) {
        var dtRcvd = unwrapBuffer(message);
        console.log(">Datagram from "+remote.address+":" + remote.port + "\n"+ dtRcvd.payload);
        console.log(" ");
        console.log('>Header.id ' + dtRcvd.headerId);
        var wrapped = socketWrapper("ACK"+dtRcvd.headerId, dtRcvd.headerId) ;
        console.log('>(from on.message) has dt => ' + JSON.stringify(wrapped));
        sendSocket(wrapped, 'ACK');
        console.log('UDP ACK returned to ' + HOST +':'+ PORT);
    }
    else {
        console.log('>incoming msg from ' + remote.address + ':' + remote.port +' - ' + message);
    } 
});

// function messageHandler(message, remote) {
//     if (message === 'SYN') {
//         var ack = socketWrapper("ACK");
//         server.send(ack, 0, ack.length, PORT, HOST, function(err, bytes) {
//             if (err) throw err;
//             console.log('>SYN recieved from' + HOST +':'+ PORT);
//             console.log('>APROVED: Sendind ACK');
//           });
//     } 
// }

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
    size = new Buffer.from("dt" + JSON.stringify( packet));
    packet.headerLength = size.length;
    return packet;
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

const sendSocketDg = {
    "dt":
        (packet) => {
            var packet = new Buffer.from("dt" + JSON.stringify(datagram));
            server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP datagram sent to ' + HOST +':'+ PORT);
            });
    },
    "ack":
            (packet) => {
            var packet = new Buffer.from("ACK" + JSON.stringify(datagram));
            server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP ACK retured to ' + HOST +':'+ PORT);
            });
    },
    "message": 
        (message, id) => {
            var datagram = socketWrapper(message, id);
            var packet = new Buffer.from(JSON.stringify(datagram));
            server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP ACK retured to ' + HOST +':'+ PORT);
            });
        }
}

function sendSocketDgw(datagram) {
    var acket = new Buffer.from("dt" + JSON.stringify(datagram));
    server.send(packet, 0, packet.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
      });
}
server.bind(PORT, HOST);