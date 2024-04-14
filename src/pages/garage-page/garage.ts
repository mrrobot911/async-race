import BaseComponent from '../../components/baseComponent';
import CreateForm from '../../components/create-form/create-form';
import './garage.css';

type Trigger = 'first' | 'last' | 'all' | 'noone';

class GaragePage extends BaseComponent {
  private readonly formCreate: CreateForm = new CreateForm(
    this.node,
    'Create',
    'createFormElement'
  );

  private readonly formRename: CreateForm = new CreateForm(
    this.node,
    'Update',
    'renameFormElement'
  );

  private readonly section: BaseComponent<'section'> = new BaseComponent({
    tag: 'section',
  });

  private readonly pageControls: BaseComponent<'section'> = new BaseComponent({
    tag: 'section',
  });

  private readonly generateCar: BaseComponent<'button'> = new BaseComponent({
    tag: 'button',
    content: 'generate',
  });

  private readonly startRace: BaseComponent<'button'> = new BaseComponent({
    tag: 'button',
    content: 'start race',
  });

  private readonly stopRace: BaseComponent<'button'> = new BaseComponent({
    tag: 'button',
    content: 'stop race',
  });

  private readonly page: BaseComponent<'p'> = new BaseComponent({ tag: 'p' });

  private readonly prevPage: BaseComponent<'button'> = new BaseComponent({
    tag: 'button',
    content: 'Prev',
  });

  private readonly nextPage: BaseComponent<'button'> = new BaseComponent({
    tag: 'button',
    content: 'Next',
  });

  private readonly pagination: BaseComponent<'section'> = new BaseComponent({
    tag: 'section',
  });

  constructor(parent: HTMLElement, className: string) {
    super({ className, parent });
    this.page.addClass('page-title');
    this.pagination.appendChildren([this.prevPage, this.nextPage]);
    this.stopRace.setAttribute('disabled', 'true');
    this.pageControls.appendChildren([
      this.startRace,
      this.stopRace,
      this.generateCar,
    ]);
    this.appendChildren([
      this.formCreate,
      this.formRename,
      this.pageControls,
      this.page,
      this.section,
      this.pagination,
    ]);
    this.startButtonListener();
    this.stopButtonListener();
  }

  public setParagraf(value: number, pages: number) {
    this.page.setContent(`Page # ${value} (${pages})`);
  }

  public getStartRaceBtn() {
    return this.startRace;
  }

  public getStopRaceBtn() {
    return this.stopRace;
  }

  public getGenerateCarBtn() {
    return this.generateCar;
  }

  public getGarage() {
    return this.section;
  }

  public getRegForm() {
    return this.formCreate;
  }

  public getRenameForm() {
    return this.formRename;
  }

  public getPrevPage() {
    return this.prevPage;
  }

  public getNextPage() {
    return this.nextPage;
  }

  private startButtonListener() {
    this.startRace.addListener('click', () => {
      this.startRace.setAttribute('disabled', 'true');
      this.stopRace.removeAttribute('disabled');
    });
  }

  private stopButtonListener() {
    this.stopRace.addListener('click', () => {
      this.stopRace.setAttribute('disabled', 'true');
      this.startRace.removeAttribute('disabled');
    });
  }

  public toggleDisabled(trigger: Trigger) {
    if (trigger === 'first') {
      this.prevPage.setAttribute('disabled', 'true');
      this.nextPage.removeAttribute('disabled');
    }
    if (trigger === 'last') {
      this.nextPage.setAttribute('disabled', 'true');
      this.prevPage.removeAttribute('disabled');
    }
    if (trigger === 'noone') {
      this.prevPage.removeAttribute('disabled');
      this.nextPage.removeAttribute('disabled');
    }
    if (trigger === 'all') {
      this.prevPage.setAttribute('disabled', 'true');
      this.nextPage.setAttribute('disabled', 'true');
    }
  }
}

export default GaragePage;
