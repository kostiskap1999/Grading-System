type AnyFunction = { (...args: any): any };

export class Signal<Fn extends AnyFunction> {
  callbacks: { (...args: Parameters<Fn>): void }[] = []

  connect(callback: Fn) {
      this.callbacks.push(callback)
  }

  async call(...args: Parameters<Fn>) {
      this.callbacks.forEach(callback => callback(...args))
  }

  clear() {
      this.callbacks = []
  }
}

export const onError = new Signal<{ (e: Error): void }>()
export const afterRequest = new Signal<{ (): void }>()