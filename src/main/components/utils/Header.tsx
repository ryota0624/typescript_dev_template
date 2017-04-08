import * as React from 'react';

export class HeaderProperty {
  width: number;
  height: number;
  private constructor(props: {[P in keyof HeaderProperty]: HeaderProperty[P]}) {
    Object.assign(this, props)
  }

  static create(props: {[P in keyof HeaderProperty]: HeaderProperty[P]}): Readonly<HeaderProperty> {
    return new HeaderProperty(props);
  }
}

class HeaderItem {
  constructor(readonly label: string) {}
}
interface Props<T> {
  labels: { [P in keyof T]?: HeaderItem};
  headerAttributes?: any;
}

export abstract class Header<T> extends React.Component<Props<T>, {}> {
  render() {
    const labels = this.props.labels;
    const headerItems = Object.keys(labels)
      .filter(propertyKey => labels[propertyKey])
      .map((propertyKey) => <th key={`header-${propertyKey}`}>{(labels[propertyKey] as HeaderItem).label}</th>);
    return (
      <thead {...this.props.headerAttributes}>
        <tr>{headerItems}</tr>
      </thead>
    )
  }
}