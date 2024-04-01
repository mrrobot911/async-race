import Button from '../components/button/button';
import Car from '../components/car/car';
import EventObserver from '../helpers/observer';

export default class CreateCarService {
  private static instance: CreateCarService;

  private readonly createCarObserver;

  private activeButtonId: number = 0;

  constructor() {
    this.createCarObserver = new EventObserver<number>();
  }

  public static getInstance(): CreateCarService {
    if (!CreateCarService.instance) {
      CreateCarService.instance = new CreateCarService();
    }

    return CreateCarService.instance;
  }

  subscribeButton(button: Button, root: Car): void {
    button.addListener('click', () => {
      this.activeButtonId = root.getCarID();

      this.createCarObserver.notify(this.activeButtonId);
    });
  }

  public subscribeToChanges(callback: (newValue: number) => void): void {
    this.createCarObserver.subscribe(callback);
  }
}
