import * as PIXI from 'pixi.js'

abstract class Component {
  abstract register(stage: PIXI.Container): void
}

export default Component
