/* A singleton configuration class. It should never import other classes.*/
class Config {
  public spriteWidth = 120
  public spriteHeight = 60
  public squareRadius = 5
  public lineInterval = 10
  public dashedLinePieceLength = 5
  public arrowHead = 5

  /* The z-index gap between each component. */
  public layerGap = 10
  public textStyle = {
    fontFamily: 'Arial',
    fontSize: 14,
    align: 'center'
  }
  public strokeColor = 0x000000
  public activeStrokeColor = 0x1976d2

  public machineColor = 0xb39ddb
  public domainColor = 0xb39ddb
  public requirementColor = 0xb39ddb

  public defaultMachineName = 'machine'
  public defaultMachineShortName = 'M'

  public defaultDomainName = 'problemDomain'
  public defaultDomainShortName = 'PD'

  public defaultRequirementName = 'requirement'

  public defaultInterfaceName = 'interface'

  public defaultReferenceName = 'reference'

  public defaultConstraintName = 'constraint'

  public static instance: Config
  constructor() {
    if (Config.instance) return Config.instance
    Config.instance = this
  }

  public hexToRGB(color: number): string {
    let red = Math.floor(color / 0x010000)
    let green = Math.floor((color % 0x010000) / 0x0100)
    let blue = color % 0x000100
    return `rgb(${red}, ${green}, ${blue})`
  }
}

export default Config
