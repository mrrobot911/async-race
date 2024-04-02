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

  private carData: CarData[] = [];

  constructor(private readonly root: HTMLElement) {
    this.renderScore();
  }

  renderScore() {
    this.carService
      .manageCars({ method: 'GET' })
      .then((resp) => {
        this.carData = resp.response;
      })
      .then(() => {
        this.service.managWinners('GET').then((resp) => {
          resp.forEach((el: WinnersData) => {
            this.view.createWinner(
              el,
              this.carData.filter((car) => car.id === el.id)[0]
            );
          });
        });
      });
  }

  createPage(): void {
    this.root.append(this.view.getNode());
  }

  public removePage(): void {
    this.view.remove();
  }
}
