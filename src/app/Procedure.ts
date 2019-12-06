import Canvas from '@/app/Canvas'

class Procedure {
  private step: number
  private subStep: number
  private canvas: Canvas

  constructor(canvas: Canvas) {
    this.step = 1
    this.subStep = 1
    this.canvas = canvas
  }

  public next(): { err?: string; step?: number; subStep?: number } {
    if (this.subStep < 3) {
      this.subStep++
    } else if (this.step === 1 && this.subStep === 4) {
      this.step = 2
      this.subStep = 1
    } else if (this.step === 1) {
      this.subStep++
    }
    return {
      err: 'illegal'
    }
  }

  public previous(): { step: number; subStep: number } {
    if (this.subStep > 1) {
      this.subStep--
    } else if (this.step === 2) {
      this.step = 1
      this.subStep = 4
    }
    return {
      step: this.step,
      subStep: this.subStep
    }
  }

  public getAllow(step: number, subStep: number): Array<boolean> {
    return [true, true, true, true, true, true]
  }
}

export default Procedure
