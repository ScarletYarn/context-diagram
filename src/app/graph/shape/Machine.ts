import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
import Shape from '@/app/graph/shape/Shape'

const config = new Config()

class Machine extends Shape {
  public shortName: string

  constructor(
    stage: PIXI.Container,
    x: number,
    y: number,
    description: string,
    shortName: string,
    baseIndex: number,
    inCustomSize?: boolean
  ) {
    super(stage, description, baseIndex, x, y, inCustomSize)
    this.shortName = shortName
    this.paint()
  }

  public setInformation(description: string, shortName: string): void {
    this.description = description
    this.shortName = shortName
    this.repaint()
    if (this.active) {
      this.spriteGroup[1].visible = false
      this.spriteGroup[2].visible = true
    }
  }

  protected drawBorder(color: number, textWidth: number): PIXI.Graphics {
    if (!this.inCustomSize) {
      this.width = textWidth + 4 * this.interval
      this.height = config.spriteHeight
    }
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(config.machineColor, 1)
    g.drawRoundedRect(0, 0, this.width, this.height, this.radius)
    g.endFill()

    g.lineStyle(2, color, 1)
    g.beginFill(0, 0)
    g.moveTo(this.interval, 0)
    g.lineTo(this.interval, this.height)
    g.moveTo(2 * this.interval, 0)
    g.lineTo(2 * this.interval, this.height)
    g.endFill()
    g.x = this.x
    g.y = this.y

    return g
  }

  protected getTextIndent(): number {
    return 3 * this.interval
  }

  protected getDisplayText(): string {
    return `${this.description}\n(${this.shortName})`
  }

  toSerializable(): Object {
    return {
      x: this.x,
      y: this.y,
      description: this.description,
      shortName: this.shortName,
      baseIndex: this.baseIndex,
      inCustomSize: this.inCustomSize
    }
  }
}

export default Machine
