const Elevator               = require('./src/elevator');
const ElevatorEmitter        = require('./src/elevator-emitter');
const ElevatorRequestHandler = require('./src/elevator-request-handler');
const ElevatorRequestLogger  = require('./src/elevator-request-logger');

let   myEmitter       = new ElevatorEmitter();
const ele             = new Elevator({ emitter: myEmitter });
const requestHandler  = new ElevatorRequestHandler({ elevator: ele, emitter: myEmitter });
const logger          = new ElevatorRequestLogger(myEmitter)

myEmitter.emit('elevatorRequested', 1);
myEmitter.emit('elevatorRequested', 2);
myEmitter.emit('elevatorRequested', 3);
myEmitter.emit('elevatorRequested', 4);
myEmitter.emit('elevatorRequested', 5);
myEmitter.emit('elevatorRequested', 6);
myEmitter.emit('elevatorRequested', 3);
myEmitter.emit('elevatorRequested', 1);
