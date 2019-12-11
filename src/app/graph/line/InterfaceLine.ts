import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'
import { Line } from '@/app/graph/line/Line'

export class InterfaceLine extends Line {
  constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number,
    initiator: Shape,
    receiver: Shape | null = null
  ) {
    super(stage, description, baseIndex, initiator, receiver)
  }

  protected drawSkeleton(g: PIXI.Graphics, color: number): PIXI.Graphics {
    g.clear()
    g.lineStyle(2, color, 1)
    g.beginFill(color, 1)
    g.moveTo(this.start.x, this.start.y)
    g.lineTo(this.end.x, this.end.y)
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
