import { PageController } from '../interfaces/pageController';
import { WinnersData } from '../interfaces/winners';
import ScorePage from '../pages/score-page/score';
import ApiWinnerService from '../service/api-winner-service';

export default class ScoreController implements PageController {
  private readonly view: ScorePage = new ScorePage(this.root, 'score');

  private readonly service: ApiWinnerService = ApiWinnerService.getInstance();

  constructor(private readonly root: HTMLElement) {
    this.renderScore();
  }

  renderScore() {
    this.service.managWinners('GET').then((resp) => {
      resp.forEach((el: WinnersData) => {
        this.view.createWinner(el);
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
