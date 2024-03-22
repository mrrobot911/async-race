import BaseComponent from '../components/baseComponent';
import CreateForm from '../components/create-form/create-form';
import Header from '../components/header/header';

export default class Controller extends BaseComponent {
  private readonly appRoot: BaseComponent;

  private readonly header: Header;

  private readonly form: CreateForm;

  constructor() {
    super({ className: 'app' });
    this.appRoot = new BaseComponent({ className: 'page' });
    this.header = new Header({
      className: 'header',
      parent: this.node,
    });
    this.form = new CreateForm({
      className: 'create-form',
      parent: this.node,
    });
    this.appendChildren([this.appRoot]);
    this.appRoot.append(this.header.getNode());
    this.appRoot.append(this.form.getNode());
  }
}
