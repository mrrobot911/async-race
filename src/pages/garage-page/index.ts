import { PageController } from '../../interfaces/pageController';
import ApiService from '../../service/api-service';
import GaragePage from './garage';

export default class Garage implements PageController {
  private readonly root: HTMLElement;

  private readonly view: GaragePage;

  constructor(root: HTMLElement, service: ApiService) {
    this.root = root;
    this.view = new GaragePage('garage', this.root, service);
  }

  public createPage(): void {
    this.root.append(this.view.getNode());
  }

  public destroyPage(): void {
    this.view.destroy();
  }
}
