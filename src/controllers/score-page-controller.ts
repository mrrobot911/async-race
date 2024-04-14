import { CarData } from '../interfaces/cars';
import { PageController } from '../interfaces/pageController';
import { WinnersData } from '../interfaces/winners';
import ScorePage from '../pages/score-page/score';
import ApiCarService from '../service/api-car-service';
import ApiWinnerService from '../service/api-winner-service';

export default class ScoreController implements PageController {
  private readonly view: ScorePage = new ScorePage(this.root, 'score');

  private readonly service: ApiWinnerService = ApiWinnerService.getInstance();

  private readonly carService: ApiCarService = ApiCarService.getInstance();

  private page = 0;

  private limitPerPage = 10;

  private carData: CarData[] = [];

  private winnersData: WinnersData[] = [];

  constructor(private readonly root: HTMLElement) {}

  private fetchCars() {
    return this.carService.manageCars({ method: 'GET' }).then((resp) => {
      this.carData = resp.response;
    });
  }

  private fetchScore() {
    return this.service.managWinners('GET').then((resp) => {
      this.winnersData = resp;
    });
  }

  renderScore() {
    this.winnersData
      .slice(
        this.page * this.limitPerPage,
        this.page * this.limitPerPage + this.limitPerPage
      )
      .forEach((el) => {
        const data = this.carData.find((car) => car.id === el.id);
        if (data) this.view.createWinner(el, data);
      });
  }

  public createPage(): void {
    Promise.all([this.fetchScore(), this.fetchCars()]).then(() => {
      this.renderScore();
      this.root.append(this.view.getNode());
    });
  }

  public removePage(): void {
    this.view.getRows().destroyChildren();
    this.view.remove();
  }
}
