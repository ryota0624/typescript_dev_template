export function inject<T>(base: T): <C>(target: (typeof base & C)) => typeof target;

export function inject<T, T2>(base: T, base2: T2): <C>(target: typeof base & typeof base2 & C) => typeof target;

export function inject<T, T2, T3>(
  base: T, base2: T2, base3: T3
): <C>(target: typeof base & typeof base2 & typeof base3 & C) => typeof target;

export function inject<T, T2, T3, T4>(
  base: T, base2: T2, base3: T3, base4: T4
): <C>(target: typeof base & typeof base2 & typeof base3 & typeof base4 & C) => typeof target;

export function inject<T, T2, T3, T4, T5>(
  base: T, base2: T2, base3: T3, base4: T4, base5: T5
): <C>(target: typeof base & typeof base2 & typeof base3 & typeof base4 & typeof base5 & C) => typeof target;

export function inject(...bases: any[]) {
  return (target: any) => {
    bases.forEach(base => {
      Object.getOwnPropertyNames(base.prototype).forEach(name => {
        if (name === "constructor") {
          return;
        }
        (target as any).prototype[name] = (base as any).prototype[name];
      });
    });
    return target;
  };
}
