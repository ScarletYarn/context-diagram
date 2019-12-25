import { Rule } from '@/app/rules/Rule'
import Canvas from '@/app/Canvas'

export class ReferenceDefined extends Rule {
  check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string } {
    if (step === 1 && subStep === 3) {
      for (let reference of canvas.referenceList) {
        if (reference.phenomenonList.length === 0) {
          return {
            flag: false,
            info: 'Exist undefined reference.\n'
          }
        }
      }
    } else
      return {
        flag: true,
        info: ''
      }
  }
}
