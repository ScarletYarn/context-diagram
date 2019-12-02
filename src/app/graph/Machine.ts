import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
import Shape from '@/app/graph/Shape'

const config = new Config()

class Machine extends Shape {
  public shortName: string

  constructor(
    stage: PIXI.Container,
    x: number,
    y: number,
    description: string,
    shortName: string,
    baseIndex: number
  ) {
    super(stage, description, baseIndex)
    this.x = x
    this.y = y
    this.description = description
    this.shortName = shortName
    this.paint()
  }

  paint(): void {
    let text = new PIXI.Text(
      `${this.description}\n(${this.shortName})`,
      this.textStyle
    )
    text.x = this.x + 3 * this.interval
    text.y = this.y + this.height / 2 - this.textStyle.fontSize * 1.25
    text.zIndex = this.baseIndex + 1

    let gd = this.drawBorder(config.strokeColor, text.width)
    let ga = this.drawBorder(config.activeStrokeColor, text.width)
    ga.visible = false
    gd.zIndex = ga.zIndex = this.baseIndex

    this.spriteGroup = [text, gd, ga]
    for (let item of this.spriteGroup) {
      this.container.addChild(item)
    }
  }

  public activate(): void {
    if (this.active) return
    this.active = true
    this.spriteGroup[1].visible = false
    this.spriteGroup[2].visible = true
  }

  public deactivate(): void {
    if (!this.active) return
    this.active = false
    this.spriteGroup[1].visible = true
    this.spriteGroup[2].visible = false
  }

  public setInformation(description: string, shortName: string): void {
    this.description = description
    this.shortName = shortName
    for (let item of this.spriteGroup) {
      item.destroy()
    }
    this.paint()
    if (this.active) {
      this.spriteGroup[1].visible = false
      this.spriteGroup[2].visible = true
    }
  }

  private drawBorder(color: number, textWidth: number): PIXI.Graphics {
    this.width = textWidth + 4 * this.interval
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
}

export default Machine
