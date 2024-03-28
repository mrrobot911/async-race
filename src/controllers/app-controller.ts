import BaseComponent from '../components/baseComponent';
import Header from '../components/header/header';
import ApiService from '../service/api-service';
import Garage from './garage-page-controller';

export default class Controller extends BaseComponent {
  private readonly appRoot: BaseComponent;

  private readonly header: Header;

  private readonly garage: Garage;

  private readonly service: ApiService;

  constructor() {
    super({ className: 'app' });
    this.service = ApiService.getInstance();
    this.appRoot = new BaseComponent({ className: 'page' });
    this.header = new Header('header', this.node);
    this.garage = new Garage(this.appRoot.getNode());

    this.garage.createPage();
    this.append(this.header.getNode());

    this.appendChildren([this.appRoot]);
  }
}
