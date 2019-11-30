/* A singleton configuration class. */
class Config {
  public spriteWidth = 120
  public spriteHeight = 60
  public squareRadius = 5
  public lineInterval = 10
  public textStyle = {
    fontFamily: 'Arial',
    fontSize: 12
  }

  public static instance: Config
  constructor() {
    if (Config.instance) return Config.instance
  }
}

export default Config
