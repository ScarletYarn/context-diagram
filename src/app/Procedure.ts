import Canvas from '@/app/Canvas'

class Procedure {
  private step: number
  private subStep: number
  private canvas: Canvas
  public static ruleSet = [
    {
      rule: 'One Machine',
      valid: true
    },
    {
      rule: 'Multiple Requirement',
      valid: false
    },
    {
      rule: 'Interface Defined',
      valid: true
    },
    {
      rule: 'Multiple ProblemDomain',
      valid: true
    },
    {
      rule: 'No Machine Unconnected',
      valid: true
    },
    {
      rule: 'No ProblemDomain Unconnected',
      valid: true
    },
    {
      rule: 'Reference Defined',
      valid: true
    },
    {
      rule: 'Constraint Defined',
      valid: true
    }
  ]
  // public ruleSet = ['One Machine', 'Multiple Requirement']
  // public rules = [0]

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
    let success = ''
    let err = ''
    if (
      (this.step === 1 && this.subStep < 3) ||
      (this.step === 2 && this.subStep < 2)
    ) {
      this.subStep++
    } else if (this.step === 1 && this.subStep === 3) {
      let countDomainList = this.canvas.domainList.length
      for (let interfaceLine of this.canvas.interfaceList) {
        if (
          Procedure.ruleSet[2]['valid'] &&
          interfaceLine.phenomenonList.length === 0
        ) {
          err += 'Exist undefined interface.\n'
          break
        }
      }
      if (Procedure.ruleSet[3]['valid'] && countDomainList === 0) {
        err += 'No ProblemDomain detected.\n'
      }
      if (Procedure.ruleSet[0]['valid'] && this.canvas.machine === null) {
        err = 'No Machine detected.'
      } else if (
        Procedure.ruleSet[4]['valid'] &&
        this.canvas.machine.isIsolated
      ) {
        err += 'Exist Unconnected Machine.\n'
      }
      for (let domain of this.canvas.domainList) {
        if (Procedure.ruleSet[5]['valid'] && domain.isIsolated) {
          err += 'Exist Unconnected ProblemDomain.\n'
          break
        }
      }
      if (err === '') {
        this.step = 2
        this.subStep = 1
        success = 'Step one all right'
      }
    } else if (this.step === 2 && this.subStep === 2) {
      for (let reference of this.canvas.referenceList) {
        if (
          Procedure.ruleSet[6]['valid'] &&
          reference.phenomenonList.length === 0
        ) {
          err += 'Exist undefined reference.\n'
          break
        }
      }
      for (let constraint of this.canvas.constraintList) {
        if (
          Procedure.ruleSet[7]['valid'] &&
          constraint.phenomenonList.length === 0
        ) {
          err += 'Exist undefined constraint.\n'
        }
      }
      /* ** New: Change the detecting rules to check a list of requirements. */
      if (this.canvas.requirementList.length === 0) {
        err += 'No Requirement detected.\n'
      } else if (
        Procedure.ruleSet[1]['valid'] &&
        this.canvas.requirementList.length === 1
      ) {
        err += 'Just One Requirement detected.\n'
      } else {
        for (let item of this.canvas.requirementList) {
          if (item.isIsolated) {
            err += 'Exist Unconnected Requirement.\n'
            break
          }
        }
      }
      if (err === '') {
        this.step = 2
        this.subStep = 3
        success = 'Diagram all right'
      }
    }
    if (err.length !== 0) return { err: err }
    else
      return {
        success: success,
        step: this.step,
        subStep: this.subStep
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
