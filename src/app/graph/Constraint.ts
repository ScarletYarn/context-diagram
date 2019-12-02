import Line from '@/app/graph/Line'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/Shape'

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
    g.beginFill(0, 1)
    g.moveTo(this.start.x, this.start.y)
    // g.lineTo(this.end.x, this.end.y)
    g.endFill()

    return g
  }

  protected getDisplayText(): string {
    return this.description
  }
}

export default Constraint
