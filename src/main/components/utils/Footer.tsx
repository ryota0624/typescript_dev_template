import * as React from 'react';

export class FooterAttribute {
  width: number;
  height: number;
  private constructor(props: {[P in keyof FooterAttribute]: FooterAttribute[P]}) {
    Object.assign(this, props)
  }

  static create(props: {[P in keyof FooterAttribute]: FooterAttribute[P]}): Readonly<FooterAttribute> {
    return new FooterAttribute(props);
  }
}

class FooterItem {
  constructor(readonly label: string) {}
}
interface Props<T> {
  labels: { [P in keyof T]?: FooterItem};
  footerAttributes?: any;
}

export abstract class Footer<T> extends React.Component<Props<T>, {}> {
  render() {
    const labels = this.props.labels;
    const FooterItems = Object.keys(labels)
      .filter(propertyKey => labels[propertyKey])
      .map((propertyKey) => <td key={`Footer-${propertyKey}`}>{(labels[propertyKey] as FooterItem).label}</td>);
    return (
      <tfoot {...this.props.footerAttributes}>
        <tr>{FooterItems}</tr>
      </tfoot>
    )
  }
}