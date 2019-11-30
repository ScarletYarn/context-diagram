import * as PIXI from 'pixi.js'

abstract class Component {
  protected width: number = 150
  protected height: number = 75
  protected radius: number = 3
  protected interval: number = 10
  protected x: number = 0
  protected y: number = 0
  protected textStyle = {
    fontFamily: 'Arial',
    fontSize: 13
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
