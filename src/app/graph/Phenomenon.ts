export enum PhenomenonType {
  Event,
  State,
  Value
}

export class Phenomenon {
  public name: string
  public constraint: boolean
  public static PhenomenonList: Array<Phenomenon> = []

  public static getPhenomenon(name: string): Phenomenon {
    for (let item of Phenomenon.PhenomenonList) {
      if (item.name === name) return item
    }
  }

  constructor(name: string = '', constraint: boolean = false) {
    this.name = name
    this.constraint = false
    Phenomenon.PhenomenonList.push(this)
  }

  public toSerializable(): { name: string; constraint: boolean } {
    return {
      name: this.name,
      constraint: this.constraint
    }
  }
}
