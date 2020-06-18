import constants from './constants';

const sketch = (p) => {

    const url = "b449f2c643c1.ngrok.io"
    const connection = new WebSocket("ws://" + url);
    // const button = document.querySelector("#send");

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
          a.forEach(item => {
            p.fill(canvaColor);
            p.rect(item.x, item.y, 3, 3);
            connection.send(JSON.stringify({mouseX: item.x, mouseY: item.y, color: canvaColor}));
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
    };

    connection.onclose = (event) => {
      console.log("WebSocket is closed now.");
    };

    connection.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    };

    connection.onmessage = ({data}) => {
      const { mouseX, mouseY, color = constants.default_color} = JSON.parse(data);
      p.fill(color);
      p.ellipse(mouseX, mouseY, 5, 5);
    };

    p.mouseReleased = () => {
      if (fun.inCanva() && !fun.eraserMode()) {
        console.log()
        moves.push(lastMove);
        lastMove = [];
      }
    }

    //Adicionar bound esquedo e superior no if
    p.mouseDragged = () => {
      if (fun.inCanva()) {
        fun.drawColor();
        let mouseX = p.mouseX;
        let mouseY = p.mouseY;
        connection.send(JSON.stringify({mouseX, mouseY, color}));
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
