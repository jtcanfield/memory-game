
var timerElement = document.getElementsByClassName("timer_start");
console.log(timerElement);
timerElement.addEventListener("click", timerBeginCount);
function timerBeginCount(){
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
