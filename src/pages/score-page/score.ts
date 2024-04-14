import BaseComponent from '../../components/baseComponent';
import TableRow from '../../components/table row/row';
import { CarData } from '../../interfaces/cars';
import { WinnersData } from '../../interfaces/winners';
import './score.css';

export default class ScorePage extends BaseComponent {
  private readonly section: BaseComponent<'table'>;

  private readonly head: BaseComponent<'thead'>;

  private readonly headRow: BaseComponent<'tr'>;

  private readonly headName: BaseComponent<'th'>;

  private readonly headCar: BaseComponent<'th'>;

  private readonly headWins: BaseComponent<'th'>;

  private readonly headTime: BaseComponent<'th'>;

  private readonly body: BaseComponent<'tbody'>;

  constructor(parent: HTMLElement, className: string) {
    super({ className, parent });
    this.section = new BaseComponent({ tag: 'table', parent: this });
    this.head = new BaseComponent({
      tag: 'thead',
      parent: this.section.getNode(),
    });
    this.headRow = new BaseComponent({
      tag: 'tr',
      parent: this.head.getNode(),
    });
    this.headName = new BaseComponent({
      tag: 'th',
      content: 'name',
    });
    this.headRow.append(this.headName);
    this.headCar = new BaseComponent({
      tag: 'th',
      content: 'car',
    });
    this.headRow.append(this.headCar);
    this.headWins = new BaseComponent({
      tag: 'th',
      content: 'wins',
    });
    this.headRow.append(this.headWins);
    this.headTime = new BaseComponent({
      tag: 'th',
      content: 'time',
    });
    this.headRow.append(this.headTime);
    this.body = new BaseComponent({
      tag: 'tbody',
      parent: this.section.getNode(),
    });
  }

  getRows() {
    return this.body;
  }

  createWinner(data: WinnersData, car: CarData): void {
    this.body.append(new TableRow(data, car));
  }
}
