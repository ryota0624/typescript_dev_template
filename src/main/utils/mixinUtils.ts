export class OverrideFunc {
  constructor(public name: string, public value: any) {}
}

export function mixin<T>(base: T): (target: typeof base) => void

export function mixin<T, T2>(base: T, base2: T2): (target: typeof base & typeof base2) => void

export function mixin<T, T2, T3>(
  base: T, base2: T2, base3: T3
): (target: typeof base & typeof base2 & typeof base3) => void

export function mixin<T, T2, T3, T4>(
  base: T, base2: T2, base3: T3, base4: T4
): (target: typeof base & typeof base2 & typeof base3 & typeof base4) => void

export function mixin<T, T2, T3, T4, T5>(
  base: T, base2: T2, base3: T3, base4: T4, base5: T5
): (target: typeof base & typeof base2 & typeof base3 & typeof base4 & typeof base5) => void

export function mixin(...bases: any[]) {
  return (target: any) => {
    bases.forEach(base => {
      Object.getOwnPropertyNames(base.prototype).forEach(name => {
        if (name === "constructor") {
          return;
        }
        if ((target as any).prototype[name] instanceof OverrideFunc) {
          (target as any).prototype[name] = (target as any).prototype[name].value;
        } else {
          (target as any).prototype[name] = (base as any).prototype[name];
        }
      });
    })

  }
}

export function override() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = new OverrideFunc(propertyKey, descriptor.value);
  }
}