import Component from '@/app/graph/Component'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'
import { Phenomenon } from '@/app/graph/Phenomenon'
import Point from '@/app/util/Point'
import Config from '@/app/util/Config'
import Requirement from '@/app/graph/shape/Requirement'
const config = new Config()

abstract class Line extends Component {
  public initiator: Shape
  public receiver: Shape | null

  public phenomenonList: Array<Phenomenon>

  protected start: Point
  protected end: Point

  public attached: boolean

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

    this.attached = false
    if(receiver){
      this.attached=true
    }
  }

  public lengthen(p: Point): void {
    this.start = this.getIntersectionPoint(this.initiator, { x: p.x, y: p.y })
    this.end = p
    this.attached = false
    this.receiver = null
    this.repaint()
  }

  public attach(shape: Shape): void {
    this.start = this.getIntersectionPoint(this.initiator, shape.center)
    this.end = this.getIntersectionPoint(shape, this.initiator.center)
    this.attached = true
    this.receiver = shape
    this.repaint()
  }

  public mount(): void {
    if (this.receiver) {
      this.receiver.attachedLines.push(this)
      this.initiator.attachedLines.push(this)
    }
  }

  public updateLine(): void {
    if (!this.receiver) return
    this.start = this.getIntersectionPoint(this.initiator, this.receiver.center)
    this.end = this.getIntersectionPoint(this.receiver, this.initiator.center)
    this.repaint()
  }

  protected paint(): void {
    let text = new PIXI.Text(this.getDisplayText(), this.textStyle)
    text.x = (this.start.x + this.end.x) / 2
    text.y = (this.start.y + this.end.y) / 2
    text.zIndex = this.baseIndex + 1

    let gd = this.drawSkeleton(config.strokeColor)
    let ga = this.drawSkeleton(config.activeStrokeColor)
    ga.visible = false
    gd.zIndex = ga.zIndex = this.baseIndex

    this.spriteGroup = [text, gd, ga]
    for (let item of this.spriteGroup) {
      this.container.addChild(item)
    }
  }

  public selfContain(p: Point): boolean {
    return this.initiator.contain(p)
  }

  /**
   * Tell whether the point (x, y) is in the line's vicinity.
   * The line begins at (this.startX, this.startY) and ends at (endX, endY)
   * @param p
   * @param d The max distance.
   */
  public contain(p: Point, d: number = 5): boolean {
    let a = -(this.end.x - this.start.x) / (this.end.y - this.start.y)
    let b = -a * this.end.y - this.end.x
    let distance = Math.abs(p.x + p.y * a + b) / Math.sqrt(a * a + 1)
    let containX = (p.x - this.start.x) * (p.x - this.end.x)
    let containY = (p.y - this.start.y) * (p.y - this.end.y)
    return distance < d && containX < 0 && containY < 0
  }

  /**
   * A line goes from the centre of a rectangle(Machine or Domain) or an ellipse(Requirement)
   * to some point p in the outside.
   * Tell the intersection point of the line and the shape.
   * The top left corner of the shape is (shape.x, shape.y)
   * Return (-1, -1) when p falls within shape.
   */
  public getIntersectionPoint(shape: Shape, p: Point): Point {
    if (shape.contain(p)) return { x: -1, y: -1 }
    let tmpX, tmpY
    p.x -= shape.center.x
    p.y -= shape.center.y
    let a = shape.width / 2,
      b = shape.height / 2
    if (shape instanceof Requirement) {
      let k = p.y / p.x
      tmpX = 1 / Math.sqrt(1 / a ** 2 + (k / b) ** 2)
      if (p.x < 0) {
        tmpX = -tmpX
      }
      tmpY = k * tmpX

      tmpX += shape.center.x
      tmpY += shape.center.y
    } else {
      let k = p.y / p.x
      let k0 = a / b
      if (Math.abs(k) > k0) {
        tmpY = b
        if (p.y < 0) tmpY = -tmpY
        tmpX = tmpY / k
      } else {
        tmpX = a
        if (p.x < 0) tmpX = -tmpX
        tmpY = tmpX * k
      }

      tmpY = k * tmpX

      tmpX += shape.center.x
      tmpY += shape.center.y
    }
    return { x: tmpX, y: tmpY }
  }

  protected abstract drawSkeleton(color: number): PIXI.Graphics
}

export default Line
