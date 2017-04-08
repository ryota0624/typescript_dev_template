import * as React from 'react';

export class ItemAttribute {
  html?: {
    width?: number;
    height?: number;
  }
  wrap?: (value: string) => JSX.Element;
  private constructor(props: {[P in keyof ItemAttribute]: ItemAttribute[P]}) {
    Object.assign(this, props)
  }

  static create(props: {[P in keyof ItemAttribute]: ItemAttribute[P]}): Readonly<ItemAttribute> {
    return new ItemAttribute(props);
  }
}

export interface Props<T> {
  datas: T[];
  BodyAttribute?: any;
  header?: JSX.Element;
  footer?: JSX.Element;
  itemAttributes: { [P in keyof T]?: ItemAttribute };
}

export abstract class Body<T> extends React.Component<Props<T>, {}>{
  render() {
    const { header, footer, datas, itemAttributes } = this.props;
    const items = datas.map((data, index) => {
      return this.getItem(data, index, itemAttributes);
    })
    return (
        <tbody>
          {items}
        </tbody>
    )
  }

  abstract getItem(data: T, index: number, properties: { [P in keyof T]?: ItemAttribute }): JSX.Element
}