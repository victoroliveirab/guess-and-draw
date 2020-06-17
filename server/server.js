const { timestampLog } = require('./utils');

var PORT = 33333;
var HOST = '127.0.0.1';

var CLIENT_PORT = "4266";

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var sentHistory = {};
var ackHistory = {};
var receiving = {};

const history = {
    add: (message, id) => {
        sentHistory[id] = message;
        timestampLog(`Added id: ${sentHistory}`);
    },
    remove: (id) => {
        delete sentHistory[id];
        timestampLog(`WHOOSH: ${id} went down the toilet`);
    },
    show: () => {
        timestampLog('>>>>> History <<<<');
        sentHistory.forEach(element => {
            timestampLog(`History id: ${element.id} - Content: ${element.message}`);
        });
    },
    get: (id) => sentHistory[id]
}

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    timestampLog(`UDP Server listening at ${address.address}:${address.port}`);
});

server.on('message', function messageHandler(message, remote) {
    var syn = new Buffer.from("SYN");
    var synack = new Buffer.from("SYNACK");

    const [type, content] = message.toString().split('|');

    if (Buffer.compare(synack, message) === 0) {
        const hello = new Buffer.from('Server says hello');
        server.send(hello, 0, hello.length, CLIENT_PORT, HOST, (err, bytes) => {
            if (err) throw err;
            timestampLog(`SYNACK received from ${HOST}:${PORT}`);
            timestampLog(`Handshake now completed. Listening...`);
        });
    }
    else {
        timestampLog(`Message type: ${type}`);
        timestampLog(`Message content: ${content}`);
        onHandler[type](message);
    }
});


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

function socketWrapper(data, id) {
    const packet = new Datagram(id, data, HOST, HOST, 0);
    timestampLog(`Datagram from wrapper: ${JSON.stringify(packet)}`);
    size = new Buffer.from("dt|" + JSON.stringify(packet));
    packet.headerLength = size.length;
    return packet;
}

function unwrapBuffer(message) {
    const data = message.toString().replace('dt', '').replace('|', '');
    const received = JSON.parse(data);
    timestampLog(`Unwrapped buffer: ${data}`);
    timestampLog(`Payload: ${received.payload}`);
    return received;
}

const unwrapper = {
    dt: (message) => {
        timestampLog(`Message: ${message.toString()}`);
        timestampLog(`Raw message: ${message}`);
        const data = message.toString().replace('dt', '').replace('|', '');
        timestampLog(`Unboxing ${data} typeof data: ' + typeof (data)`);
        const parsed = JSON.parse(data);
        timestampLog(`Unwrapped ${data}`);
        timestampLog(`Payload ${received.payload}`);
        return parsed;
    },
    message: (message) => {
        const data = message.toString().replace('message', '').replace('|', '');
        const parsed = JSON.parse(data);
        return parsed;
    },
    ACK: (message) => {
        const data = message.toString().replace('ACK', '').replace('|', '');
        const parsed = JSON.parse(data);
        return parsed;
    },
    NACK: (message) => {
        const data = message.toString().replace('NAK', '').replace('|', '');
        const parsed = JSON.parse(data);
        return parsed;
    },
    SMPH: (message) => {
        const data = message.toString().replace('SMPH', '').replace('|', '');
        const parsed = JSON.parse(data);
        return parsed;
    }

}

function sendSocket(datagram, type) {
    packet = new Buffer.from(type + JSON.stringify(datagram));
    server.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        timestampLog('UDP message sent to ' + HOST + ':' + PORT);
        timestampLog(`Package type: ${typeof (packet)}`);
        timestampLog(`Package sent: ${packet}`);
    });
}

