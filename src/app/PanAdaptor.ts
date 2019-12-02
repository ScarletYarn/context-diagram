import Component from '@/app/graph/Component'

/**
 * Destroyable singleton class which remain alive during the process of one drag.
 */
class PanAdaptor {
  private static instance: PanAdaptor | null = null
  private draggingComponent: Component | null = null
  private activePen: number = 0
  // record the last delta value
  private lastDeltaX = 0
  private lastDeltaY = 0
  constructor() {
    if (PanAdaptor.instance) {
      return PanAdaptor.instance
    }
    PanAdaptor.instance = this
  }

  public startDrag(
    component: Component | null,
    activePen: number,
    stage: PIXI.Container,
    baseIndex: number
  ): void {
    this.draggingComponent = component
    this.activePen = activePen
  }

  public drag(deltaX: number, deltaY: number): void {
    if (!this.draggingComponent) return
    this.draggingComponent.move(
      deltaX - this.lastDeltaX,
      deltaY - this.lastDeltaY
    )
    this.lastDeltaX = deltaX
    this.lastDeltaY = deltaY
  }

  public destroy(): void {
    this.draggingComponent = null
    this.lastDeltaX = 0
    this.lastDeltaY = 0
    PanAdaptor.instance = null
  }
}

export default PanAdaptor
