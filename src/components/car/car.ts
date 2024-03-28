import { CarData } from '../../interfaces/cars';
import BaseComponent from '../baseComponent';
import Button from '../button/button';

export default class Car extends BaseComponent<'div'> {
  private readonly startRace: Button;

  private readonly stopRace: Button;

  private readonly controlsContainer: BaseComponent<'div'>;

  private readonly raceControlsContainer: BaseComponent<'div'>;

  private readonly createCar: Button;

  private readonly updateCar: Button;

  private readonly carName: BaseComponent<'p'>;

  private id: number;

  constructor(car: CarData) {
    super({ tag: 'div' });
    this.controlsContainer = new BaseComponent({ parent: this });
    this.raceControlsContainer = new BaseComponent({ parent: this });
    this.createCar = new Button('Select');
    this.updateCar = new Button('Remove');
    this.carName = new BaseComponent({
      parent: this,
      content: car.name,
      tag: 'p',
    });
    this.id = car.id;
    this.startRace = new Button('Start');
    this.stopRace = new Button('Stop');
    this.append(this.raceControlsContainer.getNode());
    this.raceControlsContainer.append(this.createCar.getNode());
    this.raceControlsContainer.append(this.updateCar.getNode());
    this.raceControlsContainer.append(this.carName.getNode());
    this.append(this.controlsContainer.getNode());
    this.controlsContainer.append(this.startRace.getNode());
    this.controlsContainer.append(this.stopRace.getNode());
  }

  getCarID() {
    return this.id;
  }

  updateCarData(car: CarData) {
    this.id = car.id;
    this.carName.setContent(car.name);
  }

  getUpdateCarButton() {
    return this.createCar;
  }
}
