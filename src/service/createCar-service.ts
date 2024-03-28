import Button from '../components/button/button';
import EventObserver from '../helpers/observer';

export default class CreateCarService {
  private static instance: CreateCarService;

  private readonly createCarObserver;

  private activeButtonId: number;

  constructor() {
    this.createCarObserver = new EventObserver<number>();
    this.activeButtonId = 0;
  }

  public static getInstance(): CreateCarService {
    if (!CreateCarService.instance) {
      CreateCarService.instance = new CreateCarService();
    }

    return CreateCarService.instance;
  }

  subscribeButton(button: Button, id: number): void {
    button.addListener('click', () => {
      this.activeButtonId = id;
      this.createCarObserver.notify(this.activeButtonId);
    });
  }

  public subscribeToChanges(callback: (newValue: number) => void): void {
    this.createCarObserver.subscribe(callback);
  }
}
