const Elevator = require('./src/elevator');
const Person   = require ('./src/person')

let elevator = new Elevator();
let john    = new Person("john", 3); // john is in floor 3
let michael = new Person("michael", 1); // john is in floor 3
let mery    = new Person("mery", 5); // john is in floor 3

console.log("Elevator called by john");
console.log(`OUT > JOHN calls`)
elevator.call(john, 5) // john calls the elevator and tells he wanna go 5th

console.log(`OUT > MERY calls`)
elevator.call(mery, 1) // john calls the elevator and tells he wanna go 5th

console.log(`OUT > MICHAEL calls`)
elevator.call(michael, 5) // john calls the elevator and tells he wanna go 5th


// const ElevatorEmitter        = require('./src/elevator-emitter');
// const ElevatorRequestHandler = require('./src/elevator-request-handler');
// const ElevatorRequestLogger  = require('./src/elevator-request-logger');

// let   myEmitter       = new ElevatorEmitter();
// const ele             = new Elevator({ emitter: myEmitter });
// const requestHandler  = new ElevatorRequestHandler({ elevator: ele, emitter: myEmitter });
// const logger          = new ElevatorRequestLogger(myEmitter)
//
// setTimeout(_=> {
//   myEmitter.emit('elevatorRequested', 1);
// }, 100)
//
// myEmitter.emit('elevatorRequested', 2);
//
// setTimeout(_=>{
//   myEmitter.emit('elevatorRequested', 2);
//   myEmitter.emit('elevatorRequested', 2);
// }, 700)
//
// setTimeout(_=>{
//   myEmitter.emit('elevatorRequested', 3);
// }, 600)
//
// setTimeout(_=>{
//   myEmitter.emit('elevatorRequested', 4);
// }, 500)
//
// setTimeout(_=>{
//   myEmitter.emit('elevatorRequested', 5);
// }, 300)
//
//
