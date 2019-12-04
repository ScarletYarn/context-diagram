import Component from '@/app/graph/Component'
import * as PIXI from 'pixi.js'
import Shape from '@/app/graph/shape/Shape'
import { Phenomenon } from '@/app/Phenomenon'
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
  }

  public lengthen(p: Point): void {
    this.start = this.getIntersectionPoint(this.initiator, p)
    this.end = p
    console.log(this.start)
    this.attached = false
    this.receiver = null
    // console.log(`the right x is ${this.initiator.x + this.initiator.width}`)
    // console.log(p)
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
    let A = (this.start.x - this.end.x) / (this.end.y - this.start.y)
    let B = -A * this.end.y + this.end.x
    let distance = (p.x + p.y * A + B) / Math.sqrt(A * A + 1)
    let containX = (p.x - this.start.x) * (p.x - this.end.x)
    let containY = (p.y - this.start.y) * (p.y - this.end.y)
    // console.log(distance < d && containX < 0 && containY < 0)
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
    let a = shape.width / 2
    let b = shape.height / 2
    let centerX = shape.x + a
    let centerY = shape.x + b
    let relativeX = p.x - centerX
    let relativeY = p.y - centerY
    let k = relativeY / relativeX
    let tempX, tempY
    if (shape instanceof Requirement) {
      tempX = (a * b) / Math.sqrt(a * a * k * k + b * b)
      if (relativeX < 0) tempX = -tempX
      tempY = k * tempX
    } else {
      let kShape = relativeY / relativeX
      if (k > kShape && k < -kShape) {
        tempX = relativeX
        tempY = k * relativeY
      } else {
        tempY = relativeY
        tempX = relativeY / k
      }
    }
    // console.log(`the center x is ${shape.center.x}`)
    // console.log({ x: tempX + centerX, y: tempY + centerY })
    return { x: tempX + centerX, y: tempY + centerY }
  }

  protected abstract drawSkeleton(color: number): PIXI.Graphics
}

export default Line
