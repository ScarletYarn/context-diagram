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
    baseIndex: number
  ) {
    super(stage, description, baseIndex, x, y)
    this.paint()
  }

  protected drawBorder(color: number, textWidth: number): PIXI.Graphics {
    this.width = textWidth + 4 * this.interval
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(config.requirementColor, 1)
    g.drawEllipse(0, 0, this.width / 2, this.height / 2)
    g.endFill()
    g.x = this.x + this.width / 2
    g.y = this.y + this.height / 2

    return g
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
}

export default Requirement
