import * as PIXI from 'pixi.js'
import Component from '@/app/graph/Component'
import Machine from '@/app/graph/shape/Machine'
import Hammer from 'hammerjs'
import { Vue } from 'vue/types/vue'
import Config from '@/app/util/Config'
import { Domain } from '@/app/graph/shape/Domain'
import Shape from '@/app/graph/shape/Shape'
import Requirement from '@/app/graph/shape/Requirement'
import Line from '@/app/graph/line/Line'
import InterfaceLine from '@/app/graph/line/InterfaceLine'
import Reference from '@/app/graph/line/Reference'
import Constraint from '@/app/graph/line/Constraint'
const config = new Config()

class Canvas {
  private app: PIXI.Application

  private width: number = 700
  private height: number = 450

  private draggingComponent: Shape | undefined
  private editingComponent: Component | undefined
  private drawingLine: Line | undefined
  // record the last delta value
  private lastDeltaX = 0
  private lastDeltaY = 0

  // It should never be set in this class, for it's to be set in Vue instance
  public activePen: number = 0
  public _Vue: Vue

  private readonly componentsList: Array<Component>

  private machine: Machine | null
  private domainList: Array<Domain>
  private requirementList: Array<Requirement>

  private interfaceList: Array<InterfaceLine>
  private referenceList: Array<Reference>
  private constraintList: Array<Constraint>

  constructor(vue: Vue) {
    this.componentsList = []
    this.machine = null
    this.domainList = []
    this.requirementList = []
    this.interfaceList = []
    this.referenceList = []
    this.constraintList = []
    this._Vue = vue

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio
    })

    this.app.renderer.backgroundColor = 0xffffff
    this.app.stage.sortableChildren = true

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
      hammertime.on('doubletap', this.doubleTapHandler.bind(this))
    }
  }

  private tapHandler(e: HammerInput): void {
    // For now, we simply add a rectangle to the canvas.
    if ('layerX' in e.srcEvent && 'layerY' in e.srcEvent) {
      switch (this.activePen) {
        case 0:
          if (this.machine) {
            this._Vue.$emit('giveWarn', 'There can exist only one machine. ')
            return
          }
          let machine = new Machine(
            this.app.stage,
            e.srcEvent.layerX,
            e.srcEvent.layerY,
            config.defaultMachineName,
            config.defaultMachineShortName,
            this.componentsList.length * config.layerGap
          )
          this.machine = machine
          this.componentsList.push(machine)
          break
        case 1:
          let domain = new Domain(
            this.app.stage,
            e.srcEvent.layerX,
            e.srcEvent.layerY,
            config.defaultDomainName + (this.domainList.length + 1),
            config.defaultDomainShortName + (this.domainList.length + 1),
            this.componentsList.length * config.layerGap
          )
          this.domainList.push(domain)
          this.componentsList.push(domain)
          break
        case 2:
          debugger
          let requirement = new Requirement(
            this.app.stage,
            e.srcEvent.layerX,
            e.srcEvent.layerY,
            config.defaultRequirementName + (this.requirementList.length + 1),
            this.componentsList.length * config.layerGap
          )
          this.requirementList.push(requirement)
          this.componentsList.push(requirement)
          break
        case undefined:
          // eslint-disable-next-line no-case-declarations
          let comp = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
          if (comp) {
            for (let item of this.componentsList) {
              if (item === comp) comp.activate()
              else item.deactivate()
            }
          } else {
            for (let item of this.componentsList) {
              item.deactivate()
            }
          }
          break
      }
      this._Vue.$data['activePen'] = undefined
    }
  }

  private panHandler(e: HammerInput): void {
    if (!('layerX' in e.srcEvent && 'layerY' in e.srcEvent)) return
    switch (e.type) {
      case 'panstart':
        let comp = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
        if (!comp) return
        if (!(comp instanceof Shape)) return
        switch (this.activePen) {
          case 3:
            this.drawingLine = new InterfaceLine(
              this.app.stage,
              config.defaultInterfaceName + (this.interfaceList.length + 1),
              (this.componentsList.length + 1) * 10,
              comp
            )
            break
          case 4:
            this.drawingLine = new Reference(
              this.app.stage,
              config.defaultInterfaceName + (this.referenceList.length + 1),
              (this.componentsList.length + 1) * 10,
              comp
            )
            break
          case 5:
            this.drawingLine = new Constraint(
              this.app.stage,
              config.defaultInterfaceName + (this.constraintList.length + 1),
              (this.componentsList.length + 1) * 10,
              comp
            )
            break
          default:
            this.draggingComponent = comp
            break
        }
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
        if (this.drawingLine) {
          let p = { x: e.srcEvent.layerX, y: e.srcEvent.layerY }
          if (!this.drawingLine.selfContain(p)) {
            let hover = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
            if (hover instanceof Shape) this.drawingLine.attach(hover)
            else this.drawingLine.lengthen(p)
          }
        }
        break
      case 'panend':
        this.draggingComponent = undefined
        this.lastDeltaX = 0
        this.lastDeltaY = 0
        if (this.drawingLine) {
          if (this.drawingLine.attached) {
            this.drawingLine.mount()
          } else {
            this.componentsList.pop()
            if (this.drawingLine instanceof InterfaceLine)
              this.interfaceList.pop()
            else if (this.drawingLine instanceof Reference)
              this.referenceList.pop()
            else this.constraintList.pop()
            this.drawingLine.destroy()
          }
          this.drawingLine = undefined
        }
        break
    }
  }

  private doubleTapHandler(e: HammerInput): void {
    if (!('layerX' in e.srcEvent && 'layerY' in e.srcEvent)) return
    let comp = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
    if (comp) {
      this.editingComponent = comp
      this._Vue.$emit('editMachine', <Machine>comp)
    }
  }

  /**
   * Given the tap point, tell the component tapped
   * @return The component tapped or null if no component tapped
   */
  private hit(x: number, y: number): Component | null {
    for (let comp of this.componentsList.reverse()) {
      if (comp.contain({ x, y })) {
        this.componentsList.reverse()
        return comp
      }
    }

    this.componentsList.reverse()
    return null
  }
}

export default Canvas
