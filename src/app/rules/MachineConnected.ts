import { Rule } from '@/app/rules/Rule'
import Canvas from '@/app/Canvas'

export class MachineConnected extends Rule {
  check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string } {
    if (step === 1 && subStep === 3) {
      if (canvas.machine.isIsolated) {
        return {
          flag: false,
          info: 'Exist Unconnected Machine.\n'
        }
      }
    } else
      return {
        flag: true,
        info: ''
      }
  }
}
