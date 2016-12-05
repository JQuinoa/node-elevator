const ElevatorStatus = require('./elevator-status');

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

    emitter.addListener('elevatorRequested', (floorNumber) => this._addToRequestQueue(floorNumber));
    emitter.addListener('addedToQueue',      (floorNumber) => this._attemptMove(floorNumber));
    emitter.addListener('inTransit',          _ => this._inTransit());
    emitter.addListener('eleBoarding',        _ => this._eleBoarding());
    emitter.addListener('eleIdle',           (floorNumber) => this._eleIdle(floorNumber));
    emitter.addListener('tripComplete',      (floorNumber) => this._onTripComplete(floorNumber));
  }

  _addToRequestQueue(floorNumber){
    console.log(this.requests)
    if (!this.requests.has(floorNumber)){
      let sortedRequests = this._orderRequests(this.requests, floorNumber);
      this.requests = sortedRequests;
      this.emitter.emit("addedToQueue", floorNumber);
    } else {
      this.emitter.emit("floorAlreadyRequested", floorNumber);
    }
  }

  _orderRequests(requests, newFloor){
    return new Set([...requests].sort()).add(newFloor);
  }

  _attemptMove(floorNumber){
    this.emitter.emit("elevatorMove", floorNumber);
  }

  _onTripComplete(floorNumber){
    console.log("Trip Complete")
    this.requests.delete(floorNumber)
  }

  _eleIdle(floorNumber){
    this.status = ElevatorStatus.IDLE;
  }

  _eleBoarding(){
    this.status = ElevatorStatus.BOARDING;
  }

  _inTransit(){
    this.status = ElevatorStatus.IN_TRANSIT;
  }

  _eleIsIdle(){
    return this.status === ElevatorStatus.IDLE;
  }

  _eleIsBoarding(){
    return this.status === ElevatorStatus.BOARDING;
  }

  _eleInTransit(){
    return this.status === ElevatorStatus.IN_MOTION
  }
}

module.exports = ElevatorRequestHandler;
