This is a simple calculator.

The javascript/jquery code is put in main.js. All related functions and variables are capsuled in the calculator object.

In order to make sure good performance and save storage, there is only one event handler. When the user click on calculator, will first find out which button is clicked on, and then call the related function. 

Only valid input will be accepted. When the resulting number is too long, it will be displayed in exponential format.