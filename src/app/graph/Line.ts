import Component from '@/app/graph/Component'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/Shape'
import { Phenomenon } from '@/app/Phenomenon'
import Point from '@/app/util/Point'

abstract class Line extends Component {
  protected initiator: Shape
  protected receiver: Shape | null

  public phenomenonList: Array<Phenomenon>

  protected start: Point
  protected end: Point

  protected constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number,
    initiator: Shape,
    receiver: Shape | null = null
  ) {
    super(stage, description, baseIndex)
    this.initiator = initiator
    this.receiver = receiver
    this.phenomenonList = []

    this.start = { x: -1, y: -1 }
    this.end = { x: 0, y: 0 }
  }

  public abstract lengthen(p: Point): void

  /**
   * Tell whether the point (x, y) is in the line's vicinity.
   * The line begins at (this.startX, this.startY) and ends at (endX, endY)
   * @param p
   * @param d The max distance.
   */
  public contain(p: Point, d: number = 5): boolean {
    return false
  }

  /**
   * A line goes from the centre of a rectangle or a oval to point p in the outside.
   * Tell the intersection point of the line and the shape.
   * Return (-1, -1) when p falls within shape.
   */
  public getIntersectionPoint(shape: Shape, p: Point): Point {
    return { x: -1, y: -1 }
  }
}

export default Line
