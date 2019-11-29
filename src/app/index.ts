import * as PIXI from 'pixi.js'
import img from '@/assets/bonny.jpg'
import Hammer from 'hammerjs'

class Test {
  simpleTest() {
    let element = document.getElementById('canvas')
    if (element) {
      const hammertime = new Hammer(element)
      hammertime.on('tap', function(e) {
        if ('layerX' in e.srcEvent && 'layerY' in e.srcEvent) {
          console.log(`X: ${e.srcEvent.layerX} Y: ${e.srcEvent.layerY}`)
        }
      })
    }
  }
}

export default Test
