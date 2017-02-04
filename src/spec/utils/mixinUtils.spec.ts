import test from 'ava';
import { mixin, override, OverrideFunc } from '../../main/utils/mixinUtils';

test('mixin', (t) => {
  class A {
    hello() {
      return 'hello';
    }
  }

  @mixin(A)
  class B implements A {
    hello: () => string;
  }

  t.truthy(B.prototype.hasOwnProperty('hello'));
  const b = new B();
  t.deepEqual(b.hello(), 'hello');

});

test('mixin With override', (t) => {
  class A {
    hello() {
      return 'hello';
    }
  }

  const ov = 'ov';

  @mixin(A)
  class B implements A {
    @override hello() {
      return A.prototype.hello.apply(this) + ov;
    };

    say() {

    }
  }
  const b = new B();

  t.truthy(B.prototype.hasOwnProperty('hello'));
  t.deepEqual(b.hello(), "hello" + ov);

});

test('multiple mixin', (t) => {
  class A {
    helloA() {
      return 'helloA';
    }
  }

  class B {
    helloB() {
      return 'helloB';
    }
  }

  @mixin(A, B)
  class C implements A, B {
    helloA: () => string;
    helloB: () => string;
    hello() {
      return 'hello';
    }
  }

  t.truthy(C.prototype.hasOwnProperty('helloA'));
  t.truthy(C.prototype.hasOwnProperty('helloB'));

  const c = new C();
  t.deepEqual(c.hello(), 'hello');
  t.deepEqual(c.helloA(), 'helloA');
  t.deepEqual(c.helloB(), 'helloB');


});

test('mixin withAbstractClass', (t) => {
  abstract class A {
    hello() {
      return 'hello';
    }

    abstract fakeHello(str: string): string 
  }

  @mixin(A)
  class B implements A {
    hello: () => string;
    fakeHello(str: string) {
      return `fake ${str}`;
    }
  }

  t.truthy(B.prototype.hasOwnProperty('hello'));
  t.truthy(B.prototype.hasOwnProperty('fakeHello'));

  const b = new B();
  t.deepEqual(b.hello(), 'hello');
  t.deepEqual(b.fakeHello(b.hello()), `fake ${b.hello()}`);

});
