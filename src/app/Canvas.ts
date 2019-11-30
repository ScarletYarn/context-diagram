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
  private draggingComponent: Component | undefined
  // record the last delta value
  private lastDeltaX = 0
  private lastDeltaY = 0

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
      resolution: window.devicePixelRatio
    })

    this.app.renderer.backgroundColor = 0xffffff

    this.componentsList = []

    let element = document.getElementById('canvas')
    if (element) {
      element.appendChild(this.app.view)
      /* Handle the HiDPI problem by setting the resolution of the PIXI Application and set the css size here */
      this.app.view.style.width = this.width.toString() + 'px'
      this.app.view.style.height = this.height.toString() + 'px'

      let hammertime = new Hammer(this.app.view)
      hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL })
      hammertime.on('tap', this.tapHandler.bind(this))
      hammertime.on('pan panstart panend', this.panHandler.bind(this))
    }
  }

  public addComponent(component: Component): void {
    component.register(this.app.stage)
    this.componentsList.push(component)
  }

  private tapHandler(e: HammerInput): void {
    // For now, we simply add a rectangle to the canvas.
    if ('layerX' in e.srcEvent && 'layerY' in e.srcEvent) {
      if (this.activePen === 0) {
        let machine = new Machine(e.srcEvent.layerX, e.srcEvent.layerY)
        this.addComponent(machine)
      } else if (this.activePen === undefined) {
        let component = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
        // console.log(component)
      }

      this._Vue.$data['activePen'] = undefined
    }
  }

  private panHandler(e: HammerInput): void {
    if (!('layerX' in e.srcEvent && 'layerY' in e.srcEvent)) return
    switch (e.type) {
      case 'panstart':
        console.log(`start with ${e.srcEvent.layerX}`)
        // eslint-disable-next-line no-case-declarations
        let comp = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
        if (comp) this.draggingComponent = comp
        break
      case 'pan':
        if (this.draggingComponent) {
          this.draggingComponent.move(
            e.deltaX - this.lastDeltaX,
            e.deltaY - this.lastDeltaY
          )
          this.lastDeltaX = e.deltaX
          this.lastDeltaY = e.deltaY
        }
        break
      case 'panend':
        this.draggingComponent = undefined
        this.lastDeltaX = 0
        this.lastDeltaY = 0
        break
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
