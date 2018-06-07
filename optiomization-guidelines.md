# FitbitOS JS Optimization Guidelines

FitbitOS relies on [JerryScript](http://jerryscript.net/) virtual machine. JerryScript is a full-featured JS engine fully compatible with ECMA-262 edition 5.1. It is designed for microcontrollers having restricted RAM and is primarily optimized for the low memory consumption. It can operate with less than 64KB RAM, it doesn't have a JIT, and it is in general much slower than popular JS engines.

Fitbit doesn't publish the detailed hardware specs for their devices, however, it's known that Fitbit Ionic:
- uses ARM Cortex-M4F core running at 120 MHz.
- has pretty decent hardware 2D accellerator supporting vector graphics and bitmap rotation.
- has 64KB of JS memory heap.

## Numbers

JS Number type doesn't make a difference between integers and floats, and ECMA-262 requires the floating point to implement 64-bit IEEE math. ARM Cortex-M4F has not hardware accellerated 64-bit floating point math, thus it's implemented in software and is quite slow. You can expect an execution speed to be about 4-5K of arithmetic operations per second for a Fitbit Ionic. Integer math is slightly (about 25%) faster.

There's an important difference between integers and floating point numbers in the memory consumption, however. JerryScript value 




373
418

324
378
