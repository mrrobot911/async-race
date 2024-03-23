import BaseComponent from '../baseComponent';
import Link from '../link/link';

export default class Header extends BaseComponent<'header'> {
  private readonly garageLink: Link;

  private readonly scoreLink: Link;

  constructor(className: string, parent: HTMLElement) {
    super({ tag: 'header', className, parent });
    this.garageLink = new Link('Garage', '#garage');
    this.scoreLink = new Link('Score', '#score');
    this.appendChildren([this.garageLink, this.scoreLink]);
  }
}
