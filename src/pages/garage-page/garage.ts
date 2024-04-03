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
    this.appendChildren([
      this.formCreate,
      this.formRename,
      this.page,
      this.section,
      this.pagination,
    ]);
  }

  public setParagraf(value: number, pages: number) {
    this.page.setContent(`Page # ${value} (${pages})`);
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
