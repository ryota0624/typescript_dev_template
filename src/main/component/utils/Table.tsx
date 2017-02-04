import * as React from "react";


export interface TableHeaderProps {
  labels: string[];
  onClickLable: (lable: string) => void;
}
export interface TableItemsProps {
  children: React.Component<any, any>[];
}
export interface TableProps {
  header: JSX.Element;
  items: JSX.Element[];
  footer?: JSX.Element;
}

export class TableItem extends React.Component<{id: string, labels: string[]}, {}> {
  render() {
    const {id, labels} = this.props;
    return (
      <tr>
        {labels.map((label, key) => {
          return <td key={id+"-"+label+"-"+key}>{label}</td>;
        })}
      </tr>
    );
  }
}

export　class TableHeader extends React.Component<TableHeaderProps, {}> {
  render() {
    const {labels, onClickLable} = this.props;
    return (
      <thead>
        <tr>
          {labels.map(label => <th onClick={() => onClickLable(label)} key={`table-header-title-${label}`}>{label}</th>)}
        </tr>
      </thead>
    );
  }
}

export class TableFooter  extends React.Component<{ labels: string[] }, {}> {
  render() {
    const {labels} = this.props;
    return (
      <tfoot>
        <tr>
          {labels.map((label, key) => <th key={`table-footer-title-${label}-${key}`}>{label}</th>)}
        </tr>
      </tfoot>
    );
  }
}

export　class Table extends React.Component<TableProps, {}> {
  render() {
    const {header, items, footer} = this.props;
    return (
      <table>
        {header}
        <tbody>
          {items}
        </tbody>
        {footer}
      </table>
    );
  }
}

class Sample {
  constructor(
    public id: string,
    public name: string,
    public a: number,
    public b: number,
    public c: number,
    public d: number,
  ) { }
  
  static create(props: any) {
    const {id, name, a, b, c, d} = props;
    return new Sample(id, name, a, b, c, d);
  }
}
const initialSample = new Sample("", "", 0, 0, 0, 0);

let samples = Array.from({ length: 30 }).map((_, key) => {
  const id = key + 1;
  return Sample.create({ id, name: `${id}-title`, a: id, b: id, c: id, d: id });
});



const labels = []
export function test() {
  const headerLabels: Array<keyof Sample>= Object.keys(initialSample) as any;
  const labels = headerLabels;
  let items = samples.map((sample, key) => {
    return <TableItem key={key} labels={labels.map(label => {
      const l = sample[label];
      return l as any
    })} id={key.toString()} />;
  });

  const header = <TableHeader labels={labels} onClickLable={(label) => {
    console.log(label);
  }} />;
  const footer = <TableFooter labels={labels.map(label => {
    if (typeof (samples[0] as any)[label] === "string") {
      return "";
    }
    const labelValue = samples.reduce((pre: number, cur: any) => cur[label] + pre, 0);
    return labelValue;
  })}/>
  return (
    <Table
      header={header}
      footer={footer}
      items={items}>
    </Table>
  );
}