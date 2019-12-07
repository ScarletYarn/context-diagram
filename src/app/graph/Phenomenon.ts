export enum PhenomenonType {
  Event,
  State,
  Value
}

export class Phenomenon {
  public name: string
  public static PhenomenonList: Array<Phenomenon> = []

  public static getPhenomenon(name: string): Phenomenon {
    for (let item of Phenomenon.PhenomenonList) {
      if (item.name === name) return item
    }
  }

  constructor(name: string = '') {
    this.name = name
    Phenomenon.PhenomenonList.push(this)
  }

  public toSerializable(): { name: string } {
    return {
      name: this.name
    }
  }
}
