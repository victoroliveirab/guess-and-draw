// const connection = new WebSocket("ws://localhost:8080");
// const button = document.querySelector("#send");


const sketch = (p) => {

    let canvas;
    let canvaColor = 240;
    let height = 400;
    let width = 800;
    let color;
    let del = 0;
    let rst = 0;
    let rstFlag = false;
    let delFlag = false;
    let moves = [];
    let lastMove = [];


    let fun = {
      clear: function() {
        p.background(canvaColor);
        delFlag = !delFlag;
      },
      drawColor: function() {
        p.fill(color);
        p.noStroke();
        p.rect(p.mouseX, p.mouseY, 3, 3);
      },
      delLastMove: function() {
        let a = moves.pop();
        try{
          a.map(item => {
            p.fill(canvaColor);
            p.noStroke();
            p.rect(item.x, item.y, 3, 3);
          });
        }
        catch(err){

        }
        rstFlag = !rstFlag;
      },
      getLastMove: function() {
        let pos  = {};
        pos['x'] = p.mouseX;
        pos['y'] = p.mouseY;
        lastMove.push(pos);
      }

    }

    p.mouseReleased = () => {
      if (canvas && (p.mouseX < width & p.mouseY < height)) {
        moves.push(lastMove);
        lastMove = [];
      }
    }

    //Adicionar bound esquedo e superior no if
    p.mouseDragged = () => {
      if (canvas && (p.mouseX < width & p.mouseY < height)) {
      fun.drawColor();
      fun.getLastMove();
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
        if(delFlag){
          fun.clear();
        }
        if(rstFlag){
          fun.delLastMove();
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