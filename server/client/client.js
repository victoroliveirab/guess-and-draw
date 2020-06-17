var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');

var client = dgram.createSocket('udp4');


class Datagram {
  constructor(id, payload, headerSrc, headerDst, headerLength) {
    this.payload = payload;
    this.headerSrc = headerSrc;
    this.headerDst = headerDst;
    this.headerLength = headerLength;
    this.headerChecksum = null;
    this.headerId = id;
  }
}

client.on('listening', () => {
  const address = client.address();
  console.log(`>client listening ${address.address}:${address.port}`);
  // console.log('>Client listening on ' + address.address + ':' + address.port);
});


var sentHistory = {};
var ackHistory = {};
var receiving = {};
var id = 0;
var range;
var rid = 0; // receiving idvar id = 0;

const history = {
  'add': (message, id) => {
    sentHistory[id] = message;
    console.log('>New History entry:' + (parseInt(id) + 1));
  },
  'remove': (id) => {
    delete sentHistory[id];
    console.log('>WHOOSH ' + id + 'went down the toilet');
  },
  'show': () => {
    console.log(">>")
    console.log('>>>>> Hitowy( •̀ ω •́ )✧ <<<<')
    for (key in sentHistory) {
      console.log(sentHistory[ke]);
    }
  },
  'get': (id) => {
    return sentHistory[id];
  }
}

const sendSocketDg = {
  "dt":
    /**
     * Stringfy a datagram, tags with dt| and sends
     */
    (datagram) => {
      var packet = new Buffer.from("dt|" + JSON.stringify(datagram));
      client.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP ( •̀ ω •́ )✧ datagwam sent to ' + HOST + ':' + PORT + ' id: ' + datagram.headerId);
      });
    },
  "ACK":
    (packet) => {
      var packet = new Buffer.from("ACK|" + JSON.stringify(datagram));
      client.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP ACK retured to ' + HOST + ':' + PORT);
      });
    },
  "message":
    (message, id) => {
      var datagram = socketWrapper(message, id);
      var packet = new Buffer.from('message|' + JSON.stringify(datagram));
      client.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message to UwU ' + HOST + ':' + PORT);
      });
    },
  'NAK': (id) => {
    var datagram = socketWrapper("Pkd N" + id + " not received", id);
    var packet = new Buffer.from('NAK|' + JSON.stringify(datagram));
    client.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
      if (err) throw err;
      console.log('UDP NAK to ' + HOST + ':' + PORT);
    });
  },
  'SMPH':  // Simple Multi-Packet Header
    (dtList) => {
      var first = id;
      for (key in dtList) {
        history['add'](dtList[key], id);
        id = id + 1;
      }
      var last = id;
      var range = first + '-' + last;
      var packet = new Buffer.from('SMPH|' + JSON.stringify({ idRange: range }));
      client.send(packet, 0, packet.length, PORT, HOST, (err, bytes) => {
        if (err) throw err;
        console.log('>SMPH request sent awaiting ...');
      });
      console.log('>Sending SMPH request awaiting ...');
    }
  // ,
  // 'SMPHACK':
  //     () => {
  //         var message = new Buffer.from("SMPHACK");
  //         client.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
  //             if (err) throw err;
  //             console.log('>SMPHACK sent awaiting packets...');
  //         });
  //         console.log(' ');
  // }
}

const onHandler = {
  'ACK': (message) => {
    if (handshaked === false) {
      var synack = new Buffer.from("SYNACK");
      client.send(synack, 0, synack.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('>ACK recieved from' + HOST + ':' + PORT);
        console.log('>APROVED: Sendind SYNACK');
      });
      handshaked = true;
    } else {
      console.log(">" + message);
      console.log(" ");
      console.log(">>Gotcha catch 'em all!!");
      // sendSocketDg["message"]();
    }
  },
  'message': (message) => {
    console.log(' ');
    var unboxed = unwrapper['message'](message);
    console.log('>message received ' + JSON.stringify(unboxed));
    var wrapped = socketWrapper("ACK" + unboxed.headerId, unboxed.headerId);
    sendSocketDg['ACK'](wrapped);
  },
  'dt': (message) => {
    var dtRcvd = unwrapper['dt'](message);
    console.log(">Packet from " + remote.address + ":" + remote.port + "\n" + dtRcvd);
    console.log(" ");
    // sendSocket(socketWrapper("ACK", dtRcvd.headerId));
    var wrapped = socketWrapper("ACK" + unboxed.headerId, unboxed.headerId);
    sendSocketDg['ACK'](wrapped);
  },
  'NAK': (message) => {
    var nack = unwrapper['NACK'](message);
    var resend = history['get'](nack.id)
    sendSocketDg['dt'](resend);
    console.log(">NAK:" + nack.id + " resending = " + JSON.stringify(resend));
  },
  'SMPH': (message) => {
    var unboxed = unwrapper['SMPH'](message);
    var parsed = JSON.parse(unboxed);
    receiving[rid] = parsed.idRange;
    rid++;
    console.log(">SMPH request aproved, sending SMPHACK...");
    sendSocketDg['SMPHACK']();
  },
  /**
   * After sending id of upcoming pkts, sends the pkts
   */
  'SMPHACK': (message) => {
    if (rid > 0) {
      var start = receiving[rid - 1].split('-')[0];
      var end = receiving[rid - 1].split('-')[1];
    }
    for (let id = start; id <= end; id++) {
      console.log('>>Sending ' + history['get'](id));
      sendSocketDg['dt'](history['get'](id));
    }
  }
}

