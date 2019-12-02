/* A singleton configuration class. It should never import other classes.*/
class Config {
  public spriteWidth = 120
  public spriteHeight = 60
  public squareRadius = 5
  public lineInterval = 10

  /* The z-index gap between each component. */
  public layerGap = 10
  public textStyle = {
    fontFamily: 'Arial',
    fontSize: 14,
    align: 'center'
  }
  public strokeColor = 0x000000
  public activeStrokeColor = 0xff9800

  public machineColor = 0xff0000
  public domainColor = 0x00ff00

  public defaultMachineName = 'machine'
  public defaultMachineShortName = 'M'

  public defaultDomainName = 'problemDomain'
  public defaultDomainShortName = 'PD'

  public static instance: Config
  constructor() {
    if (Config.instance) return Config.instance
    Config.instance = this
  }
}

export default Config
