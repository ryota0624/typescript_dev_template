import * as React from 'react';
import { Table } from '../utils/Table';
import { DataBody } from '../utils/DataBody';

import { HeaderProperty, Header } from '../utils/Header';
import { TableItemAttribute } from '../utils/Table';
import { Footer } from '../utils/Footer';
import { ItemAttribute } from '../utils/Body';


class Job {
  constructor(readonly name: string) {}
}
class Human {
  constructor(readonly id: string, readonly name: string, readonly age: number, readonly job: Job) { }

  static create({ id, name, age, job}: {[P in keyof Human]: Human[P]} ) {
    return new Human(id, name, age, job);
  }
}

export class HumanTableHeader extends Header<Human> {}
export class HumanFooter extends Footer<Human> { }
export class HumanTableBody extends DataBody<Human> {
  static attiributes = {
    id: ItemAttribute.create({
      html: {width: 100, height: 100}, wrap: (value) => <p>{value}</p>}),
    name: ItemAttribute.create({ html: {width: 100, height: 100} }),
    age: ItemAttribute.create({ html: {width: 100, height: 100} }),
  }

  getItem(data: Human, index: number, attributes: { [P in keyof Human]?: ItemAttribute }) {
    return super.getItem(data, index, attributes);
  }

  onClickData(property: string ,data: Human) {
    console.log(property, data)
  }
}

export const sampleDatas = Array.from({ length: 10 }).map((_, id) => {
  return Human.create({id: id.toString(), name: `${id} san`, age: id, job: new Job("neet")})
})