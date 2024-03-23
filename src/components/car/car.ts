import { CarData } from '../../interfaces/cars';
import BaseComponent from '../baseComponent';
import Button from '../button/button';

export default class Car extends BaseComponent<'div'> {
  private readonly startRace: Button;

  private readonly stopRace: Button;

  private readonly controlsContainer: BaseComponent<'div'>;

  private readonly createCar: Button;

  private readonly updateCar: Button;

  private readonly carName: BaseComponent<'p'>;

  constructor(car: CarData) {
    super({ tag: 'div' });
    this.controlsContainer = new BaseComponent({ parent: this });
    this.createCar = new Button('Create');
    this.updateCar = new Button('Update');
    this.carName = new BaseComponent({
      parent: this,
      content: car.name,
      tag: 'p',
    });
    this.startRace = new Button('Start');
    this.stopRace = new Button('Stop');
    this.append(this.controlsContainer.getNode());
    this.controlsContainer.append(this.carName.getNode());
    this.controlsContainer.append(this.startRace.getNode());
    this.controlsContainer.append(this.stopRace.getNode());
  }
}
