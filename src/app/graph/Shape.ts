import Component from '@/app/graph/Component'
import Config from '@/app/util/Config'
import * as PIXI from 'pixi.js'
import Point from '@/app/util/Point'
const config = new Config()

abstract class Shape extends Component {
  protected width: number = config.spriteWidth
  protected height: number = config.spriteHeight
  protected radius: number = config.squareRadius
  protected interval: number = config.lineInterval

  protected x: number = 0
  protected y: number = 0

  protected constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number
  ) {
    super(stage, description, baseIndex)
  }

  /* Tell whether the given point is contained in the component */
  public contain(p: Point): boolean {
    return (
      p.x >= this.x &&
      p.x <= this.x + this.width &&
      p.y >= this.y &&
      p.y <= this.y + this.height
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

  get center(): { x: number; y: number } {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    }
  }
}

export default Shape
