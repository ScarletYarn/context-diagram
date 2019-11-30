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
    // Handle the HiDpi problem here
    ;(function(prototype) {
      // @ts-ignore
      prototype.getContext = (function(_super) {
        return function(type: string) {
          let backingStore,
            ratio,
            // @ts-ignore
            context = _super.call(this, type)

          if (type === '2d') {
            // @ts-ignore
            backingStore =
              // @ts-ignore
              context.backingStorePixelRatio ||
              // @ts-ignore
              context.webkitBackingStorePixelRatio ||
              // @ts-ignore
              context.mozBackingStorePixelRatio ||
              // @ts-ignore
              context.msBackingStorePixelRatio ||
              // @ts-ignore
              context.oBackingStorePixelRatio ||
              // @ts-ignore
              context.backingStorePixelRatio ||
              1

            ratio = (window.devicePixelRatio || 1) / backingStore

            if (ratio > 1) {
              // @ts-ignore
              this.style.height = this.height + 'px'
              // @ts-ignore
              this.style.width = this.width + 'px'
              // @ts-ignore
              this.width *= ratio
              // @ts-ignore
              this.height *= ratio
            }
          }

          return context
        }
      })(prototype.getContext)
    })(HTMLCanvasElement.prototype)
    ;(function(prototype) {
      let pixelRatio = (function() {
          let canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            backingStore =
              // @ts-ignore
              context.backingStorePixelRatio ||
              // @ts-ignore
              context.webkitBackingStorePixelRatio ||
              // @ts-ignore
              context.mozBackingStorePixelRatio ||
              // @ts-ignore
              context.msBackingStorePixelRatio ||
              // @ts-ignore
              context.oBackingStorePixelRatio ||
              // @ts-ignore
              context.backingStorePixelRatio ||
              1

          return (window.devicePixelRatio || 1) / backingStore
        })(),
        forEach = function(obj: any, func: any) {
          for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
              func(obj[p], p)
            }
          }
        },
        ratioArgs = {
          fillRect: 'all',
          clearRect: 'all',
          strokeRect: 'all',
          moveTo: 'all',
          lineTo: 'all',
          arc: [0, 1, 2],
          arcTo: 'all',
          bezierCurveTo: 'all',
          isPointinPath: 'all',
          isPointinStroke: 'all',
          quadraticCurveTo: 'all',
          rect: 'all',
          translate: 'all',
          createRadialGradient: 'all',
          createLinearGradient: 'all'
        }

      if (pixelRatio === 1) return

      forEach(ratioArgs, function(value: any, key: any) {
        // @ts-ignore
        // @ts-ignore
        prototype[key] = (function(_super) {
          return function() {
            let i,
              len,
              args = Array.prototype.slice.call(arguments)

            if (value === 'all') {
              args = args.map(function(a) {
                return a * pixelRatio
              })
            } else if (Array.isArray(value)) {
              for (i = 0, len = value.length; i < len; i++) {
                args[value[i]] *= pixelRatio
              }
            }

            // @ts-ignore
            return _super.apply(this, args)
          }
          // @ts-ignore
        })(prototype[key])
      })

      // Stroke lineWidth adjustment
      prototype.stroke = (function(_super) {
        return function() {
          // @ts-ignore
          this.lineWidth *= pixelRatio
          // @ts-ignore
          _super.apply(this, arguments)
          // @ts-ignore
          this.lineWidth /= pixelRatio
        }
      })(prototype.stroke)

      // Text
      //
      prototype.fillText = (function(_super) {
        return function() {
          let args = Array.prototype.slice.call(arguments)

          args[1] *= pixelRatio // x
          args[2] *= pixelRatio // y

          // @ts-ignore
          this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function(
            w: any,
            m: any,
            u: any
          ) {
            return m * pixelRatio + u
          })

          // @ts-ignore
          _super.apply(this, args)

          // @ts-ignore
          this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function(
            w: any,
            m: any,
            u: any
          ) {
            return m / pixelRatio + u
          })
        }
      })(prototype.fillText)

      prototype.strokeText = (function(_super) {
        return function() {
          let args = Array.prototype.slice.call(arguments)

          args[1] *= pixelRatio // x
          args[2] *= pixelRatio // y

          // @ts-ignore
          this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function(
            w: any,
            m: any,
            u: any
          ) {
            return m * pixelRatio + u
          })

          // @ts-ignore
          _super.apply(this, args)

          // @ts-ignore
          this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function(
            w: any,
            m: any,
            u: any
          ) {
            return m / pixelRatio + u
          })
        }
      })(prototype.strokeText)
    })(CanvasRenderingContext2D.prototype)

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      transparent: false,
      resolution: 1
    })

    this.app.renderer.backgroundColor = 0xffffff

    this.componentsList = []

    let element = document.getElementById('canvas')
    if (element) {
      element.appendChild(this.app.view)
      console.log(this.app.view.getBoundingClientRect().width)
      console.log(this.app.view.getBoundingClientRect().height)

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
