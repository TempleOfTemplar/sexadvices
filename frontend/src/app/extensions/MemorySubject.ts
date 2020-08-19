import {ObjectUnsubscribedError, Subject, Subscriber, Subscription} from "rxjs";

const INITIAL_VALUE = {};

export class MemorySubject<T> extends Subject<T> {
  constructor(initialValue?: T, private pushLastValue: boolean = true) {
    super();
    this._value = typeof (initialValue) === "undefined" ? INITIAL_VALUE as any : initialValue;
  }

  protected _value?: T;

  get value(): T {
    return this.getValue();
  }

  getValue(): T {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    } else {
      return this._value === INITIAL_VALUE ? undefined : this._value;
    }
  }

  hasValue(): boolean {
    return this._value !== INITIAL_VALUE;
  }

  next(value: T): void {
    super.next(this._value = value);
  }

  reset() {
    this._value = INITIAL_VALUE as any;
  }

  /**
   * Делает next для текущего значения, нужно вызывать после мутации зачения
   */
  update() {
    this.next(this.value);
  }

  _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber);
    if (this.pushLastValue && subscription && !(subscription as Subscription).closed && this._value !== INITIAL_VALUE) {
      subscriber.next(this._value);
    }
    return subscription;
  }
}
