import Component from '@/app/Component'
import * as PIXI from 'pixi.js'

class Machine extends Component {
  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }

  paint(): Array<PIXI.Container> {
    let g = new PIXI.Graphics()
    g.lineStyle(2, 0x000000, 1)
    g.beginFill(0, 0)
    g.drawRoundedRect(0, 0, this.width, this.height, this.radius)
    g.moveTo(this.interval, 0)
    g.lineTo(this.interval, this.height)
    g.moveTo(2 * this.interval, 0)
    g.lineTo(2 * this.interval, this.height)
    g.endFill()
    g.x = this.x
    g.y = this.y

    let text = new PIXI.Text('Default Machine', this.textStyle)
    text.x = this.x + 2.5 * this.interval
    text.y = this.y + this.height / 2 - this.textStyle.fontSize

    return [g, text]
  }
}

export default Machine
