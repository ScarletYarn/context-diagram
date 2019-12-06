export enum PhenomenonType {
  Event,
  State,
  Value
}

export class Phenomenon {
  public name: string
  public static PhenomenonList: Array<Phenomenon> = []

  constructor(name: string = '') {
    this.name = name
    Phenomenon.PhenomenonList.push(this)
  }
}
