import { WinnersData } from '../../interfaces/winners';
import BaseComponent from '../baseComponent';

export default class TableRow extends BaseComponent<'tr'> {
  constructor(data: WinnersData) {
    super({
      tag: 'tr',
    });
    this.appendChildren([
      new BaseComponent({
        tag: 'td',
        content: `${data.id}`,
      }),
      new BaseComponent({
        tag: 'td',
        content: `${data.wins}`,
      }),
      new BaseComponent({
        tag: 'td',
        content: `${data.time}`,
      }),
    ]);
  }
}
