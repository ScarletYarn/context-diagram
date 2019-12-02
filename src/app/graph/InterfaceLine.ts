import Line from '@/app/graph/Line'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/Shape'

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

  public lengthen(x: number, y: number): void {}

  /**
   * Tell whether the point (x, y) is in the line's vicinity.
   * The line begins at (this.startX, this.startY) and ends at (endX, endY)
   * @param x
   * @param y
   * @param d The max distance.
   */
  contain(x: number, y: number, d: number = 5): boolean {
    return false
  }

  /**
   * Get the start point and end point of the line.
   * Currently, you know the initiator shape by this.initiator and receiver shape by this.receiver
   */
  getPath(): Array<{ x: number; y: number }> {
    return [
      { x: 0, y: 0 },
      { x: 10, y: 10 }
    ]
  }
}

export default InterfaceLine
