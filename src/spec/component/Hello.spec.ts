import test from 'ava';
import Hello from '../../main/component/Hello';

test("Hello static fun", (t) => {
  t.deepEqual(Hello.World(), "World")
});