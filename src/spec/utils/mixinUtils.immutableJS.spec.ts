import * as I from 'immutable';
import test from 'ava';
import {mixin, override} from '../../main/utils/mixinUtils';

test('mixin ImRecord subClass', (t) => {
  const recordProps = {
    name: '',
    id: 0
  }

  class Human extends I.Record(recordProps) {
    constructor(props: typeof recordProps) {
      super(props);
    }
    name: string;
    id: number;

    intro() {
      return `${this.id.toString()} ${this.name}`;
    }

    attack() {
      return 1;
    }
  }

  const mutantInitialProps = Object.assign({}, recordProps, {
    superPower: ""
  });

  @mixin(Human)
  class Mutant extends I.Record(mutantInitialProps) implements Human {
    name: string;
    id: number;
    superPower: string;
    constructor(props: typeof mutantInitialProps) {
      super(props);
    }

    intro: () => string;

    @override() attack() {
      return 1000;
    }

    introWithPerformance() {
      return `${this.intro()} ${this.superPower}`
    }
  }

  const r = new Mutant({ name: 'tom', id: 0, superPower: "fire" });
  
  t.deepEqual(r.name, 'tom');
  t.deepEqual(r.id, 0);

  t.deepEqual(r.intro(), '0 tom');
  t.deepEqual(r.attack(), 1000);
  t.deepEqual(r.introWithPerformance(), '0 tom fire');

});