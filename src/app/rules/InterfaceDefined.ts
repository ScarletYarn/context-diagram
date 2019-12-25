import { Rule } from '@/app/rules/Rule'
import Canvas from '@/app/Canvas'

export class InterfaceDefined extends Rule {
  check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string } {
    if (step === 1 && subStep === 3) {
      for (let interfaceLine of canvas.interfaceList) {
        if (interfaceLine.phenomenonList.length === 0) {
          return {
            flag: false,
            info: 'Exist undefined interface.\n'
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
