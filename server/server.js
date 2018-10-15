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
    console.log('app.post newNumber is', newNumber);
    answer = math(newNumber);
    console.log(answer);
    
    /// using unshift to append top to bottom
    Calculations.unshift(newNumber);
    
    res.sendStatus(201);
})


app.get('/sum', (req, res) => {
    console.log('in app.get log');
    /// calling my math() function to app.get
    res.send(answer.toString()); /// sending answer back 
})

/// running math() function
function math(newNumber){
   let num1 = parseFloat(newNumber.Input1);
   let num2 = parseFloat(newNumber.Input2);
    console.log(num1 + ' ' + num2);
    let operator = newNumber.Operator;
    if ( operator == '+' ){
        let answer = num1 + num2;
        return answer;
    } else if (operator == '-') {
        let answer = num1 - num2;
        return answer;
    } else if ( operator == '*' ) {
        let answer = num1 * num2;
        return answer;
    } else if ( operator == '/' ) {
        let answer = num1 / num2;
        return answer;
     }
}

const port = 5000;
/// listening to port 5000
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
    
})