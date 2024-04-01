import BaseComponent from '../../components/baseComponent';
import TableRow from '../../components/table row/row';
import { WinnersData } from '../../interfaces/winners';
import './score.css';

export default class ScorePage extends BaseComponent {
  private readonly section: BaseComponent<'table'>;

  private readonly head: BaseComponent<'thead'>;

  private readonly headRow: BaseComponent<'tr'>;

  private readonly headId: BaseComponent<'th'>;

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
    this.headId = new BaseComponent({
      tag: 'th',
      content: 'id',
    });
    this.headRow.append(this.headId);
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

  createWinner(data: WinnersData): void {
    this.body.append(new TableRow(data));
  }
}
