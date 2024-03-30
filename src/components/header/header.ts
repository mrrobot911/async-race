import BaseComponent from '../baseComponent';
import Button from '../button/button';

export default class Header extends BaseComponent<'header'> {
  private readonly garageLink: Button;

  private readonly scoreLink: Button;

  constructor(className: string, parent: HTMLElement) {
    super({ tag: 'header', className, parent });
    this.garageLink = new Button('Garage');
    this.scoreLink = new Button('Score');
    this.appendChildren([this.garageLink, this.scoreLink]);
  }
}
