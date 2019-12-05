export enum PhenomenonType {
  Event,
  State,
  Value
}

export class Phenomenon {
  public name: string
  public type: PhenomenonType
  public static PhenomenonList: Array<Phenomenon> = []

  constructor(name: string = '', type: PhenomenonType = PhenomenonType.Event) {
    this.name = name
    this.type = type
    Phenomenon.PhenomenonList.push(this)
  }
}
