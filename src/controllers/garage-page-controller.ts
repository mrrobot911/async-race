import { PageController } from '../interfaces/pageController';
import ApiService from '../service/api-service';
import GaragePage from '../pages/garage-page/garage';
import Car from '../components/car/car';
import { CarData } from '../interfaces/cars';
import CreateCarService from '../service/createCar-service';

export default class GarageController implements PageController {
  private readonly view: GaragePage = new GaragePage(this.root, 'garage');

  private readonly service: ApiService;

  private readonly carService: CreateCarService;

  private toggleUpdateBtn: boolean = false;

  private carID: number = 0;

  constructor(private readonly root: HTMLElement) {
    this.service = ApiService.getInstance();
    this.view.getChildren();
    this.renderCar();
    this.addListenerToCreateForm();
    this.addListenerToEditeForm();
    this.carService = CreateCarService.getInstance();
    this.view.getRenameForm().disabled(true);
    this.subscribe();
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
    this.service.manageCars('GET').then((resp) => {
      resp.forEach((car: CarData) => {
        const carEl = new Car(car);
        this.carService.subscribeButton(
          carEl.getUpdateCarButton(),
          carEl.getCarID()
        );
        this.view.getGarage().append(carEl);
      });
    });
  }

  addListenerToCreateForm() {
    this.view.getRegForm().addListener('click', (event?: Event) => {
      const target = event?.target as HTMLInputElement;
      if (target.type === 'button') {
        this.service
          .manageCars('POST', this.view.getRegForm().submit())
          .then((resp) => this.view.getGarage().append(new Car(resp)));
      }
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
        this.service.manageCars('PUT', sendData).then((resp) =>
          this.view
            .getGarage()
            .getChildren()
            .forEach((car) => {
              if (car instanceof Car && car.getCarID() === this.carID) {
                car.updateCarData(resp);
              }
            })
        );
      });
  }

  createPage(): void {
    this.root.append(this.view.getNode());
  }

  public destroyPage(): void {
    this.view.destroy();
  }
}
