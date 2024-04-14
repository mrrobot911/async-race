import BaseComponent from '../../components/baseComponent';
import TableRow from '../../components/table row/row';
import Pagination from '../../helpers/pagination';
import { CarData } from '../../interfaces/cars';
import { WinnersData } from '../../interfaces/winners';
import './score.css';

export default class ScorePage extends Pagination {
  private readonly section: BaseComponent<'table'>;

  private readonly head: BaseComponent<'thead'>;

  private readonly headRow: BaseComponent<'tr'>;

  private readonly headName: BaseComponent<'th'> = new BaseComponent({
    tag: 'th',
    content: 'name',
  });

  private readonly headCar: BaseComponent<'th'> = new BaseComponent({
    tag: 'th',
    content: 'car',
  });

  private readonly headWins: BaseComponent<'th'> = new BaseComponent({
    tag: 'th',
    content: 'wins',
  });

  private readonly headTime: BaseComponent<'th'> = new BaseComponent({
    tag: 'th',
    content: 'time',
  });

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
    this.headRow.appendChildren([
      this.headName,
      this.headCar,
      this.headWins,
      this.headTime,
    ]);
    this.body = new BaseComponent({
      tag: 'tbody',
      parent: this.section.getNode(),
    });
    this.getPagination().appendChildren([
      this.getPrevPage(),
      this.getNextPage(),
    ]);
    this.append(this.getPagination());
  }

  getRows() {
    return this.body;
  }

  createWinner(data: WinnersData, car: CarData): void {
    this.body.append(new TableRow(data, car));
  }
}
