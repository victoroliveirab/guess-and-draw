// const connection = new WebSocket("ws://localhost:8080");
// const button = document.querySelector("#send");

const sketch = (p) => {
    let canvas;
    let height = 400;
    let width = 400;
    let color;
    let del = 0;
    let flag = false;

    p.setup = () => {
      canvas = p.createCanvas(height, width);
      p.background(0);
      p.noStroke();
    }


    // Bug memso mudando a cor p.fill() não funciona
    p.mouseDragged = () => {
        if (canvas && (p.mouseX < height & p.mouseY < width)) {
          p.fill(color.r, color.g, color.b);
          p.ellipse(p.mouseX, p.mouseY, 5, 5);
          console.log(color);
          //connection.send(JSON.stringify({ mouseX, mouseY }));
        }
        return false;
      }

    p.draw = () => {
        if(flag){
            p.background(0);
            flag = !flag;
        }
      
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