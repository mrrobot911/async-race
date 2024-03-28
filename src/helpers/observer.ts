class EventObserver<Listener> {
  private observers: Set<(data: Listener) => void>;

  constructor() {
    this.observers = new Set();
  }

  subscribe(observer: (data: Listener) => void): void {
    this.observers.add(observer);
  }

  unsubscribe(observer: (data: Listener) => void): void {
    this.observers.delete(observer);
  }

  notify(data: Listener): void {
    const observersArray = Array.from(this.observers);
    const { length } = observersArray;
    for (let i = 0; i < length; i += 1) {
      observersArray[i](data);
    }
  }
}

export default EventObserver;
