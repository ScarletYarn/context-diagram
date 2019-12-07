import Canvas from '@/app/Canvas'

class Procedure {
  private step: number
  private subStep: number
  private canvas: Canvas

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
    debugger
    if (
      (this.step === 1 && this.subStep < 3) ||
      (this.step === 2 && this.subStep < 2)
    ) {
      this.subStep++
    } else if (this.step === 1 && this.subStep === 3) {
      let countDomainList = this.canvas.domainList.length
      let countInterfaceList = this.canvas.interfaceList.length
      this.step = 1
      this.subStep = 1
      for (let interfaceLine of this.canvas.interfaceList) {
        if (interfaceLine.phenomenonList.length === 0) {
          return {
            err: 'Interface without phenomenon'
          }
        }
      }
      if (
        countDomainList === 0 ||
        countInterfaceList === 0 ||
        this.canvas.machine === null
      ) {
        return {
          err: 'Missing machine or domain'
        }
      }
      this.step = 2
      this.subStep = 1
      success = 'Step one all right'
    } else if (this.step === 2 && this.subStep === 2) {
      let countRequirementList = this.canvas.requirementList.length
      let countReferenceList = this.canvas.referenceList.length
      let countConstraintList = this.canvas.constraintList.length
      this.step = 2
      this.subStep = 1
      for (let reference of this.canvas.referenceList) {
        if (reference.phenomenonList.length === 0) {
          return {
            err: 'Reference with phenomenon'
          }
        }
      }
      for (let constraint of this.canvas.constraintList) {
        if (constraint.phenomenonList.length === 0) {
          return {
            err: 'Constraint without phenomenon'
          }
        }
      }
      if (
        countConstraintList === 0 ||
        countReferenceList === 0 ||
        countRequirementList === 0
      ) {
        return {
          err: 'Illegal'
        }
      }
      success = 'Diagram all right'
      this.step = 2
      this.subStep = 1
    }
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
