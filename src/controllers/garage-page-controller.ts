import { PageController } from '../interfaces/pageController';
import ApiService from '../service/api-service';
import GaragePage from '../pages/garage-page/garage';
import Car from '../components/car/car';
import { CarData } from '../interfaces/cars';
import CreateCarService from '../service/createCar-service';

export default class GarageController implements PageController {
  private readonly view: GaragePage;

  private readonly service: ApiService;

  private readonly carService: CreateCarService;

  private toggleUpdateBtn: boolean;

  private carID: number;

  constructor(private readonly root: HTMLElement) {
    this.root = root;
    this.view = new GaragePage(this.root, 'garage');
    this.service = ApiService.getInstance();
    this.view.getChildren();
    this.renderData();
    this.carService = CreateCarService.getInstance();
    this.toggleUpdateBtn = false;
    this.carID = 0;
    this.view
      .getRenameForm()
      .returnButtonElement()
      .setAttribute('disabled', 'true');
    this.subscribe();
  }

  subscribe() {
    this.carService.subscribeToChanges((value: number) => {
      if (this.carID === value) {
        this.toggleUpdateBtn = !this.toggleUpdateBtn;
        if (this.toggleUpdateBtn) {
          this.view
            .getRenameForm()
            .returnButtonElement()
            .setAttribute('disabled', 'true');
        } else {
          this.view
            .getRenameForm()
            .returnButtonElement()
            .removeAttribute('disabled');
        }
      } else {
        this.view
          .getRenameForm()
          .returnButtonElement()
          .removeAttribute('disabled');
      }
      this.carID = value;
    });
  }

  renderData() {
    this.service.getCars().then((resp) => {
      resp.forEach((car: CarData) => {
        const carEl = new Car(car);
        this.carService.subscribeButton(
          carEl.getUpdateCarButton(),
          carEl.getCarID()
        );
        this.view.getGarage().append(carEl);
      });
    });
    this.view.getRegForm().addListener('click', (event?: Event) => {
      const target = event?.target as HTMLInputElement;
      if (target.type === 'button') {
        this.service
          .createCar(this.view.getRegForm().submit())
          .then((resp) => this.view.getGarage().append(new Car(resp)));
      }
    });
    this.view
      .getRenameForm()
      .returnButtonElement()
      .addListener('click', () => {
        // const { name, color } = this.view.getRegForm().submit();
        // this.service.updateCar({ id: this.carID, name, color });
        console.log(this.carID);
      });
  }

  createPage(): void {
    this.root.append(this.view.getNode());
  }

  public destroyPage(): void {
    this.view.destroy();
  }
}
