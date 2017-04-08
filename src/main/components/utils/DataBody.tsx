import * as React from 'react';
import { Props as BodyProps, Body, ItemAttribute } from './Body';

export abstract class DataBody<T extends { [key: string]: any, id: string }> extends Body<T> {
  abstract onClickData(property: string, data: T): void;
  getItem(data: T, index: number, attributes:  { [P in keyof T]?: ItemAttribute }) {
    const items = Object.keys(data)
      .map(propertyKey => {
        const attribute = attributes[propertyKey];
        if (attribute == undefined) {
          return null;
        }
        const value = attribute.wrap !== undefined ? attribute.wrap(data[propertyKey]) : data[propertyKey];
        return (
          <td key={`${data.id}-${propertyKey}`} {...attribute.html} onClick={(event) => {
            this.onClickData(propertyKey, data);
          }}>
            {value}
          </td>
        )
      })
    return (
      <tr key={data.id}>
        {items}
      </tr>
    )
  }
}