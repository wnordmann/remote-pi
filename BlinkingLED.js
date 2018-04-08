// var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
// var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
// var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var buttons = require('rpi-gpio-buttons')([17]);

// var blinkInterval = setInterval(blinkLED, 1000); //run the blinkLED function every 250ms
//
// function blinkLED() { //function to start blinking
//   if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
//     LED.writeSync(1); //set pin state to 1 (turn LED on)
//   } else {
//     LED.writeSync(0); //set pin state to 0 (turn LED off)
//   }
// }
//
// function endBlink() { //function to stop blinking
//   clearInterval(blinkInterval); // Stop blink intervals
//   LED.writeSync(0); // Turn LED off
//   LED.unexport(); // Unexport GPIO to free resources
// }
//
// setTimeout(endBlink, 10000); //stop blinking after 5 seconds
// function turnOffLED(){
//   LED.writeSync(0);
//   console.log('turn OFF LED', Date());
// }
// pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
//   if (err) { //if an error
//     console.error('There was an error', err); //output error message to console
//   return;
//   }
//   console.log("button press ", value);
//   if(value){ // Only want to detect a push button - 1
//     LED.writeSync(1);
//     console.log('turn on LED', Date())
//     setInterval(turnOffLED, 10000);
//   }
//   // LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
// });

// bind to the clicked event and check for the assigned pins when clicked
buttons.on('clicked', function (pin) {
  switch(pin) {
    // Up button on pin 11 was clicked
    case 17:
      // LED.writeSync(1);
      console.log('turn on LED', Date())
      // setInterval(turnOffLED, 10000);
      break;
  }
});


function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  // pushButton.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
