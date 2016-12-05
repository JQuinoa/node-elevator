const ElevatorStatus  = require('./constants');
const ElevatorEmitter = require('./elevator-emitter');

class Elevator {
  constructor({
    emitter,
    currentFloor  = 0,
    onBoard       = [],
  } = {}){
    this.emitter      = emitter;
    this.currentFloor = currentFloor;
    this.onBoard      = onBoard;
    this._setupListeners();
  }

  _setupListeners(){
    this.emitter.addListener("elevatorMove", (floorNumber) => this._moveHandler(floorNumber));
  }

  _moveHandler(floorNumber){
    this.emitter.emit("inTransit", floorNumber);
    for (let i = 0; i < 10000000; i+= 0.5){}
    this.emitter.emit("eleBoarding", floorNumber);
    for (let i = 0; i < 10000000; i+= 0.5){}
    this.emitter.emit("eleIdle", floorNumber);
  }
}

module.exports = Elevator;
