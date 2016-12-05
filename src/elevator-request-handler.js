const ElevatorStatus = require('constants');

class ElevatorRequestHandler {
  constructor({
    elevator,
    emitter,
    requests  = new Set(),
    status    = ElevatorStatus.IDLE
  } = {}){
    this.elevator = elevator;
    this.emitter  = emitter;
    this.requests = requests;
    this.status   = status;
    this._setupListeners();
  }

  _setupListeners(){
    let { emitter } = this;

    emitter.addListener('inTransit',          _ => this._inTransit);
    emitter.addListener('eleBoarding',        _ => this._eleBoarding);
    emitter.addListener('elevatorRequested', (floorNumber) => this._addToRequestQueue(floorNumber));
    emitter.addListener('addedToQueue',      (floorNumber) => this._attemptMove(floorNumber));
    emitter.addListener('eleIdle',           (floorNumber) => this._eleIdle(floorNumber));
  }

  _addToRequestQueue(floorNumber){
    let sortedRequests = new Set([...this.requests].sort());
    if (!this.requests.has(floorNumber)){
      this.requests = sortedRequests.add(floorNumber);
      this.emitter.emit("addedToQueue", floorNumber);
    } else {
      this.emitter.emit("floorAlreadyRequested", floorNumber);
    }
  }

  _attemptMove(floorNumber){
    if (this._eleIsIdle() && this.requests.size > 0){
      this.emitter.emit("elevatorMove", floorNumber);
    }
  }

  _eleIdle(floorNumber){
    this.requests.delete(floorNumber);
    this.status = ElevatorStatus.IDLE;
  }


  _eleBoarding(){
    this.status = ElevatorStatus.BOARDING;
  }

  _inTransit(){
    this.status = ElevatorStatus.IN_TRANSIT;
  }

  _eleIsIdle(){
    return this.elevator.status === ElevatorStatus.IDLE;
  }

  _eleIsBoarding(){
    return this.elevator.status === ElevatorStatus.BOARDING;
  }

  _eleInTransit(){
    return this.elevator.status === ElevatorStatus.IN_MOTION
  }
}

module.exports = ElevatorRequestHandler;
