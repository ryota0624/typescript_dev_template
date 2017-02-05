export class OverrideFunc {
  constructor(public name: string, public value: any) {}
}

export type Constructable = new (...args: any[]) => object;

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

export function mixin(...bases: Constructable[]) {
  return (target: Constructable) => {
    bases.forEach(base => {
      Object.getOwnPropertyNames(base.prototype).forEach(name => {
        if (name === "constructor") {
          return;
        }
        if ((target).prototype[name] instanceof OverrideFunc) {
          target.prototype[name] = target.prototype[name].value;
        } else {
          target.prototype[name] = base.prototype[name];
        }
      });
    });
    return target;
  }
}

export function override(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.value = new OverrideFunc(propertyKey, descriptor.value);
}

export function With<INJ extends Constructable>(INJ: INJ) {
  return <BC extends Constructable>(Base: BC) => {
    class Mixed {
    
    };
    Object.getOwnPropertyNames(INJ.prototype).forEach(prop => {
      if (prop === "constructor") {
          return;
      }
      // delete Mixed.prototype[prop];
      Object.defineProperty(Mixed.prototype, prop, {
        get: () => {
          return INJ.prototype[prop]  ;
        },
      });

    });
    return Mixed;
    }
}


export function inject(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.get = () => {
    throw new Error("this getter must inject implements");
  }
}

class Time {
  echo: () => string
  get stamp() {
    return new Date();
  }
}


class A implements Time {
  @inject
  get stamp(): Date {
    throw new Error();
  }

  echo() {
    return this.stamp.toDateString();
  }
  
  constructor(public name: string) {}
}


const a = new A("");

// const TimeA = With(Time)(A);
// const timeA = new TimeA("");
// console.log(timeA.stamp);
// console.log(timeA.echo());

// export function WithMulti<INJ extends Constructable>(INJ: INJ) {
//   return <BC extends Constructable>(Base: BC) => {
//     class Mixed extends Base {
    
//     };
//     Object.getOwnPropertyNames(INJ.prototype).forEach(prop => {
//       if (prop === "constructor") {
//           return;
//       }
//       delete Mixed.prototype[prop];
//       Object.defineProperty(Mixed.prototype, prop, {
//         get: () => {
//           return INJ.prototype[prop]  ;
//         },
//       });

//     });
//     return Mixed;
//     }
// }