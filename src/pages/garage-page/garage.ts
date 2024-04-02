import BaseComponent from '../../components/baseComponent';
import CreateForm from '../../components/create-form/create-form';

type Trigger = 'first' | 'last' | 'all' | 'noone';

class GaragePage extends BaseComponent {
  private readonly formCreate: CreateForm;

  private readonly formRename: CreateForm;

  private readonly section: BaseComponent<'section'>;

  private readonly prevPage: BaseComponent<'button'>;

  private readonly nextPage: BaseComponent<'button'>;

  private readonly pagination: BaseComponent<'section'>;

  constructor(parent: HTMLElement, className: string) {
    super({ className, parent });
    this.formCreate = new CreateForm(this.node, 'Create', 'createFormElement');
    this.formRename = new CreateForm(this.node, 'Update', 'renameFormElement');
    this.section = new BaseComponent({ tag: 'section' });
    this.append(this.formCreate.getNode());
    this.append(this.formRename.getNode());
    this.append(this.section);
    this.pagination = new BaseComponent({ tag: 'section' });
    this.prevPage = new BaseComponent({ tag: 'button', content: 'Prev' });
    this.nextPage = new BaseComponent({ tag: 'button', content: 'Next' });
    this.pagination.appendChildren([this.prevPage, this.nextPage]);
    this.append(this.pagination);
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
