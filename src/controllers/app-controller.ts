import BaseComponent from '../components/baseComponent';
import Header from '../components/header/header';
import ApiCarService from '../service/api-car-service';
import Garage from './garage-page-controller';

export default class Controller extends BaseComponent {
  private readonly appRoot: BaseComponent;

  private readonly header: Header;

  private readonly garage: Garage;

  private readonly service: ApiCarService;

  constructor() {
    super({ className: 'app' });
    this.service = ApiCarService.getInstance();
    this.appRoot = new BaseComponent({ className: 'page' });
    this.header = new Header('header', this.node);
    this.garage = new Garage(this.appRoot.getNode());

    this.garage.createPage();
    this.append(this.header.getNode());

    this.appendChildren([this.appRoot]);
  }
}
