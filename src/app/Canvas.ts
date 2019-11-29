import * as PIXI from 'pixi.js'
import Component from '@/app/Component'
import Machine from '@/app/Machine'

class Canvas {
  private app: PIXI.Application

  private width: number = 700
  private height: number = 450

  private componentsList: Array<Component>

  constructor() {
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      transparent: false,
      resolution: 1
    })

    this.app.renderer.backgroundColor = 0xffffff

    this.componentsList = []

    // The base sprite, used for universal event interaction
    let base = new PIXI.Sprite()
    base.x = 0
    base.y = 0
    base.width = this.width
    base.height = this.height
    base.interactive = true
    base.cursor = 'crosshair'
    base.on('pointerup', this.tapHandler.bind(this))
    this.app.stage.addChild(base)

    let element = document.getElementById('canvas')
    if (element) {
      element.appendChild(this.app.view)
    }
  }

  public addComponent(component: Component): void {
    component.register(this.app.stage)
  }

  private tapHandler(e: PIXI.interaction.InteractionEvent): void {
    // Stop it, or nobody knows about the click point :)
    e.stopPropagation()
    console.log(this.componentsList)
    console.log(e.data.global)

    // For now, we simply add a rectangle to the canvas.
    let machine = new Machine(e.data.global.x, e.data.global.y)
    machine.register(this.app.stage)
  }
}

export default Canvas
