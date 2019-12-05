import Line from '@/app/graph/line/Line'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'

class Constraint extends Line {
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
   * Draw a dashed line together with an arrow head from start to end.
   * Use g.lineTo and g.moveTo
   * @param color
   */
  protected drawSkeleton(color: number): PIXI.Graphics {
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(color, 1)
    g.moveTo(this.start.x, this.start.y)
    let total =
      (this.start.x - this.end.x) * (this.start.x - this.end.x) +
      (this.start.y - this.end.y) * (this.start.y - this.end.y)
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
    // 利用到角公式算斜率，画箭头
    let k1 = distanceY / distanceX
    let k2 = -(k1 + 1) / (k1 - 1)
    let k3 = (k1 - 1) / (k2 + 1)
    let distanceZ = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    let sin = distanceY / distanceZ
    let cos = distanceX / distanceZ
    let x1 = (Math.sqrt(2) * (sin + cos)) / 2
    let x2 = (Math.sqrt(2) * (sin - cos)) / 2
    g.moveTo(this.end.x, this.end.y)
    g.lineTo(this.end.x + x1, this.start.y + k2 * x1)
    g.moveTo(this.end.x, this.end.y)
    g.lineTo(this.end.x + x2, this.start.y + k3 * x2)
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

export default Constraint
