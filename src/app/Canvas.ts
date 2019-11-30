import * as PIXI from 'pixi.js'
import Component from '@/app/Component'
import Machine from '@/app/Machine'
import Hammer from 'hammerjs'
import { Vue } from 'vue/types/vue'

class Canvas {
  private app: PIXI.Application

  private width: number = 700
  private height: number = 450

  private componentsList: Array<Component>

  // It should never be set in this class, for it's to be set in Vue instance
  public activePen: number = 0
  public _Vue: Vue

  constructor(vue: Vue) {
    this._Vue = vue

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      transparent: false,
      resolution: 1.5
    })

    this.app.renderer.backgroundColor = 0xffffff

    this.componentsList = []

    let element = document.getElementById('canvas')
    if (element) {
      element.appendChild(this.app.view)
      let dpr = window.devicePixelRatio
      // this.app.view.width = dpr * this.width
      // this.app.view.height = dpr * this.height
      this.app.view.style.width = this.width.toString() + 'px'
      this.app.view.style.height = this.height.toString() + 'px'
      // @ts-ignore
      // this.app.view.getContext('2d').scale(dpr, dpr)

      let hammertime = new Hammer(this.app.view)
      hammertime.on('tap', this.tapHandler.bind(this))
    }
  }

  public addComponent(component: Component): void {
    component.register(this.app.stage)
    this.componentsList.push(component)
  }

  private tapHandler(e: HammerInput): void {
    // For now, we simply add a rectangle to the canvas.
    if ('layerX' in e.srcEvent && 'layerY' in e.srcEvent) {
      console.log(e.srcEvent.layerX, e.srcEvent.layerY)
      if (this.activePen === 0) {
        let machine = new Machine(e.srcEvent.layerX, e.srcEvent.layerY)
        this.addComponent(machine)
      } else if (this.activePen === undefined) {
        let component = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
        console.log(component)
      }

      this._Vue.$data['activePen'] = undefined
    }
  }

  private hit(x: number, y: number): Component | null {
    for (let comp of this.componentsList) {
      if (comp.contain(x, y)) return comp
    }

    return null
  }
}

export default Canvas
