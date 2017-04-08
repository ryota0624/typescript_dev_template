import test from 'ava';
import Hello from '../../main/components/Hello';

test("Hello static fun", (t) => {
  t.deepEqual(Hello.World(), "World")
});