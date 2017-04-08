import * as React from "react";
import { HumanTableBody, sampleDatas, HumanTableHeader, HumanFooter } from "./example/example";
import { Table } from "./utils/Table";


function average(numbers: number[]) {
  return numbers.reduce((pre, cur) => pre + cur, 0) / numbers.length;
}

export default class Hello extends React.Component<{ str: string }, {}> {
  static World() {
    return "World";
  }
  render() {
    const footer = {
      id: { label: "" },
      name: { label: "" },
      age: { label: average(sampleDatas.map(data => data.age)).toString() },
    }
    return (
      <Table>
        <HumanTableHeader labels={{ id: { label: "ID" }, name: { label: "名前" }, age: { label: "年齢" } }} />
        <HumanTableBody datas={sampleDatas} itemAttributes={HumanTableBody.attiributes}/>
        <HumanFooter labels={footer}/>
      </Table>
    );
  };
}

console.log(sampleDatas)