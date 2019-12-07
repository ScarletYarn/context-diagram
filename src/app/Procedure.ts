import Canvas from '@/app/Canvas'

class Procedure {
  private step: number
  private subStep: number
  private canvas: Canvas
  private err: string

  constructor(canvas: Canvas) {
    this.step = 1
    this.subStep = 1
    this.canvas = canvas
  }

  public next(): { err?: string; step?: number; subStep?: number } {
    if (this.subStep < 3) {
      this.subStep++
    } else if (this.step === 1 && this.subStep === 4) {
	  this.err = ''
	  let countDomainList = this.canvas.domainList.length
	  let countInterfaceList = this.canvas.interfaceList.length
	  this.step = 1
      this.subStep = 1
	  for (let interfaceLine of this.canvas.interfaceList){
		if (interfaceLine.phenomenonList === 0){ 
          this.err += 'Exist undefined interface. \n '
		}
		break
	  }
	  if (countDomainList === 0){
		this.err += 'Does not ProblemDomain.\n '
	  }
	  if (this.canvas.machine === null){
		this.err += 'Does not Machine.\n'
      }else if (this.canvas.machine.attachedLinies.length === 0){
		this.err += 'Exist Unconnected Machine.\n'
	  }
	  for (let domain of this.domainList){
		if (domain.attachedLinies.length === 0){ 
          this.err += 'Exist Unconnected ProblemDomain.\n '
		}
		break
	  }
	  if (this.err === ''){
        this.step = 2
        this.subStep = 1
	  }
    } else if (this.step === 2 && this.subStep === 4) {
	  let countReferenceList = this.canvas.referenceList.length
	  let countConstraintList = this.canvas.constraintList.length
	  this.step = 2
      this.subStep = 1
	  for (let reference of this.canvas.referenceList){
		if (reference.phenomenonList === 0){ 
          this.err += 'Exist undefined interface. \n '
		}
		break
	  }
	  for (let constraint of this.canvas.constraintList){
		if (constraint.phenomenonList === 0){ 
          this.err += 'Exist undefined constraint. \n '
		}
		break
	  }
	  if (this.canvas.requirement === null){
		this.err += 'Does not Requirement.\n'
      }else if (this.canvas.requirement.attachedLinies.length === 0){
		this.err += 'Exist Unconnected Requirement.\n'
	  }
	  if (this.err === ''){
        this.step = 2
        this.subStep = 4
	  }
	}
	return {
      err: this.err,
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

  public getAllow(step: number, subStep: number): Array<boolean> {
    if (this.step == 1) {
	  if (this.subStep == 1) {
        return [true, false, false, false, false, false]
      } else if (this.subStep == 2) {
        return [false, true, false, false, false, false]
      } else if (this.substep === 3) {
        return [false, false, false, true, false, false]
      }
	}
    if (this.subStep == 1) {
      return [false, false, true, false, false, false]
    } else if (this.subStep == 2) {
      return [false, false, false, false, true, true]
    }
    }
	return [false, false, false, false, false, false]
  }
}

export default Procedure
