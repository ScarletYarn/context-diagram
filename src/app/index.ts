import Hammer from 'hammerjs'

class Test {
  simpleTest() {
    let element = document.getElementById('canvas')
    if (element) {
      const hammertime = new Hammer(element)
      hammertime.on('tap', function(e) {})
    }
  }
}

export default Test
