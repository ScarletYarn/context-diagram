/**
 * The domain remember the relative phenomenons.
 * Stuff the phenomenon list using its own list.
 * Phenomenon divided into left and right.
 * No duplicate in the left and different line in the right can have phenomenon with the same description.
 * One shouldn't be able to go back to previous big step.
 */

import Shape from '@/app/graph/shape/Shape'

export enum PhenomenonType {
  Event,
  State,
  Value
}

export enum PhenomenonPosition {
  Left,
  Right
}

export class Phenomenon {
  public name: string
  public description: string
  public constraint: boolean
  public type: PhenomenonType
  public position: PhenomenonPosition
  public initiator: Shape
  public receiver: Shape
  public static PhenomenonList: Array<Phenomenon> = []

  public static getPhenomenon(
    description: string,
    isLeft: boolean = false
  ): Phenomenon {
    for (let item of Phenomenon.PhenomenonList) {
      if (
        item.description === description &&
        (!isLeft || (isLeft && item.position === PhenomenonPosition.Left))
      )
        return item
    }
  }

  public static deletePhenomenon(name: string): void {
    let res
    Phenomenon.PhenomenonList.forEach((item, index) => {
      if (item.name === name) res = index
    })
    Phenomenon.PhenomenonList.splice(res, 1)
  }

  constructor(
    description: string = '',
    position: PhenomenonPosition,
    initiator: Shape,
    receiver: Shape,
    type: PhenomenonType = PhenomenonType.Event,
    constraint: boolean = false
  ) {
    this.name = Phenomenon.PhenomenonList.length.toString()
    this.description = description
    this.type = type
    this.constraint = constraint
    this.position = position
    this.initiator = initiator
    this.receiver = receiver
    Phenomenon.PhenomenonList.push(this)
  }

  public toSerializable(): {
    name: string
    type: PhenomenonType
    constraint: boolean
    initiator: string
    receiver: string
    position: number
  } {
    return {
      name: this.name,
      type: this.type,
      constraint: this.constraint,
      initiator: this.initiator.description,
      receiver: this.receiver.description,
      position: this.position
    }
  }
}
