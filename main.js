let gameBodyId = document.getElementById("game_body");
gameBodyId.style.display = 'none';
var timerElement = document.querySelectorAll(".timer_start");
console.log(timerElement);
function startGame(){
  gameBodyId.style.display = 'inline';
}
function playercick(){
  timerBeginCount();
}


// function (){
//
// }





function timerBeginCount(){
let timerClassArray = document.getElementsByClassName("timer_start");
console.log(timerClassArray);
for (let i = 0; i < timerElement.length; i++){
  timerClassArray[0].classList.remove('timer_start');
}
//Set Time + 5 mins
let countDownDate = new Date().getTime();
countDownDate = countDownDate + 300000;
// Update the count down every 1 second
  var x = setInterval(function() {
    let now = new Date().getTime();
    // Find the distance between now an the count down date
    let distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("clockdiv").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("clockdiv").innerHTML = "EXPIRED";
    }
  }, 1000);
};
/*
Addd a listener to all options
if one is clicked, keep it displayed
if two is clicked, compare and see if they match
if they do not match, make them hidden
if they do match, keep them up

while (game running){
code will do this
}
*/
