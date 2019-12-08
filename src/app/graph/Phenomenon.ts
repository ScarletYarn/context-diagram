export enum PhenomenonType {
  Event,
  State,
  Value
}

export class Phenomenon {
  public name: string
  public constraint: boolean
  public type: PhenomenonType
  public static PhenomenonList: Array<Phenomenon> = []

  public static getPhenomenon(name: string): Phenomenon {
    for (let item of Phenomenon.PhenomenonList) {
      if (item.name === name) return item
    }
  }

  constructor(
    name: string = '',
    type: PhenomenonType = PhenomenonType.Event,
    constraint: boolean = false
  ) {
    this.name = name
    this.type = type
    this.constraint = constraint
    Phenomenon.PhenomenonList.push(this)
  }

  public toSerializable(): {
    name: string
    type: PhenomenonType
    constraint: boolean
  } {
    return {
      name: this.name,
      type: this.type,
      constraint: this.constraint
    }
  }
}
