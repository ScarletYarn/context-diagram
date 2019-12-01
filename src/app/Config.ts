/* A singleton configuration class. It should never import other classes.*/
class Config {
  public spriteWidth = 120
  public spriteHeight = 60
  public squareRadius = 5
  public lineInterval = 10
  public textStyle = {
    fontFamily: 'Arial',
    fontSize: 14,
    align: 'center'
  }
  public strokeColor = 0x000000
  public activeStrokeColor = 0xff9800

  public defaultMachineName = 'machine'
  public defaultMachineShortName = 'M'

  public defaultDomainName = 'problemDomain'
  public defaultDomainShortName = 'PD'

  public static instance: Config
  constructor() {
    if (Config.instance) return Config.instance
  }
}

export default Config
