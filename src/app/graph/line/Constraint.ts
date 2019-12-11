import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'
import { Line } from '@/app/graph/line/Line'

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

  public setInformation(
    description?: string,
    initiator?: Shape,
    receiver?: Shape
  ): void {
    super.setInformation(description, initiator, receiver)
  }

  /**
   * Draw a dashed line together with an arrow head from start to end.
   * Use g.lineTo and g.moveTo
   * @param g
   * @param color
   */
  protected drawSkeleton(g: PIXI.Graphics, color: number): PIXI.Graphics {
    g = this.getDashedLine(g, color, this.start, this.end)
    // 利用到角公式算斜率，画箭头
    let [x1, y1] = [this.start.x, this.start.y],
      [x2, y2] = [this.end.x, this.end.y]
    let k = (y2 - y1) / (x2 - x1)
    let k1 = -(k + 1) / (k - 1)
    let b1 = y2 - k1 * x2
    let k2 = (k - 1) / (k + 1)
    let b2 = y2 - k2 * x2
    let distanceX = x1 - x2
    let distanceY = y1 - y2
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
      receiver: this.receiver.description,
      phenomenonList: this.phenomenonList.map(e => e.toSerializable())
    }
  }
}

export default Constraint
