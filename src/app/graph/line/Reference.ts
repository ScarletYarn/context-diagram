import Line from '@/app/graph/line/Line'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'

class Reference extends Line {
  constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number,
    initiator: Shape,
    receiver: Shape | null = null
  ) {
    super(stage, description, baseIndex, initiator, receiver)
  }

  /**
   * Draw a dashed line from start to end.
   * Use g.lineTo and g.moveTo
   * @param color
   */
  protected drawSkeleton(color: number): PIXI.Graphics {
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(color, 1)
    g.moveTo(this.start.x, this.start.y)
    let total =
      (this.start.x - this.end.x) ** 2 + (this.start.y - this.end.y) ** 2
    let k = Math.floor(Math.sqrt(total) / 10)
    let rate = 0.6
    let distanceX = (this.end.x - this.start.x) / k
    let distanceY = (this.end.y - this.start.y) / k
    for (let i = 0; i < k; i++) {
      g.moveTo(this.start.x + i * distanceX, this.start.y + i * distanceY)
      g.lineTo(
        this.start.x + i * distanceX + rate * distanceX,
        this.start.y + i * distanceY + rate * distanceY
      )
    }
    g.endFill()

    return g
  }

  protected getDisplayText(): string {
    return this.description
  }

  toSerializable(): Object {
    return {
      description: this.description,
      baseIndex: this.baseIndex,
      initiator: this.initiator.description,
      receiver: this.receiver.description
    }
  }
}

export default Reference
