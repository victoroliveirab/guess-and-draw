
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
    p.frameRate(1);
  }

  // Bug memso mudando a cor p.fill() não funciona
  //Adicionar bound esquedo e superior no if
  p.mouseDragged = () => {
    if (canvas && (p.mouseX < height & p.mouseY < width)) {
      p.fill(color);
      p.ellipse(p.mouseX, p.mouseY, 5, 5);
      console.log(color);
      //connection.send(JSON.stringify({ mouseX, mouseY }));
    }
    return false;
  }

  p.draw = () => {
    if (flag) {
      p.background(0);
      flag = !flag;
    }
  }

  // o Wrapper usa essa função para pegar props : )
  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    color = props.color;
    if (del !== props.del) {
      flag = !flag;
      del = props.del;
    }
  }
}

export default sketch; 