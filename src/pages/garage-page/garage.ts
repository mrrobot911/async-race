import BaseComponent from '../../components/baseComponent';
import Car from '../../components/car/car';
import CreateForm from '../../components/create-form/create-form';
import { CarData } from '../../interfaces/cars';
import ApiService from '../../service/api-service';

class GaragePage extends BaseComponent {
  private readonly formCreate: CreateForm;

  private readonly formRename: CreateForm;

  private readonly section: BaseComponent<'section'>;

  constructor(className: string, parent: HTMLElement, service: ApiService) {
    super({ tag: 'div', className, parent });
    this.formCreate = new CreateForm(this.node, 'Create');
    this.formRename = new CreateForm(this.node, 'Update', true);
    this.section = new BaseComponent({ tag: 'section', parent: this });
    service.getCars().then((resp) =>
      resp.forEach((car: CarData) => {
        this.section.append(new Car(car).getNode());
      })
    );
    this.append(this.formCreate.getNode());
    this.append(this.formRename.getNode());
    this.append(this.section);
  }
}

export default GaragePage;
