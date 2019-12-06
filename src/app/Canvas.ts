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
import { InterfaceLine } from '@/app/graph/line/InterfaceLine'
import Reference from '@/app/graph/line/Reference'
import Constraint from '@/app/graph/line/Constraint'

const config = new Config()

class Canvas {
  private app: PIXI.Application = null

  private width: number = 700
  private height: number = 450

  private draggingComponent: Shape = null
  private editingComponent: Component = null
  private drawingLine: Line = null
  // record the last delta value
  private lastDeltaX = 0
  private lastDeltaY = 0

  // It should never be set in this class, for it's to be set in Vue instance
  public activePen: number = 0
  public _Vue: Vue = null

  private readonly componentsList: Array<Component> = []

  public machine: Machine = null
  public domainList: Array<Domain> = []
  public requirementList: Array<Requirement> = []

  public interfaceList: Array<InterfaceLine> = []
  public referenceList: Array<Reference> = []
  public constraintList: Array<Constraint> = []

  private static instance: Canvas

  public static init(vue: Vue): void {
    Canvas.instance = new Canvas(vue)
  }

  public static destroy(): void {
    Canvas.instance = null
  }

  public static load(vue: Vue, r: any): Canvas {
    let c = (Canvas.instance = new Canvas(vue))
    let m = r.machine
    let machine = new Machine(
      c.app.stage,
      m.x,
      m.y,
      m.description,
      m.shortName,
      m.baseIndex
    )
    c.machine = machine
    c.componentsList.push(machine)
    for (let item of r.domainList) {
      let domain = new Domain(
        c.app.stage,
        item.x,
        item.y,
        item.description,
        item.shortName,
        item.baseIndex,
        item.physicalProperty,
        item.domainType
      )
      c.domainList.push(domain)
      c.componentsList.push(domain)
    }
    for (let item of r.requirementList) {
      let requirement = new Requirement(
        c.app.stage,
        item.x,
        item.y,
        item.description,
        item.baseIndex
      )
      c.requirementList.push(requirement)
      c.componentsList.push(requirement)
    }
    for (let item of r.interfaceList) {
      for (let it of c.componentsList) {
        if (it.description === item.initiator) {
          item.initiator = it
        }
      }
      for (let it of c.componentsList) {
        if (it.description === item.receiver) {
          item.receiver = it
        }
      }
      let interfaceLine = new InterfaceLine(
        c.app.stage,
        item.description,
        item.baseIndex,
        item.initiator,
        item.receiver
      )
      c.interfaceList.push(interfaceLine)
      c.componentsList.push(interfaceLine)
    }
    for (let item of r.referenceList) {
      for (let it of c.componentsList) {
        if (it.description === item.initiator) {
          item.initiator = it
        }
      }
      for (let it of c.componentsList) {
        if (it.description === item.receiver) {
          item.receiver = it
        }
      }
      let reference = new Reference(
        c.app.stage,
        item.description,
        item.baseIndex,
        item.initiator,
        item.receiver
      )
      c.referenceList.push(reference)
      c.componentsList.push(reference)
    }
    for (let item of r.constraintList) {
      for (let it of c.componentsList) {
        if (it.description === item.initiator) {
          item.initiator = it
        }
      }
      for (let it of c.componentsList) {
        if (it.description === item.receiver) {
          item.receiver = it
        }
      }
      let constraint = new Constraint(
        c.app.stage,
        item.description,
        item.baseIndex,
        item.initiator,
        item.receiver
      )
      c.constraintList.push(constraint)
      c.componentsList.push(constraint)
    }
    return c
  }

  public exportImage(): void {
    const image = this.app.renderer.plugins.extract.image(this.app.stage)
    image.onload = e => {
      let tmp = document.createElement('a')
      // @ts-ignore
      tmp.href = e.path[0].src
      tmp.download = 'img.png'
      tmp.click()
    }
  }

  constructor(vue?: Vue) {
    if (Canvas.instance) return Canvas.instance
    if (vue) this._Vue = vue

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
        this.draggingComponent = null
        this.lastDeltaX = 0
        this.lastDeltaY = 0
        if (this.drawingLine) {
          if (this.drawingLine.attached) {
            this.drawingLine.mount()
            this.componentsList.push(this.drawingLine)
            if (this.drawingLine instanceof InterfaceLine)
              this.interfaceList.push(this.drawingLine)
            else if (this.drawingLine instanceof Reference)
              this.referenceList.push(this.drawingLine)
            else if (this.drawingLine instanceof Constraint)
              this.constraintList.push(this.drawingLine)
          } else {
            this.drawingLine.destroy()
          }
          this.drawingLine = null
        }
        this._Vue.$data['activePen'] = undefined
        break
    }
  }

  private doubleTapHandler(e: HammerInput): void {
    if (!('layerX' in e.srcEvent && 'layerY' in e.srcEvent)) return
    let comp = this.hit(e.srcEvent.layerX, e.srcEvent.layerY)
    if (comp) {
      this.editingComponent = comp
      if (comp instanceof Machine) {
        this._Vue.$emit('editMachine', <Machine>comp)
      } else if (comp instanceof Domain) {
        this._Vue.$emit('editDomain', <Domain>comp)
      } else if (comp instanceof Requirement) {
        this._Vue.$emit('editRequirement', <Requirement>comp)
      } else if (comp instanceof InterfaceLine) {
        this._Vue.$emit('editInterface', <InterfaceLine>comp)
      } else if (comp instanceof Reference) {
        this._Vue.$emit('editReference', <Reference>comp)
      } else if (comp instanceof Constraint) {
        this._Vue.$emit('editConstraint', <Constraint>comp)
      }
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
