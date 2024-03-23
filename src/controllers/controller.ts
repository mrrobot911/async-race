import BaseComponent from '../components/baseComponent';
import Header from '../components/header/header';
import Garage from '../pages/garage-page/garage';
import ApiService from '../service/api-service';

export default class Controller extends BaseComponent {
  private readonly appRoot: BaseComponent;

  private readonly header: Header;

  private readonly garage: Garage;

  private readonly service: ApiService;

  constructor() {
    super({ className: 'app' });
    this.service = new ApiService();
    this.appRoot = new BaseComponent({ className: 'page' });
    this.header = new Header('header', this.node);
    this.garage = new Garage('section', this.node, this.service);

    this.appRoot.append(this.header.getNode());
    this.appRoot.append(this.garage.getNode());

    this.appendChildren([this.appRoot]);
  }
}
