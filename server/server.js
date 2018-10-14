const express = require('express');

const bodyParser = require('body-parser')
const app = express();
/// this is needed to get data from ajax
app.use(bodyParser.urlencoded({extended: true}));
app.use( express.static('server/public'));

const Calculations = [];

answer = 0

app.get('/numbers', (req, res) => {
    res.send(Calculations)
})



app.post('/numbers', (req, res) => {
    let newNumber = req.body;
    Calculations.unshift(newNumber);
    
    res.sendStatus(201);
})

app.get('/sum', (req, res) => {
    res.send(answer);
})


function math(){
    for(let i=0; i<Calculations.length; i++){
    
    let firstNumber = Calculations[i].Input1;
    console.log('first number', firstNumber);
    
    let operator = Calculations[i].Operator;
    console.log('operator', operator);
    
    let secondNumber = Calculations[i].Input2;
    console.log('second number', secondNumber);
    
    
    let answer = eval(firstNumber+operator+secondNumber);
    console.log(answer);
    
    }
}
math();

const port = 5000;

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
    
})