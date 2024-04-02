import { PageController } from '../interfaces/pageController';
import ApiCarService from '../service/api-car-service';
import GaragePage from '../pages/garage-page/garage';
import Car from '../components/car/car';
import { CarData } from '../interfaces/cars';
import CreateCarService from '../service/editeCar-service';
import CarController from './car-controller';

export default class GarageController implements PageController {
  private readonly view: GaragePage = new GaragePage(this.root, 'garage');

  private readonly service: ApiCarService = ApiCarService.getInstance();

  private readonly carService: CreateCarService =
    CreateCarService.getInstance();

  private toggleUpdateBtn: boolean = false;

  private carID: number = 0;

  private page: number = 1;

  private limit: number = 1;

  constructor(private readonly root: HTMLElement) {
    this.renderCar();
    this.addListenerToCreateForm();
    this.addListenerToEditeForm();
    this.view.getRenameForm().disabled(true);
    this.subscribe();
    this.addListenerOnPrevButton();
    this.addListenerOnNextButton();
  }

  subscribe() {
    this.carService.subscribeToChanges((value: number) => {
      if (this.carID === value) {
        this.toggleUpdateBtn = !this.toggleUpdateBtn;
        if (this.toggleUpdateBtn) {
          this.view.getRenameForm().disabled(true);
        } else {
          this.view.getRenameForm().disabled(false);
        }
      } else {
        this.view.getRenameForm().disabled(false);
        this.toggleUpdateBtn = false;
      }
      this.carID = value;
    });
  }

  renderCar() {
    this.view.getGarage().destroyChildren();
    this.service
      .manageCars({ method: 'GET', page: this.page, limit: 7 })
      .then((resp) => {
        this.limit = Number(resp.header.get('X-Total-Count'));
        this.toggleDisabledPagination();
        resp.response.forEach((car: CarData) => {
          const carEl = new CarController(this.view.getGarage(), car);
          this.carService.subscribeButton(
            carEl.getCar().getSelectCarButton(),
            carEl.getCar()
          );
        });
      });
  }

  addListenerToCreateForm() {
    this.view
      .getRegForm()
      .returnButtonElement()
      .addListener('click', () => {
        this.service
          .manageCars({
            method: 'POST',
            value: this.view.getRegForm().submit(),
          })
          .then(
            (resp) => new CarController(this.view.getGarage(), resp.response)
          );
      });
  }

  addListenerToEditeForm() {
    this.view
      .getRenameForm()
      .returnButtonElement()
      .addListener('click', () => {
        const { name, color } = this.view.getRenameForm().submit();
        const sendData: Partial<CarData> = { id: this.carID };
        if (name) sendData.name = name;
        if (color) sendData.color = color;
        this.service
          .manageCars({ method: 'PUT', value: sendData })
          .then((resp) => {
            this.view
              .getGarage()
              .getChildren()
              .forEach((car) => {
                if (car instanceof Car && car.getCarID() === this.carID) {
                  car.updateCarData(resp.response);
                }
              });
          });
      });
  }

  toggleDisabledPagination() {
    if (this.page === 1) {
      this.view.toggleDisabled('first');
    } else if (Math.ceil(this.limit / 7) === this.page) {
      this.view.toggleDisabled('last');
    } else if (Math.ceil(this.limit / 7) === 1) {
      this.view.toggleDisabled('all');
    } else {
      this.view.toggleDisabled('noone');
    }
  }

  addListenerOnPrevButton() {
    this.view.getPrevPage().addListener('click', () => {
      if (this.page !== 1) this.page -= 1;
      this.toggleDisabledPagination();
      this.renderCar();
    });
  }

  addListenerOnNextButton() {
    this.view.getNextPage().addListener('click', () => {
      if (this.page !== Math.ceil(this.limit / 7)) this.page += 1;
      this.toggleDisabledPagination();
      this.renderCar();
    });
  }

  createPage(): void {
    this.root.append(this.view.getNode());
  }

  public removePage(): void {
    this.view.remove();
  }
}
