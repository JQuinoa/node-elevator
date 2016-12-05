class ElevatorRequestLogger {
  constructor(emitter){
    this.emitter = emitter;
    this._setupListeners()
  }

  _setupListeners(){
    this.emitter.addListener('eleIdle',               (floorNumber) => console.log("Idle on", floorNumber))
    this.emitter.addListener('eleBoarding',           (floorNumber) => console.log("Boarding on", floorNumber))
    this.emitter.addListener('addedToQueue',          (floorNumber) => console.log("Added to queue", floorNumber))
    this.emitter.addListener('inTransit',             (floorNumber) => console.log("In Transit", floorNumber))
    // this.emitter.addListener('currentFloorChanged',   (floorNumber) => console.log("Floor Changed", floorNumber))
    this.emitter.addListener('floorAlreadyRequested', (floorNumber) => console.log("Floor Already Requested", floorNumber))
  }
}

module.exports = ElevatorRequestLogger;
