import { Rule } from '@/app/rules/Rule'
import Canvas from '@/app/Canvas'

export class DomainConnected extends Rule {
  check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string } {
    if (step === 1 && subStep === 3) {
      for (let domain of canvas.domainList) {
        if (domain.isIsolated) {
          return {
            flag: false,
            info: 'Exist Unconnected ProblemDomain.\n'
          }
        }
      }
    } else return { flag: true, info: '' }
  }
}
