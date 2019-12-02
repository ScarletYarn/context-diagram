import Component from '@/app/graph/Component'
import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
import Shape from '@/app/graph/shape/Shape'
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
    super(stage, description, baseIndex, x, y)
    this.description = description
    this.shortName = shortName
    if (physicalProperty) this.physicalProperty = physicalProperty
    else this.physicalProperty = PhysicalProperty.GivenDomain
    if (domainType) this.domainType = domainType
    else this.domainType = DomainType.Casual
    this.paint()
  }

  protected drawBorder(color: number, textWidth: number): PIXI.Graphics {
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

  protected getDisplayText(): string {
    return this.description
  }

  protected getTextIndent(): number {
    return this.interval
  }

  protected getTextY(): number {
    return this.y + this.height / 2 - this.textStyle.fontSize * 0.6
  }
}
