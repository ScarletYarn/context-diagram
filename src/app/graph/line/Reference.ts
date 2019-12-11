import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'
import { Line } from '@/app/graph/line/Line'

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

  public setInformation(
    description?: string,
    initiator?: Shape,
    receiver?: Shape
  ): void {
    super.setInformation(description, initiator, receiver)
  }

  /**
   * Draw a dashed line from start to end.
   * Use g.lineTo and g.moveTo
   * @param g
   * @param color
   */
  protected drawSkeleton(g: PIXI.Graphics, color: number): PIXI.Graphics {
    g = this.getDashedLine(g, color, this.start, this.end)
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

export default Reference
