// https://www.npmjs.com/package/enum-list?activeTab=readme

export interface EnumItem<T> {
  value: T;
  label: string;
  [x: string]: any;
}

export class Enum<T, S extends readonly EnumItem<T>[]> {
  private states: S
  constructor(states: S) {
    this.states = states
  }

  get value(): Map<T, EnumItem<T>> {
    const res = new Map<T, EnumItem<T>>()

    this.states.forEach(v => {
      res.set(v.value, v)
    })
    return res
  }

  get label(): Map<S[number]['label'], EnumItem<T>> {
    const res = new Map<S[number]['label'], EnumItem<T>>()
    this.states.forEach(v => {
      res.set(v.label, v)
    })
    return res
  }
}
