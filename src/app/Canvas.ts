import * as PIXI from 'pixi.js'
import Component from '@/app/Component'

class Canvas {
  private app: PIXI.Application

  constructor() {
    this.app = new PIXI.Application({
      width: 700,
      height: 450
    })

    this.app.renderer.backgroundColor = 0xffffff

    let element = document.getElementById('canvas')
    if (element) {
      element.appendChild(this.app.view)
    }
  }

  public addComponent(component: Component): void {
    component.register(this.app.stage)
  }
}

export default Canvas
