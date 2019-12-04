import Line from '@/app/graph/line/Line'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'

export enum InterfaceType {
  Event,
  State,
  Value
}

export class InterfaceLine extends Line {
  public type: InterfaceType
  constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number,
    initiator: Shape,
    receiver: Shape | null = null
  ) {
    super(stage, description, baseIndex, initiator, receiver)
    this.type = InterfaceType.Event
  }

  protected drawSkeleton(color: number): PIXI.Graphics {
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(0, 1)
    g.moveTo(this.start.x, this.start.y)
    g.lineTo(this.end.x, this.end.y)
    g.endFill()

    return g
  }

  protected getDisplayText(): string {
    return this.description
  }

  public toString(): string {
    return JSON.stringify({
      description: this.description,
      baseIndex: this.baseIndex,
      initiator: this.initiator,
      receiver: this.receiver
    })
  }
}
