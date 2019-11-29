import * as PIXI from 'pixi.js'

abstract class Component {
  protected width: number = 120
  protected height: number = 60
  protected radius: number = 2
  protected interval: number = 10

  protected abstract paint(): Array<PIXI.Container>

  public register(stage: PIXI.Container): void {
    for (let item of this.paint()) {
      stage.addChild(item)
    }
  }
}

export default Component
