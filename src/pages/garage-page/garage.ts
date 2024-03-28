import BaseComponent from '../../components/baseComponent';
import CreateForm from '../../components/create-form/create-form';

class GaragePage extends BaseComponent {
  private readonly formCreate: CreateForm;

  private readonly formRename: CreateForm;

  private readonly section: BaseComponent<'section'>;

  constructor(parent: HTMLElement, className: string) {
    super({ className, parent });
    this.formCreate = new CreateForm(this.node, 'Create', 'createFormElement');
    this.formRename = new CreateForm(this.node, 'Update', 'renameFormElement');
    this.section = new BaseComponent({ tag: 'section', parent: this });
    this.append(this.formCreate.getNode());
    this.append(this.formRename.getNode());
    this.append(this.section);
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
}

export default GaragePage;
