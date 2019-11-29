import Component from '@/app/Component'
import * as PIXI from 'pixi.js'

class Machine extends Component {
  register(stage: PIXI.Container): void {
    let roundBox = new PIXI.Graphics()
    roundBox.lineStyle(4, 0x99ccff, 1)
    roundBox.beginFill(0, 0)
    roundBox.drawRoundedRect(0, 0, 84, 36, 10)
    roundBox.endFill()
    roundBox.x = 48
    roundBox.y = 190
    stage.addChild(roundBox)
  }
}

export default Machine
