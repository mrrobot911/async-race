import BaseComponent from '../baseComponent';

export type HTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export default class Input extends BaseComponent<'input'> {
  private type: HTMLInputTypeAttribute;

  private classList: string[];

  private placeholder: string;

  private defaultValue: string;

  private value: string;

  constructor(
    type: HTMLInputTypeAttribute,
    isDisabled = false,
    defaultValue = '',
    classlist: string[] = [],
    placeholder = ''
  ) {
    super({ tag: 'input' });
    this.type = type;
    this.classList = classlist;
    this.placeholder = placeholder;
    this.defaultValue = defaultValue;
    this.value = '';
    this.setAttribute('type', this.type);
    this.setAttribute('placeholder', this.placeholder);
    this.setAttribute('value', this.defaultValue);
    this.toggleDisabled(isDisabled);
    this.addListener('input', (event?: Event) => {
      const target = event?.target as HTMLInputElement;
      this.value = target.value;
    });
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
    this.setAttribute('value', value);
  }

  toggleDisabled(isDisabled: boolean): void {
    if (isDisabled) {
      this.setAttribute('disabled', 'true');
    } else {
      this.removeAttribute('disabled');
    }
  }
}
