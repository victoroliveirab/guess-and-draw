import * as CryptoJS from 'crypto-js';

const encryptx = (string, key) => {
  // console.log(string);
  return CryptoJS.AES.encrypt(string, key).toString();
}

const sketch = (p) => {

    const url = "b449f2c643c1.ngrok.io"
    const connection = new WebSocket("ws://" + url);
    const button = document.querySelector("#send");

    let pk;
    let prime;
    let gio;
    let key;
    let canvas;
    let canvaColor = "#f0f0f0";
    let height = 400;
    let width = 700;
    let color;
    let del = 0;
    let rst = 0;
    let rstFlag = false;
    let delFlag = false;
    let moves = [];
    let lastMove = [];
    let drawMode = true;

    let fun = {
      clear: function() {
        p.background(canvaColor);
        delFlag = !delFlag;
      },
      drawColor: function() {
        p.fill(color);
        p.noStroke();
        let x = Math.floor(p.mouseX);
        let y  = Math.floor(p.mouseY);
        if(!fun.eraserMode()){
          p.rect(x, y, 3, 3);
          fun.getLastMove();
        }else{
          p.ellipse(x, y, 40, 40);
        }
      },
      delLastMove: function() {
        let a = moves.pop();
        try {
          a.map(item => {
            p.fill(canvaColor);
            p.rect(item.x, item.y, 3, 3);
            let x = Math.floor(item.x);
            let y  = Math.floor(item.x);
            let crypt = encryptx(JSON.stringify({mouseX: x, mouseY: y, color: canvaColor}), key);
            // connection.send(crypt);
          });
        }catch (err){

        }
        rstFlag = !rstFlag;
      },
      getLastMove: function() {
        let pos  = {};
        pos['x'] = Math.floor(p.mouseX);
        pos['y'] = Math.floor(p.mouseY);
        lastMove.push(pos);
      },
      inCanva: function() {
        // I don't like terciary ops.
        let x = p.mouseX;
        let y = p.mouseY;
        if(canvas && (x > 0 && x <= width) && (y > 0 && y <= height)){
          return true
        }else{
          return false
        }
      },
      eraserMode: function() {
        if(color === canvaColor){
          return true
        }
        return false
      }

    }

    connection.onopen = (event) => {
      console.log("WebSocket is open now.");
      console.log(event);
    };

    connection.onclose = (event) => {
      console.log("WebSocket is closed now.");
    };

    connection.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    connection.onmessage = (event) => {
      let data = JSON.parse(event.data);
      // console.log('data');
      // console.log(data);
      if(data.p && data.g){
        prime = data.p;
        gio = data.g;
        pk = Math.floor(Math.random() * 9) + 2;
        // console.log('pk:', pk);
        let jesus = Math.pow(gio, pk) % prime;
        console.log(`${gio}^${pk} % ${prime} = ${jesus}`);
        connection.send(JSON.stringify({ketchup: jesus}));
      }else if(data.ketchup){
        key = Math.pow(data.ketchup, pk) % prime;
        console.log('key:',key);
        key = key.toString();
        console.log(`${data.ketchup}^${pk} % ${prime} = ${key}`);
      }else{
        const { mouseX, mouseY, color} = JSON.parse(event.data);
        if(color){
          p.fill(color);
          p.rect(mouseX, mouseY, 3, 3);
        }
      }
    };

    p.mouseReleased = () => {
      if (fun.inCanva() && !fun.eraserMode()) {
        moves.push(lastMove);
        lastMove = [];
      }
    }

    //Adicionar bound esquedo e superior no if
    p.mouseDragged = () => {
      if (fun.inCanva()) {
        fun.drawColor();
        //console.log(p.mouseX, p.mouseY);
        let mouseX = Math.floor(p.mouseX);
        let mouseY = Math.floor(p.mouseY);
        let crypt = encryptx(JSON.stringify({mouseX, mouseY, color}),key);
        // connection.send(crypt);
      }
      return false;
    }
    
    p.setup = () => {
      canvas = p.createCanvas(width, height);
      p.background(canvaColor);
      p.noStroke();
      p.frameRate(60);

    }
    
    p.draw = () => {
      if(drawMode){
        if(delFlag){
          fun.clear();
        }else if(rstFlag){
          fun.delLastMove();
        }
      }else{
        // let new pixel = com func
        // draw new pixel 
      }
    }

    // o Wrapper usa essa função para pegar props : )
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        color = props.color;
        if(del !== props.del){
            delFlag = !delFlag;
            del = props.del;
        }
        if(rst !== props.rst){
          rstFlag = !rstFlag;
          rst = props.rst;
        }
    }
}

export default sketch;
