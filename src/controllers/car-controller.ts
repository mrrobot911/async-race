import BaseComponent from '../components/baseComponent';
import Car from '../components/car/car';
import { CarData } from '../interfaces/cars';
import ApiCarService from '../service/api-car-service';
import ApiRaceService from '../service/api-race-service';

export default class CarController {
  private readonly carService: ApiCarService = ApiCarService.getInstance();

  private readonly raceService: ApiRaceService = ApiRaceService.getInstance();

  private readonly car: Car;

  private timer: number = 0;

  private size: number = 0;

  constructor(
    private readonly root: BaseComponent<'section'>,
    private carData: CarData
  ) {
    this.car = new Car(this.carData);
    this.addListenerToRemoveBtn();
    this.addListenerToStartBtn();
    this.addListenerToStopBtn();
    this.root.append(this.car);
    this.updateSize();
    window.addEventListener('resize', () => this.updateSize());
  }

  updateSize() {
    this.size = this.car.getNode().clientWidth;
    this.car.getCarFlag().setAttribute('style', `left: ${this.size - 250}px`);
  }

  getCar() {
    return this.car;
  }

  addListenerToRemoveBtn() {
    this.car.getDeleteCarButton().addListener('click', () => {
      this.carService.manageCars('DELETE', { id: this.car.getCarID() });
      this.car.destroy();
    });
  }

  addListenerToStartBtn() {
    this.car.getStartCarButton().addListener('click', () => {
      this.raceService
        .engineManager(this.car.getCarID(), 'started')
        .then((resp) => {
          const interval = resp.distance / resp.velocity;
          let distance = this.car.getNode().clientWidth / interval;
          this.timer = setInterval(() => {
            distance += this.size / interval;
            this.car.getCarImg().setAttribute('style', `left: ${distance}px`);
            if (distance >= this.size - 100) clearInterval(this.timer);
          }, 1);
        });
      this.raceService
        .engineManager(this.car.getCarID(), 'drive')
        .catch(() => clearInterval(this.timer));
    });
  }

  addListenerToStopBtn() {
    this.car.getStopCarButton().addListener('click', () => {
      this.raceService
        .engineManager(this.car.getCarID(), 'stopped')
        .then(() => {
          clearInterval(this.timer);
          this.car.getCarImg().removeAttribute('style');
        });
    });
  }
}
