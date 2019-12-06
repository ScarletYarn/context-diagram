import Shape from '@/app/graph/shape/Shape'
import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
import { CanvasRenderer } from '@pixi/canvas-renderer'
const config = new Config()

class Requirement extends Shape {
  constructor(
    stage: PIXI.Container,
    x: number,
    y: number,
    description: string,
    baseIndex: number
  ) {
    super(stage, description, baseIndex, x, y)
    this.paint()
  }

  protected drawBorder(color: number, textWidth: number): PIXI.Graphics {
    this.width = textWidth + 4 * this.interval
    let r = new CanvasRenderer({ resolution: window.devicePixelRatio })
    r.view.style.width = this.width + 'px'
    r.view.style.height = this.height + 'px'
    r.context.setLineDash([10, 10])
    r.context.drawEllipse(
      this.width / 2,
      this.height / 2,
      this.width / 2,
      this.height / 2
    )
    console.log(r)
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(config.requirementColor, 1)
    g.drawEllipse(0, 0, this.width / 2, this.height / 2)
    g.endFill()
    g.x = this.x + this.width / 2
    g.y = this.y + this.height / 2

    return g
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
      baseIndex: this.baseIndex
    }
  }
}

export default Requirement
