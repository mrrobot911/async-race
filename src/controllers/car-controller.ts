import Car from '../components/car/car';
import { CarData } from '../interfaces/cars';
import ApiCarService from '../service/api-car-service';

export default class CarController {
  private readonly service: ApiCarService;

  private readonly car: Car;

  constructor(
    private readonly root: HTMLElement,
    private carData: CarData
  ) {
    this.car = new Car(this.carData);
    this.service = ApiCarService.getInstance();
    this.addListenerToRemoveBtn();
    this.addListenerToStartBtn();
    this.root.append(this.car.getNode());
  }

  getCar() {
    return this.car;
  }

  addListenerToRemoveBtn() {
    this.car.getDeleteCarButton().addListener('click', () => {
      this.service.manageCars('DELETE', { id: this.car.getCarID() });
      this.car.destroy();
    });
  }

  addListenerToStartBtn() {
    this.car.getStartCarButton().addListener('click', () => {
      console.log('1');
    });
  }
}
