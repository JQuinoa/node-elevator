class Floor {
  constructor({ number, emitter = new ElevatorEmitter(), waiting = []}){
    this.number   = number;
    this.emitter  = emitter;
    this.waiting  = waiting;
  }

  _setupListeners(){
    emitter.addEventListener("elevatorArrived", removeFromWaiting);
  }

  _removeFromWaiting(){
    this.waiting = [];
  }
}
