import Component from '@/app/graph/Component'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/Shape'
import { Phenomenon } from '@/app/Phenomenon'

abstract class Line extends Component {
  protected initiator: Shape
  protected receiver: Shape | null

  public phenomenonList: Array<Phenomenon>

  protected startX: number
  protected startY: number
  protected endX: number
  protected endY: number

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

    this.startX = initiator.center.x
    this.startY = initiator.center.y

    this.endX = this.endY = 0
  }

  public abstract lengthen(x: number, y: number): void
}

export default Line
