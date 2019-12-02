import * as PIXI from 'pixi.js'
import Config from '@/app/Config'

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

  public abstract activate(): void
  public abstract deactivate(): void

  public abstract contain(x: number, y: number): boolean
}

export default Component
