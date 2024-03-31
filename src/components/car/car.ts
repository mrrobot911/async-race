import createSvg from '../../helpers/createCarSvg';
import { CarData } from '../../interfaces/cars';
import BaseComponent from '../baseComponent';
import Button from '../button/button';
import './car.css';

export default class Car extends BaseComponent<'div'> {
  private readonly startRace: Button;

  private readonly stopRace: Button;

  private readonly controlsContainer: BaseComponent<'div'>;

  private readonly raceControlsContainer: BaseComponent<'div'>;

  private readonly createCar: Button;

  private readonly removeCar: Button;

  private readonly carName: BaseComponent<'p'>;

  private id: number;

  private img: BaseComponent<'object'>;

  constructor(car: CarData) {
    super({ tag: 'div', className: 'car-element' });
    this.controlsContainer = new BaseComponent({
      parent: this,
      className: 'car-control',
    });
    this.raceControlsContainer = new BaseComponent({
      parent: this,
      className: 'car-manager',
    });
    this.createCar = new Button('Select');
    this.removeCar = new Button('Remove');
    this.carName = new BaseComponent({
      parent: this,
      content: car.name,
      className: 'car-name',
      tag: 'p',
    });
    this.id = car.id;
    this.startRace = new Button('Start');
    this.stopRace = new Button('Stop');
    this.stopRace.setAttribute('disabled', 'true');
    this.append(this.raceControlsContainer.getNode());
    this.img = new BaseComponent({ parent: this, tag: 'object' });
    this.img.setInnerHTML(createSvg(car.color));
    this.append(this.img);
    this.raceControlsContainer.append(this.createCar.getNode());
    this.raceControlsContainer.append(this.removeCar.getNode());
    this.raceControlsContainer.append(this.carName.getNode());
    this.append(this.controlsContainer.getNode());
    this.controlsContainer.append(this.startRace.getNode());
    this.controlsContainer.append(this.stopRace.getNode());
    this.startButtonListener();
    this.stopButtonListener();
  }

  getCarID() {
    return this.id;
  }

  updateCarData(car: Partial<CarData>) {
    if (car.id) this.id = car.id;
    if (car.name) this.carName.setContent(car.name);
    if (car.color) this.img.setInnerHTML(createSvg(car.color));
  }

  getSelectCarButton() {
    return this.createCar;
  }

  getDeleteCarButton() {
    return this.removeCar;
  }

  getStartCarButton() {
    return this.startRace;
  }

  getStopCarButton() {
    return this.stopRace;
  }

  startButtonListener() {
    this.startRace.addListener('click', () => {
      this.startRace.setAttribute('disabled', 'true');
      this.stopRace.removeAttribute('disabled');
    });
  }

  stopButtonListener() {
    this.stopRace.addListener('click', () => {
      this.stopRace.setAttribute('disabled', 'true');
      this.startRace.removeAttribute('disabled');
    });
  }
}
