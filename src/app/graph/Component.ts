import * as PIXI from 'pixi.js'
import Config from '@/app/util/Config'
import Point from '@/app/util/Point'

const config = new Config()

abstract class Component {
  public description: string

  protected textStyle = config.textStyle
  protected spriteGroup: Array<PIXI.Container> = []

  /* The PIXI stage for the component for repaint. */
  protected container: PIXI.Container
  protected active: boolean

  /* The z-index for the component. Used for overlapping. */
  protected baseIndex: number

  protected constructor(
    stage: PIXI.Container,
    description: string,
    baseIndex: number
  ) {
    this.container = stage
    this.description = description
    this.baseIndex = baseIndex
    this.active = false
  }

  protected abstract paint(): void

  public activate(): void {
    console.log('active')
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

  protected repaint(): void {
    for (let item of this.spriteGroup) {
      item.destroy()
    }
    this.paint()
  }

  public destroy(): void {
    for (let item of this.spriteGroup) {
      item.destroy()
    }
  }

  public abstract contain(point: Point): boolean

  protected abstract getDisplayText(): string

  public abstract toString(): string

  public abstract toSerializable(): Object
}

export default Component
