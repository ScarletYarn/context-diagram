import Canvas from '@/app/Canvas'
import { DomainConnected } from '@/app/rules/DomainConnected'
import { InterfaceDefined } from '@/app/rules/InterfaceDefined'
import { MachineConnected } from '@/app/rules/MachineConnected'
import { MultipleDomain } from '@/app/rules/MultipleDomain'
import { MultipleRequirement } from '@/app/rules/MultipleRequirement'
import { OneRequirement } from '@/app/rules/OneRequirement'
import { ReferenceDefined } from '@/app/rules/ReferenceDefined'

class Procedure {
  private step: number
  private subStep: number
  private readonly canvas: Canvas
  public static ruleSet = [
    new DomainConnected(),
    new InterfaceDefined(),
    new MachineConnected(),
    new MultipleDomain(),
    new MultipleRequirement(),
    new OneRequirement(),
    new ReferenceDefined()
  ]

  constructor(canvas: Canvas, step?: number, subStep?: number) {
    if (step) this.step = step
    else this.step = 1
    if (subStep) this.subStep = subStep
    else this.subStep = 1
    this.canvas = canvas
  }

  public next(): {
    err?: string
    success?: string
    step?: number
    subStep?: number
  } {
    let flag = true
    let info = ''
    let success = ''
    for (let rule of Procedure.ruleSet) {
      let res = rule.check(this.canvas, this.step, this.subStep)
      flag = flag && res.flag
      info += res.info
    }
    if (!flag) {
      return {
        err: info
      }
    } else {
      if (
        (this.step === 1 && this.subStep < 3) ||
        (this.step === 2 && this.subStep < 2)
      ) {
        this.subStep++
      } else if (this.step === 1 && this.subStep === 3) {
        this.step = 2
        this.subStep = 1
        success = 'Step one all right'
      } else if (this.step === 2 && this.subStep === 2) {
        this.step = 2
        this.subStep = 3
        success = 'Diagram all right'
      }
      return {
        success: success,
        step: this.step,
        subStep: this.subStep
      }
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

  public getAllow(): Array<boolean> {
    if (this.step == 1) {
      if (this.subStep == 1) {
        return [true, false, false, false, false, false]
      } else if (this.subStep == 2) {
        return [false, true, false, false, false, false]
      } else if (this.subStep === 3) {
        return [false, false, false, true, false, false]
      }
    }
    if (this.subStep == 1) {
      return [false, false, true, false, false, false]
    } else if (this.subStep == 2) {
      return [false, false, false, false, true, true]
    }
    return [false, false, false, false, false, false]
  }
}

export default Procedure