const onHandler = {
    SYN: (message) => {
        const ack = new Buffer.from('ACK');
        server.send(ack, 0, ack.length, CLIENT_PORT, HOST, function (err, bytes) {
            if (err) throw err;
            timestampLog(`SYN received from ${HOST}:${PORT}`);
            timestampLog('APPROVED: Sendind ACK');
        });
    },
    SYNACK: (message) => {
        const hello = new Buffer.from("HELO from Server");
        server.send(hello, 0, hello.length, CLIENT_PORT, HOST, function (err, bytes) {
            if (err) throw err;
            timestampLog(`SYNACK received from ${HOST}:${PORT}`);
            timestampLog('Handshake done');
        });
    },
    dt: (message) => {
        const dtRcvd = unwrapper['dt'](message);
        timestampLog(`Datagram from ${remote.address}:${remote.port}`);
        timeStampLog(`Payload: ${dtRcvd.payload}`);
        timestampLog(`Header Id: ${dtRcvd.headerId}`);

        const wrapped = socketWrapper('ACK' + dtRcvd.headerId, dtRcvd.headerId);

        timestampLog(`Datagram: ${JSON.stringify(wrapper)}`);
        sendSocketDg['ACK'](wrapped, dtRcvd.headerId);
        timestampLog(`UDP ACK returned to ${HOST}:${PORT}`);
    },
    ACK: (message) => {
        timestampLog(`Message: ${message}`);
        const unboxed = unwrapper['ACK'](message);
        ackHistory[unboxed.headerId] = true;
        timestampLog(`Got: ${unboxed.payload} and id: ${unboxed.headerId}`);
    },
    message: (message) => {
        const unboxed = unwrapper['message'](message);
        timestampLog(`Message received: ${JSON.stringify(unboxed)}`);
        const wrapped = socketWrapper("ACK" + unboxed.headerId, unboxed.headerId);
        sendSocketDg['ACK'](wrapped);
    },
    NAK: (message) => {
        const nack = unwrapper['NACK'](message); // nack mesmo?
        const resend = history['get'](nack.id)
        sendSocketDg['dt'](resend);
        timestampLog(`NAK #${nack.id} resending: ${JSON.stringify(resend)}`);
    },
    SMPH: (message) => {
        const unboxed = unwrapper['SMPH'](message);
        timestampLog(`Unboxed: ${JSON.stringify(unboxed)}`);
        receiving[rid] = unboxed.idRange;
        rid++;
        timestampLog('SMPH request aproved, sending SMPHACK...');
        sendSocketDg['SMPHACK']();
    },
    SMPHACK: (message) => {
        if (rid > 0) {
            const start = receiving[rid - 1].split('-')[0];
            const end = receiving[rid - 1].split('-')[1];
        }
        for (let id = start; id <= end; id++) {
            sendSocketDg['dt'](history['get'](id));
        }
    }
}



var id = 0;
var rid = 0; // receiving id
const sendSocketDg = {
    dt: (datagram) => {
        const datagramString = JSON.stringify(datagram);
        const packet = new Buffer.from(`dt|${datagramString}`);
        timestampLog(`Sending ${datagramString} of type ${typeof datagram}`);
        server.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            timestampLog(`UDP datagram sent to ${HOST}:${PORT}`);
        });
    },
    SMPH: (dtList) => {
        const first = id;
        for (key in dtList) {
            history['add'](dtList[key], id);
            id = id + 1;
        }
        const last = id;
        const range = first + '-' + last;
        const obj = {};
        obj[idRange] = range;
        const packet = new Buffer.from(`SMPH|${JSON.stringify(obj)}`);
        server.send(packet, 0, packet.length, PORT, HOST, (err, bytes) => {
            if (err) throw err;
            timestampLog('SMPH request sent... Awaiting SMPHACK...');
        });
    },
    SMPHACK: () => {
        const message = new Buffer.from('SMPHACK');
        server.send(message, 0, message.length, PORT, HOST, (err, bytes) => {
            if (err) throw err;
            timestampLog('SMPH accepted... Awaiting packages...');
        });
    },
    ACK: (datagram) => {
        const packet = new Buffer.from(`ACK|${JSON.stringify(datagram)}`);
        server.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            timestampLog(`UDP ACK retured to ${HOST}:${PORT}`);
        });
    },
    message: (message, id) => {
        const datagram = socketWrapper(message, id);
        const packet = new Buffer.from(`message|${JSON.stringify(datagram)}`);
        server.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            timestampLog(`UDP message to ${HOST}:${PORT}`);
        });
    },
    NAK: (id) => {
        const datagram = socketWrapper(' {"id":' + id + '} ');
        const packet = new Buffer.from(`NAK|${JSON.stringify(datagram)}`);
        server.send(packet, 0, packet.length, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            timestampLog(`UDP NAK to ${HOST}:${PORT}`);
        });
    }
}


server.bind(PORT, HOST);
timestampLog('Starting server...');