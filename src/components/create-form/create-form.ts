import { CarData } from '../../interfaces/cars';
import BaseComponent from '../baseComponent';
import Input from '../input/input';

export default class CreateForm extends BaseComponent<'form'> {
  private readonly carName: Input = new Input('text');

  private readonly carColor: Input = new Input('color');

  private readonly submitCar: Input;

  constructor(parent: HTMLElement, name: string, className: string) {
    super({ parent, className: 'create-car', tag: 'form' });
    this.submitCar = new Input('button', name);
    this.addClass(className);
    this.appendChildren([this.carName, this.carColor, this.submitCar]);
  }

  returnButtonElement() {
    return this.submitCar;
  }

  disabled(flag: boolean, data?: Partial<CarData>) {
    if (flag) {
      this.carName.setAttribute('disabled', 'true');
      this.carColor.setAttribute('disabled', 'true');
      this.submitCar.setAttribute('disabled', 'true');
    } else {
      this.carName.getNode().value = data?.name || '';
      this.carName.removeAttribute('disabled');
      this.carColor.getNode().value = data?.color || '';
      this.carColor.removeAttribute('disabled');
      this.submitCar.removeAttribute('disabled');
    }
  }

  submit() {
    const name = this.carName.getValue();
    const color = this.carColor.getValue();
    this.carName.getNode().value = '';
    this.carColor.getNode().value = '';
    return { name, color };
  }
}
