import Shape from '@/app/graph/shape/Shape'
import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
const config = new Config()

class Requirement extends Shape {
  constructor(
    stage: PIXI.Container,
    x: number,
    y: number,
    description: string,
    baseIndex: number,
    inCustomSize?: boolean
  ) {
    super(stage, description, baseIndex, x, y, inCustomSize)
    this.paint()
  }

  protected drawBorder(color: number, textWidth: number): PIXI.Sprite {
    if (!this.inCustomSize) {
      this.width = textWidth + 4 * this.interval
      this.height = config.spriteHeight
    }
    let margin = 2
    let lineWidth = 2
    let canvas = document.createElement('canvas')
    canvas.width = window.devicePixelRatio * (this.width + margin)
    canvas.height = window.devicePixelRatio * (this.height + margin)
    canvas.style.width = this.width + margin + 'px'
    canvas.style.height = this.height + margin + 'px'
    let ctx = canvas.getContext('2d')
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = config.hexToRGB(color)
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.ellipse(
      this.width / 2 + margin / 2,
      this.height / 2 + margin / 2,
      this.width / 2,
      this.height / 2,
      0,
      0,
      360
    )
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.fillStyle = config.hexToRGB(config.requirementColor)
    ctx.ellipse(
      this.width / 2 + margin / 2,
      this.height / 2 + margin / 2,
      this.width / 2 - lineWidth / 2,
      this.height / 2 - lineWidth / 2,
      0,
      0,
      360
    )
    ctx.fill()
    ctx.closePath()
    let url = canvas.toDataURL()
    let s = PIXI.Sprite.from(url)
    s.x = this.x
    s.y = this.y
    s.width = this.width
    s.height = this.height

    return s
  }

  public setInformation(description: string): void {
    this.description = description
    this.repaint()
    if (this.active) {
      this.spriteGroup[1].visible = false
      this.spriteGroup[2].visible = true
    }
  }

  protected getDisplayText(): string {
    return this.description
  }

  protected getTextIndent(): number {
    return 2 * this.interval
  }

  protected getTextY(): number {
    return this.y + this.height / 2 - this.textStyle.fontSize * 0.75
  }

  toSerializable(): Object {
    return {
      x: this.x,
      y: this.y,
      description: this.description,
      baseIndex: this.baseIndex,
      inCustomSize: this.inCustomSize
    }
  }
}

export default Requirement
