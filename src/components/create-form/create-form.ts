import BaseComponent from '../baseComponent';
import Input from '../input/input';

export default class CreateForm extends BaseComponent<'form'> {
  private readonly carName: Input;

  private readonly carColor: Input;

  private readonly submitCar: Input;

  constructor(parent: HTMLElement, name: string, className: string) {
    super({ parent, className: 'create-car', tag: 'form' });
    this.carName = new Input('text');
    this.carColor = new Input('color');
    this.submitCar = new Input('button', name);
    this.addClass(className);
    this.appendChildren([this.carName, this.carColor, this.submitCar]);
  }

  returnButtonElement() {
    return this.submitCar;
  }

  submit() {
    return { name: this.carName.getValue(), color: this.carColor.getValue() };
  }
}
