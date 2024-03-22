import { PageController } from '../../interfaces/pageController';
import Garage from './garage';

export default class GaragePage implements PageController {
  private readonly root: HTMLElement;

  private readonly view: Garage;

  constructor(root: HTMLElement) {
    this.root = root;
    this.view = new Garage({
      className: 'garage',
      parent: this.root,
    });
  }

  public createPage(): void {
    this.root.append(this.view.getNode());
  }

  public destroyPage(): void {
    this.view.destroy();
  }
}
