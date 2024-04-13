import BaseComponent from '../components/baseComponent';
import Car from '../components/car/car';
import { CarData } from '../interfaces/cars';
import ApiRaceService from '../service/api-race-service';

export default class CarController {
  private readonly raceService: ApiRaceService = ApiRaceService.getInstance();

  private readonly car: Car;

  private timer = 0;

  private size = 0;

  private distance = 1;

  private interval = 0;

  constructor(
    private readonly root: BaseComponent<'section'>,
    private carData: CarData
  ) {
    this.car = new Car(this.carData);
    this.addListenerToStartBtn();
    this.addListenerToStopBtn();
    this.updateSize();
    window.addEventListener('resize', () => this.updateSize());
  }

  updateSize() {
    this.size = this.car.getNode().clientWidth;
    this.car.getCarFlag().setAttribute('style', `left: ${this.size - 250}px`);
    this.car
      .getCarImg()
      .setAttribute(
        'style',
        `left: ${this.distance * (this.size / this.interval)}px`
      );
  }

  getCarData() {
    return this.carData;
  }

  setCarData(data: CarData) {
    this.carData = data;
  }

  getCar() {
    return this.car;
  }

  addListenerToStartBtn() {
    this.car.getStartCarButton().addListener('click', () => {
      this.raceService
        .engineManager(this.carData.id, 'started')
        .then((resp) => {
          this.interval = resp.distance / resp.velocity;
          this.timer = setInterval(() => {
            this.distance += 1;
            this.car
              .getCarImg()
              .setAttribute(
                'style',
                `left: ${this.distance * (this.size / this.interval)}px`
              );
            if (this.distance * (this.size / this.interval) >= this.size - 100)
              clearInterval(this.timer);
          }, 1);
        });
      this.raceService
        .engineManager(this.carData.id, 'drive')
        .catch(() => clearInterval(this.timer));
    });
  }

  clearSittings() {
    clearInterval(this.timer);
    this.distance = 0;
    this.interval = 1;
  }

  addListenerToStopBtn() {
    this.car.getStopCarButton().addListener('click', () => {
      this.raceService.engineManager(this.carData.id, 'stopped').then(() => {
        this.clearSittings();
        this.car.getCarImg().removeAttribute('style');
      });
    });
  }

  renderCar() {
    this.root.append(this.car);
  }

  removeCar() {
    this.car.getNode().remove();
  }

  destroyCar() {
    this.car.destroy();
  }
}
