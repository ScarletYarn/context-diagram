import Component from '@/app/graph/Component'
import * as PIXI from 'pixi.js'
import Config from '@/app/Config'
import Shape from '@/app/graph/Shape'
const config = new Config()

export enum PhysicalProperty {
  GivenDomain,
  DesignDomain
}

export enum DomainType {
  Casual,
  Biddable,
  Lexical
}

export class Domain extends Shape {
  public shortName: string
  public physicalProperty: PhysicalProperty
  public domainType: DomainType

  constructor(
    stage: PIXI.Container,
    x: number,
    y: number,
    description: string,
    shortName: string,
    baseIndex: number,
    physicalProperty?: PhysicalProperty,
    domainType?: DomainType
  ) {
    super(stage, description, baseIndex)
    this.x = x
    this.y = y
    this.description = description
    this.shortName = shortName
    if (physicalProperty) this.physicalProperty = physicalProperty
    else this.physicalProperty = PhysicalProperty.GivenDomain
    if (domainType) this.domainType = domainType
    else this.domainType = DomainType.Casual
    this.paint()
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

  protected paint(): void {
    let text = new PIXI.Text(
      `${this.description}\n(${this.shortName})`,
      this.textStyle
    )
    text.x = this.x + this.interval
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

  private drawBorder(color: number, textWidth: number): PIXI.Graphics {
    this.width = textWidth + 2 * this.interval
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(config.domainColor, 1)
    g.drawRoundedRect(0, 0, this.width, this.height, this.radius)
    g.endFill()
    g.x = this.x
    g.y = this.y

    return g
  }
}
