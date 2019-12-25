import { Rule } from '@/app/rules/Rule'
import Canvas from '@/app/Canvas'

export class OneRequirement extends Rule {
  check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string } {
    if (step === 1 && subStep === 3) {
      if (canvas.requirementList.length > 1) {
        return {
          flag: false,
          info: 'Multiple Requirements.\n'
        }
      }
    } else
      return {
        flag: true,
        info: ''
      }
  }
}
