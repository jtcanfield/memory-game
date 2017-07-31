
$("h1").click(function(){
// Update the count down every 1 second
var x = setInterval(function() {
  // Get todays date and time
  var countDownDate = new Date().getTime();
  countDownDate = countDownDate + 300000;
  var now = new Date().getTime();
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("clockdiv").innerHTML = minutes + "m " + seconds + "s ";
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("clockdiv").innerHTML = "EXPIRED";
  }
}, 1000);
});
