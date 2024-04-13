import { PageController } from '../interfaces/pageController';
import ApiCarService from '../service/api-car-service';
import GaragePage from '../pages/garage-page/garage';
import { CarData } from '../interfaces/cars';
import CreateCarService from '../service/editeCar-service';
import CarController from './car-controller';

export default class GarageController implements PageController {
  private readonly view: GaragePage = new GaragePage(this.root, 'garage');

  private readonly service: ApiCarService = ApiCarService.getInstance();

  private readonly carService: CreateCarService =
    CreateCarService.getInstance();

  private carControllers: CarController[] = [];

  private toggleUpdateBtn: boolean = false;

  private carID = 0;

  private page = 1;

  private limit = 1;

  private limitPerPage = 7;

  constructor(private readonly root: HTMLElement) {
    this.renderCar();
    this.addListenerToRegForm();
    this.addListenerToEditeForm();
    this.view.getRenameForm().disabled(true);
    this.subscribe();
    this.addListenerOnPrevButton();
    this.addListenerOnNextButton();
  }

  subscribe() {
    this.carService.subscribeToChanges((data: CarData) => {
      if (this.carID === data.id) {
        this.toggleUpdateBtn = !this.toggleUpdateBtn;
        if (this.toggleUpdateBtn) {
          this.view.getRenameForm().disabled(true);
        } else {
          this.view.getRenameForm().disabled(false, data);
        }
      } else {
        this.view.getRenameForm().disabled(false, data);
        this.toggleUpdateBtn = false;
      }
      this.carID = data.id;
    });
  }

  renderCar() {
    this.view.getGarage().destroyChildren();
    this.carControllers = [];
    this.service.manageCars({ method: 'GET' }).then((resp) => {
      resp.response.forEach((car: CarData) => {
        this.CreateCar(car);
      });
      this.limit = this.carControllers.length;
      this.toggleDisabledPagination();
      this.render();
    });
  }

  render() {
    const startIndex = (this.page - 1) * this.limitPerPage;
    const endIndex = Math.min(
      startIndex + this.limitPerPage,
      this.carControllers.length
    );
    this.view.setParagraf(this.page, Math.ceil(this.limit / this.limitPerPage));
    this.toggleDisabledPagination();
    this.carControllers.forEach((car) => car.removeCar());
    this.carControllers
      .slice(startIndex, endIndex)
      .forEach((car) => car.renderCar());
  }

  addListenerToRegForm() {
    this.view
      .getRegForm()
      .returnButtonElement()
      .addListener('click', () => {
        this.service
          .manageCars({
            method: 'POST',
            value: this.view.getRegForm().submit(),
          })
          .then((resp) => {
            this.limit += 1;
            this.view.getRegForm().cleareForm();
            this.CreateCar(resp.response);
            this.render();
          });
      });
  }

  addListenerToEditeForm() {
    this.view
      .getRenameForm()
      .returnButtonElement()
      .addListener('click', () => {
        const { name, color } = this.view.getRenameForm().submit();
        this.view.getRenameForm().disabled(true);
        this.toggleUpdateBtn = true;
        const sendData: Partial<CarData> = { id: this.carID };
        if (name) sendData.name = name;
        if (color) sendData.color = color;
        this.service
          .manageCars({ method: 'PUT', value: sendData })
          .then((resp) => {
            this.carControllers.forEach((car) => {
              if (car.getCarData().id === this.carID) {
                car.getCar().updateCarData(resp.response);
                car.setCarData(resp.response);
              }
            });
          });
      });
  }

  toggleDisabledPagination() {
    if (this.page === 1) {
      if (Math.ceil(this.limit / this.limitPerPage) === 1) {
        this.view.toggleDisabled('all');
      } else {
        this.view.toggleDisabled('first');
      }
    } else if (Math.ceil(this.limit / this.limitPerPage) === this.page) {
      this.view.toggleDisabled('last');
    } else {
      this.view.toggleDisabled('noone');
    }
  }

  addListenerOnPrevButton() {
    this.view.getPrevPage().addListener('click', () => {
      if (this.page !== 1) this.page -= 1;
      this.toggleDisabledPagination();
      this.render();
    });
  }

  addListenerOnNextButton() {
    this.view.getNextPage().addListener('click', () => {
      if (this.page !== Math.ceil(this.limit / this.limitPerPage))
        this.page += 1;
      this.toggleDisabledPagination();
      this.render();
    });
  }

  CreateCar(car: CarData) {
    const carEl = new CarController(this.view.getGarage(), car);
    this.carControllers.push(carEl);
    carEl
      .getCar()
      .getDeleteCarButton()
      .addListener('click', () => {
        this.service.manageCars({
          method: 'DELETE',
          value: { id: carEl.getCarData().id },
        });
        this.carControllers = this.carControllers.filter(
          (el) => el.getCarData().id !== carEl.getCarData().id
        );
        carEl.removeCar();
        this.limit -= 1;
        this.page = Math.ceil(this.limit / this.limitPerPage);
        this.render();
      });
    this.carService.subscribeButton(carEl.getCar().getSelectCarButton(), carEl);
  }

  createPage(): void {
    this.root.append(this.view.getNode());
  }

  public removePage(): void {
    this.view.remove();
  }
}
