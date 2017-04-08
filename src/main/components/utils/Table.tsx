import * as React from 'react';

export class TableItemAttribute {
  width: number;
  height: number;
  private constructor(props: {[P in keyof TableItemAttribute]: TableItemAttribute[P]}) {
    Object.assign(this, props)
  }

  static create(props: {[P in keyof TableItemAttribute]: TableItemAttribute[P]}): Readonly<TableItemAttribute> {
    return new TableItemAttribute(props);
  }
}

export interface Props {
  tableAttribute?: any;
}

export abstract class Table<T> extends React.Component<Props, {}>{
  render() {
    const { tableAttribute } = this.props;
    const [header, body, footer] = Array.from(this.props.children as any);
    return (
      <table {...this.props.tableAttribute}>
        {header}
        {body}
        {footer}
      </table>
    )
  }

  abstract getItem(data: T, index: number, properties: { [P in keyof T]?: TableItemAttribute }): JSX.Element
}