import Machine from '@/app/graph/shape/Machine'
import { Domain } from '@/app/graph/shape/Domain'
import Requirement from '@/app/graph/shape/Requirement'

export class ShapeFactory {
  constructor() {}

  getShape(
    stage: PIXI.Container,
    type: string,
    description: string,
    x,
    y,
    index
  ) {
    switch (type) {
      case 'M':
        return new Machine(stage, x, y, description, 'M' + index, index)
      case 'D':
        return new Domain(stage, x, y, description, 'D' + index, index)
      case 'R':
        return new Requirement(stage, x, y, description, index)
    }
  }
}
