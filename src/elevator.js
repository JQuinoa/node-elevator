// const ElevatorStatus  = require('./elevator-status');
// const ElevatorEmitter = require('./elevator-emitter');

class Elevator {
  constructor() {
    this.maxFloor           = 15;
    this.currentFloor       = 0;
    this.onBoard            = [];
    this.requests           = [];
    this.requestBeingServed = false;
    this._start();
  }

  call(person, destinationFloor) {
    console.log(`${person.name} calls the elevator to go to ${destinationFloor} floor`)
    this.requests.push({person: person, floor: destinationFloor})
    this._start()
  }

  _start() {
    if (!this.requestBeingServed){
      let requestInterval = setInterval(()=> {
        if (this.requests.length > 0){
          this.requestBeingServed = true;
          let request = this.requests.shift();
          while (this.currentFloor < request.person.floor) { this._floorUp()   }
          while (this.currentFloor > request.person.floor) { this._floorDown() }

          request.person.notify('elevator is here!')
          this.onBoard.push(request.person);

          while (this.currentFloor < request.floor) { this._floorUp()   }
          while (this.currentFloor > request.floor) { this._floorDown() }

          request.person.notify('elevator ride finished !');
          this.requestBeingServed = false;
          this.onBoard = [];
        }
      }, 1000);
    }

  }

  _floorUp(){
    if (this.currentFloor < this.maxFloor){
      for (let i = 0; i < 100000000; i+= 0.5){}
      this.currentFloor++;
      console.log(`ELEVATOR | Floor ${this.currentFloor}`)
      this.onBoard.forEach( (p) => { p.floor++ })
    }
  }

  _floorDown(){
    if (this.currentFloor > 0) {
      for (let i = 0; i < 100000000; i+= 0.5){}
      this.currentFloor--;
      console.log(`ELEVATOR | Floor ${this.currentFloor}`)
      this.onBoard.forEach( (p) => { p.floor-- })
    }
  }
}

module.exports = Elevator;
