class Person {
  constructor({
      name        = "Ironhacker",
      floorNumber = 0,
      emitter     = new ElevatorEmitter()
      destinationFloor,
    })
    {
      this.name             = name;
      this.floorNumber      = floorNumber;
      this.emitter          = emitter;
      this.destinationFloor = destinationFloor;
    }

  _request(){
    
  }
}
