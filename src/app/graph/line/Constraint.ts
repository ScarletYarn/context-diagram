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
    console.log('constraint')
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
    let [x1, y1] = [this.start.x, this.start.y],
      [x2, y2] = [this.end.x, this.end.y]
    k = (y2 - y1) / (x2 - x1)
    let k1 = -(k + 1) / (k - 1)
    let b1 = y2 - k1 * x2
    let k2 = (k - 1) / (k + 1)
    let b2 = y2 - k2 * x2
    distanceX = x1 - x2
    distanceY = y1 - y2
    let distanceZ = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    let cos = distanceX / distanceZ
    let sin = distanceY / distanceZ
    let x3 = x2 + ((Math.sqrt(2) * (cos - sin)) / 2) * 10
    let y3 = x3 * k1 + b1
    let x4 = x2 + ((Math.sqrt(2) * (cos + sin)) / 2) * 10
    let y4 = x4 * k2 + b2
    g.moveTo(this.end.x, this.end.y)
    g.lineTo(x3, y3)
    g.moveTo(this.end.x, this.end.y)
    g.lineTo(x4, y4)

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
