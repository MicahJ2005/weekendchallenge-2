console.log('JS Ready');


$( document ).ready( readyNow );

function readyNow(){
  console.log( 'JQ' );

$('#equalsButton').on('click', addNumbers);
$('input[type= "button"]').on('click', mathType);
$('#clearButton').on('click', clearInput);

} //end readyNow

let operator = 0;

$('#num1').val('');
$('#num2').val('');


function addNumbers(event){
  event.preventDefault();
  console.log('equal button clicked');
  let input1 = $('#num1').val();
  let input2 = $('#num2').val();
  
  $('#num1').val('');
  $('#num2').val('');
  console.log(`number 1: ${input1} operator: ${operator} Number 2: ${input2}`);
  //// POST is pushing to server
  $.ajax({
    method: 'POST',
    url: '/numbers',
    data:{
      Input1: input1,
      Operator: operator,
      Input2: input2,
      
    }
  }).then(function(response){
    console.log('numbers added');
    
    getAllNumbers();
    getSum();
  }).catch(function(error){
    console.log('error adding to server');
    
  })
}
/// GET is getting from server
function getAllNumbers(){
  $.ajax({
    method: 'GET',
    url: '/numbers',
  }).then(function(response) {
    console.log('get numbers', response);
    
    showAllNumbers(response);
  }).catch( function(error) {
    console.log('Error in request to server for numbers');
    
  })
}

function showAllNumbers(numbersArray){
  console.log('in show all numbers');
  
  $('#history').empty();
  for(let number of numbersArray){
    $('#history').append(`
    <tr>
    <td> ${number.Input1} <td>
    <td> ${number.Operator} <td>
    <td> ${number.Input2} <td>
    `)
  }
}

function getSum(){
  console.log('in getSum');
  
  $.ajax({
    method: 'GET',
    url: '/sum',
  }).then(function(response) {
    console.log('get sum', response);
    $('#total').empty();
    $('#total').append('Total:', response);
    
  }).catch( function(error) {
    console.log('Error in request to server for sum');
    
  })
}


//// this function removes the '=' button from causing problems
//// with my type="button" inputs
function mathType(){
  if($(this).val() === '='){
    
  }
  else{
    operator = $(this).val();
  }
}
/// this clears any inputs in the input fields//
function clearInput(){
  console.log('clear button');
  $('#num1').val('');
  $('#num2').val('');
}

