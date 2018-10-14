const express = require('express');

const bodyParser = require('body-parser')
const app = express();
/// this is needed to get data from ajax
app.use(bodyParser.urlencoded({extended: true}));
app.use( express.static('server/public'));

//Calculations array that houses my history of calculations
const Calculations = [];

let answer;

/// GET /numbers link to client.js
app.get('/numbers', (req, res) => {
    res.send(Calculations);
})


/// POST /numbers link to client.js
app.post('/numbers', (req, res) => {
    let newNumber = req.body;
    /// using unshift to append top to bottom
    Calculations.unshift(newNumber);
    
    res.sendStatus(201);
})


app.get('/sum', (req, res) => {
    console.log('in app.get log');
    /// calling my math() function to app.get
    math();
    res.send(answer); /// sending answer back ---- NOT WORKING!!!
})

/// running math() function
function math(){
    console.log('in math function');
    
    // for loop getting info of numbers and operators from the Calculations array;
    for(let i=0; i<Calculations.length; i++){
    
    let firstNumber = Calculations[i].Input1;
    console.log('first number', firstNumber);
    
    let operator = Calculations[i].Operator;
    console.log('operator', operator);
    
    let secondNumber = Calculations[i].Input2;
    console.log('second number', secondNumber);

    let answer = eval(firstNumber+operator+secondNumber);
    /// console logging answer is working!
    console.log('answer =', answer);
    
    return answer;
    }  

}


const port = 5000;
/// listening to port 5000
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
    
})