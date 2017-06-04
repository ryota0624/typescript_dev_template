interface OneCase<Klass, ReturnType> {
  fn: (instance: Klass) => ReturnType;
  klass: Klass;
}

class None {}
function match(data: any) {
  function isNone(v: any): boolean {
    return (undefined === v || null === v);
  }
  const primitiveTypeKlassMap: {[str in string]} = {
    "number": Number,
    "string": String,
    "boolean": Boolean
  };
  const fncType: [(a: any) => boolean, any][] = [[Array.isArray, Array], [isNone, None]];

  return <ReturnType>(...cases: OneCase<any, ReturnType>[]) => {
    const targetKlassType = typeof data;
    let targetKlass = primitiveTypeKlassMap[targetKlassType];
    if (isNone(targetKlass)) {
      targetKlass = data;
    }
    const oneCase = cases.find((kase) => targetKlass instanceof kase.klass);
    if (oneCase) {
      return oneCase.fn(data);
    } else {
      throw new Error(`missing case ${data}`);
    }
  };
}
function caseOf2<Klass>(klassConstructor: new(...args: any[]) => Klass) {
  return <ReturnType>(fnction: (instance: Klass) => ReturnType) => {
    return {
      fn: fnction,
      klass: klassConstructor
    };
  };
}

const num = match(2)(
  caseOf2(Number)((n) => n.toString()),
  caseOf2(Object)(() => "default")
);

const arr = match([8983, 90])(
  caseOf2(Number)((n) => n.toString()),
  caseOf2(Array)((n) => n.join()),
  caseOf2(Object)(() => "default")
);

console.log(arr);
console.log(num);

interface A {

}
interface B {
  b: number;
}

function create(): new() => A & B {
  return class C {
    b: number;
  };
}