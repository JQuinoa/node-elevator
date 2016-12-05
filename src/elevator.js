const ElevatorStatus  = require('./elevator-status');
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
    if (this.currentFloor !== floorNumber){
      this.emitter.emit("inTransit", floorNumber);
    }
    for (let i = 0; i < 10000000; i+= 0.5){}
    this.emitter.emit("eleBoarding", floorNumber);
    this.currentFloor = floorNumber;
    this.emitter.emit("tripComplete", floorNumber);
    this.emitter.emit("currentFloorChanged", this.currentFloor);
    for (let i = 0; i < 10000000; i+= 0.5){}
    this.emitter.emit("eleIdle", floorNumber);
  }
}

module.exports = Elevator;
