import BaseComponent from '../baseComponent';
import Input from '../input/input';

export default class CreateForm extends BaseComponent<'form'> {
  private readonly carName: Input;

  private readonly carColor: Input;

  private readonly submitNewCar: Input;

  constructor(parent: HTMLElement, name: string, isDisabled = false) {
    super({ parent, className: 'create-car', tag: 'form' });
    this.carName = new Input('text', isDisabled);
    this.carColor = new Input('color');
    this.submitNewCar = new Input('button', isDisabled, name);
    this.appendChildren([this.carName, this.carColor, this.submitNewCar]);
  }

  toggleDisabled(value: boolean) {
    this.submitNewCar.toggleDisabled(value);
  }
}
