import * as PIXI from 'pixi.js'
import Config from '@/app/Config'

const config = new Config()

abstract class Component {
  protected width: number = config.spriteWidth
  protected height: number = config.spriteHeight
  protected radius: number = config.squareRadius
  protected interval: number = config.lineInterval
  protected x: number = 0
  protected y: number = 0
  protected textStyle = config.textStyle
  protected spriteGroup: Array<PIXI.Container> = []

  protected abstract paint(): void

  public register(stage: PIXI.Container): void {
    for (let item of this.spriteGroup) {
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

  public move(deltaX: number, deltaY: number): void {
    this.x += deltaX
    this.y += deltaY
    for (let sprite of this.spriteGroup) {
      sprite.x += deltaX
      sprite.y += deltaY
    }
  }
}

export default Component
