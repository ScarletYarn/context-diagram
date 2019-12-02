import Line from '@/app/graph/Line'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/Shape'
import Point from '@/app/util/Point'

class InterfaceLine extends Line {
  constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number,
    initiator: Shape,
    receiver: Shape | null = null
  ) {
    super(stage, description, baseIndex, initiator, receiver)
  }
  activate(): void {}

  deactivate(): void {}

  protected paint(): void {}

  public lengthen(p: Point): void {}
}

export default InterfaceLine
