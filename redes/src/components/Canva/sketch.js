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
        let x = Math.floor(p.mouseX);
        let y  = Math.floor(p.mouseY);
        p.rect(x, y, 3, 3);
      },
      delLastMove: function() {
        let a = moves.pop();
        try {
          a.map(item => {
            console.log(item);
            p.fill(canvaColor);
            p.rect(item.x, item.y, 3, 3);
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
      }

    }

    p.mouseReleased = () => {
      if (fun.inCanva()) {
        console.log()
        moves.push(lastMove);
        lastMove = [];
      }
    }

    //Adicionar bound esquedo e superior no if
    p.mouseDragged = () => {
      if (fun.inCanva()) {
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
