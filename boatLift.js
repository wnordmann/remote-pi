var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

// IR connected pin
// A - full up - gpio 14
// B - full down - gpio 15
// C - half up - gpio 18
// D - half down - gpio 27
// 'both' button presses, and releases should be handled
// IR Button A - GPIO pin 14 full up
var irA = new Gpio(14, 'in', 'both');
// IR Button B - GPIO pin 15 full down
var irB = new Gpio(15, 'in', 'both');
// IR Button D - GPIO pin 18 half up
var irC = new Gpio(18, 'in', 'both');
// IR Button D - GPIO pin 27 half down
var irD = new Gpio(27, 'in', 'both');

// IoT Device Connected to Air Pump
var Pump = new Gpio(25, 'out');

// Relay connected to solinoid valve
var Valve = new Gpio(23, 'out');

// Time Const
// var FULL = 300000;  // Full time 5 minutes
// var HALF = 150000;  // Full time 2.5 minutes
var FULL = 30;
var HALF = 15;


// Direction const
var UP = 1;
var DOWN = 0;

var STATE = {
  moving: false
}
// Move function
function move(direction, time) {
  if(!STATE.movig){
    STATE.moving = true;
    if(direction === UP){
      console.log("Moving up");
      Pump.writeSync(1);
    }
    if(direction === DOWN){
      console.log("Moving down");
      Valve.writeSync(1);
    }
    setTimeout(stop, time);
  }
}

function stop(){
  console.log('Stop');
  Pump.writeSync(0);
  Valve.writeSync(0);
  STATE.moving = false;
}

// Full Up
irA.watch(function (err, value){
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  if(value){
    console.log('IR-A Full Up');
    move(UP, FULL);
  }
});

// Full Down
irB.watch(function (err, value){
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  if(value){
    console.log('IR-B Full Down');
    move(DOWN, FULL);
  }
});
// Half Up
irC.watch(function (err, value){
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  if(value){
    console.log('IR-C Half Up');
    move(UP, HALF);
  }
});
// Half Down
irD.watch(function (err, value){
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  if(value){
    console.log('IR-D Half Down');
    move(DOWN, HALF);
  }
});



function unexportOnClose() { //function to run when exiting program
  Pump.writeSync(0);
  Pump.unexport();
  Valve.writeSync(0);
  Valve.unexport();

  irA.writeSync(0);
  irA.unexport();
  irB.writeSync(0);
  irB.unexport();
  irC.writeSync(0);
  irC.unexport();
  irD.writeSync(0);
  irD.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
