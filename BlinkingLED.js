var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var smallButton = new Gpio(22, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

var STATE = {
  LED: false
}

function turnOffLED() {
  LED.writeSync(0);
  STATE.LED = false;
}
function turnOnLEDForSec(seconds) {
  LED.writeSync(1);
  STATE.LED = true;
  if(seconds > 0){
    setTimeout(turnOffLED, seconds * 1000);
  }
}

pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  if(value && !STATE.LED){
    turnOnLEDForSec(10);
  }
});

//Reset all lights
smallButton.watch(function (err, value){
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  if(value){
    console.log('lights off');
    LED.writeSync(0);
  }
});

function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