/**
 * Replace the content of messageHandler of server.on('message', messageHandler), with of this function
 * ps: add the post suffix | to sendSocketDg
 */
var syn = new Buffer.from("SYN");
var synack = new Buffer.from("SYNACK");
// function messageHandlerReplacement(message, remote) {

//     var stringed = message.toString();
//     var type = stringed.split('|')[0];
//     var jsoned = stringed.split('|')[1];
//     onHandler[type](message);

//     // preservar esse ↓
//     if (message.toString().match("HELO") && handshaked) {
//         console.log(">"+message);
//         console.log(" ");
//         sendSocket(socketWrapper("Just livin on database wooo wooo", 0),"message");

//     } 



// }


const unwrapper = {
  'dt': (message) => {
    var data = message.toString().replace("dt", "").replace('|', '');
    console.log('> Unboxing ' + data + 'typeof data: ' + typeof (data));
    var recieved = JSON.parse(data);
    console.log('>>');
    console.log('>Unwrapped ' + data);
    console.log('>payload ' + recieved['payload']);
    console.log(' ');
    return recieved;
  },
  'message': (message) => {
    var data = message.toString().replace("message", "").replace('|', '');
    var recieved = JSON.parse(data);
    // console.log('>>');
    // console.log('>Unwrapped ' + data);
    // console.log('>(from unwrapper) Message ' + recieved['payload']);
    console.log(' ');
    return recieved;
  },
  'ACK': (message) => {
    var data = message.toString().replace("ACK", "").replace('|', '');
    // console.log('> Unboxing ' + data);
    var recieved = JSON.parse(data);
    console.log('>>');
    // console.log('>Unwrapped ' + data);
    // console.log('>payload ' + recieved['payload']);
    console.log(' ');
    return recieved;
  },
  'NACK': (message) => {
    var data = message.toString().replace('NAK', "").replace('|', '');
    var parsed = JSON.parse(data);
    return parsed;
  },
  'SMPH': (message) => {
    var data = message.toString().replace('SMPH', "").replace('|', '');
    var parsed = JSON.parse(data);
    return parsed;
  }

}

// take the data and return it in an not wrapped datagram
/**
 * wrapp the data into a datagram for buffering and sent
 * @param {*} data, the data to become a new Datagram object
 * @param { int } id, the header ID (int)
 * @returns  {*} datagram
 */
function socketWrapper(data, id) {
  var packet = new Datagram(id, data, HOST, HOST, 0);
  // console.log('>(from wrapper) datagram ' + JSON.stringify(packet));
  size = new Buffer.from("dt" + JSON.stringify(packet));
}
function socketWrapper(data, id) {
  var packet = new Datagram(id, data, HOST, HOST, 0);
  size = new Buffer.from("dt" + JSON.stringify(packet));
  packet.headerLength = size.length;
  return packet;
}


// funcao pra testes do SMPH (dropado ate NAK completo)
function secureChTest() {
  var data = "I'm packet n";

  var list = {};
  for (let i = 0; i < 10; i++) {
    var boxed = socketWrapper(data + i, i + 1);
    console.log('>boxed ' + i + " content " + JSON.stringify(boxed));
    list[i] = boxed;
  }

  sendSocketDg['SMPH'](list);
}

function unwrapBuffer(message) {
  var data = message.toString().replace("dt", "");
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
  client.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
    console.log('>Typesent ' + typeof (packet));
    console.log('>Sent ' + type);
    // console.log('>Pure ' + type );
    console.log('>>');
  });
}


let handshaked = false;
client.on('message', function messageHandler(message, remote) {

  var stringed = message.toString();
  var type = stringed.split('|')[0];
  // var jsoned = stringed.split('|')[1];
  console.log('>message type ' + type);
  // preservar esse ↓
  if (message.toString().match("HELO") && handshaked) {
    console.log(">" + message);
    console.log(" ");
    // sendSocket(socketWrapper("Just livin on database wooo wooo", 0),"message|");
  } else {
    onHandler[type](message);
  }


});

function init3WHandShake() {
  var syn = new Buffer.from("SYN");

  client.send(syn, 0, syn.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('>SYN sent, awating ACK');
  });
}

client.bind("4266", HOST)

init3WHandShake();
console.warn("WHEEEEEW");
console.log('(* ￣︿￣)◑﹏◐');
// setTimeout(secureChTest, 1500);


