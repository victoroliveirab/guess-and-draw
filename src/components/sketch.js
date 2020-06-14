// const connection = new WebSocket("ws://localhost:8080");
// const button = document.querySelector("#send");


const sketch = (p) => {

    let canvas;
    let canvaColor = 240;
    let height = 400;
    let width = 800;
    let color;
    let del = 0;
    let flag = false;
    let lastMove = [];

    let fun = {
      clear: function() {
        p.background(canvaColor);
        flag = !flag;
      },
      drawColor: function() {
        p.fill(color);
        p.rect(p.mouseX, p.mouseY, 3, 3);
      },
      delLastMove: function() {
        if(!lastMove.len === 0){
          lastMove.map((item) => {
            console.log(item.x, item.y);
            p.fill(canvaColor);
            p.rect(item.x, item.y, 3, 3);
          });
          flag = !flag;
        }
      },
      getLastMove: function() {
        //lastMove.push(pos);
      }

    }


    p.setup = () => {
      canvas = p.createCanvas(width, height);
      p.background(canvaColor);
      p.noStroke();
      p.frameRate(60);

    }
    
    p.draw = () => {
        if(flag){
          //fun.delLastMove();
           fun.clear();
        }
    }

    p.mousePressed = () => {
        console.log(lastMove);
        lastMove = [];
    }

    //Adicionar bound esquedo e superior no if
    p.mouseDragged = () => {
      if (canvas && (p.mouseX < width & p.mouseY < height)) {
       fun.drawColor();
       fun.getLastMove();
      }
      return false;
    }
  
    // o Wrapper usa essa função para pegar props : )
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        color = props.color;
        if(del !== props.del){
            flag = !flag;
            del = props.del;
        }
    }
}

export default sketch;