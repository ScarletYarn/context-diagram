import { Rule } from '@/app/rules/Rule'
import Canvas from '@/app/Canvas'

export class MultipleDomain extends Rule {
  check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string } {
    if (step === 1 && subStep === 3) {
      if (canvas.domainList.length > 1) {
        return {
          flag: false,
          info: 'No Multiple Domain.\n'
        }
      }
    } else
      return {
        flag: true,
        info: ''
      }
  }
}
