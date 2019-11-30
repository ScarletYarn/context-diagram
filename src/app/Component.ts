import * as PIXI from 'pixi.js'

abstract class Component {
  protected width: number = 120
  protected height: number = 60
  protected radius: number = 5
  protected interval: number = 10
  protected x: number = 0
  protected y: number = 0
  protected textStyle = {
    fontFamily: 'Arial',
    fontSize: 12
  }

  protected abstract paint(): Array<PIXI.Container>

  public register(stage: PIXI.Container): void {
    for (let item of this.paint()) {
      stage.addChild(item)
    }
  }

  /* Tell whether the given point is contained in the component */
  public contain(x: number, y: number): boolean {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    )
  }
}

export default Component
