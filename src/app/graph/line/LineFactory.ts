import { InterfaceLine } from '@/app/graph/line/InterfaceLine'
import Shape from '@/app/graph/shape/Shape'
import Reference from '@/app/graph/line/Reference'
import Constraint from '@/app/graph/line/Constraint'

export class LineFactory {
  constructor() {}

  getLine(
    stage: PIXI.Container,
    type: string,
    description: string,
    initiator: Shape,
    receiver: Shape,
    index: number
  ) {
    switch (type) {
      case 'I':
        return new InterfaceLine(stage, description, index, initiator, receiver)
      case 'R':
        return new Reference(stage, description, index, initiator, receiver)
      case 'C':
        return new Constraint(stage, description, index, initiator, receiver)
    }
  }
}
