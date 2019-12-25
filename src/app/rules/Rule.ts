import Canvas from '@/app/Canvas'

export abstract class Rule {
  public abstract check(
    canvas: Canvas,
    step: number,
    subStep: number
  ): { flag: boolean; info: string }
}
