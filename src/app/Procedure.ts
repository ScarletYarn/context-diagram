import { Vue } from 'vue/types/vue'

class Procedure {
  private _Vue: Vue

  constructor(vue: Vue) {
    this._Vue = vue
  }

  public next(): boolean {
    return true
  }
}

export default Procedure
