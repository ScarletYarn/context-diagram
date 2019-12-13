import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
import Shape from '@/app/graph/shape/Shape'
import { Phenomenon } from '@/app/graph/Phenomenon'
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
  public phenomenonList: Array<Phenomenon>

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
    this.phenomenonList = []
    this.paint()
  }

  public addPhenomenon(p: Phenomenon): void {
    this.phenomenonList.push(p)
  }

  public removePhenomenon(p: Phenomenon): void {
    let index = this.phenomenonList.indexOf(p)
    if (index !== -1) this.phenomenonList.splice(index, 1)
  }

  public setInformation(
    description: string,
    shortName: string,
    domainType: DomainType,
    physicalProperty: PhysicalProperty
  ): void {
    this.description = description
    this.shortName = shortName
    this.domainType = domainType
    this.physicalProperty = physicalProperty
    this.repaint()
    if (this.active) {
      this.spriteGroup[1].visible = false
      this.spriteGroup[2].visible = true
    }
  }

  protected drawBorder(color: number, textWidth: number): PIXI.Graphics {
    /* ** New: Render the shape according to the physical property. */
    this.width =
      this.physicalProperty === PhysicalProperty.DesignDomain
        ? textWidth + 3 * this.interval
        : textWidth + 2 * this.interval
    let g = new PIXI.Graphics()
    g.lineStyle(2, color, 1)
    g.beginFill(config.domainColor, 1)
    g.drawRoundedRect(0, 0, this.width, this.height, this.radius)
    g.endFill()

    if (this.physicalProperty === PhysicalProperty.DesignDomain) {
      g.lineStyle(2, color, 1)
      g.beginFill(0, 0)
      g.moveTo(this.interval, 0)
      g.lineTo(this.interval, this.height)
      g.endFill()
    }

    g.x = this.x
    g.y = this.y

    return g
  }

  /**
   * ** New
   * Extend the paint method to draw the extra letter.
   */
  protected paint(): void {
    super.paint()
    let sign = 'CBX'[this.domainType]
    let text = new PIXI.Text(sign, this.textStyle)
    text.x = this.x + this.width - text.width - 2
    text.y = this.y + this.height - text.height
    text.zIndex = this.baseIndex + 1
    this.spriteGroup.push(text)
    this.container.addChild(text)
  }

  protected getDisplayText(): string {
    return `${this.description}\n(${this.shortName})`
  }

  protected getTextIndent(): number {
    return this.physicalProperty === PhysicalProperty.DesignDomain
      ? 2 * this.interval
      : this.interval
  }

  protected getTextY(): number {
    return this.y + this.height / 2 - this.textStyle.fontSize * 1.25
  }

  toSerializable(): Object {
    return {
      x: this.x,
      y: this.y,
      description: this.description,
      shortName: this.shortName,
      baseIndex: this.baseIndex,
      physicalProperty: this.physicalProperty,
      domainType: this.domainType,
      phenomenonList: this.phenomenonList.map(e => e.toSerializable())
    }
  }
}
