/*It helped me to build the markup that I wanted using only html and css,
and then program the JS to create an exact replica of my markup.*/
let scriptLoadingText = document.getElementById("script_load_text");
scriptLoadingText.style.display = 'none';
let preGameBody = document.getElementById("pre_game_body");
preGameBody.style.display = 'block';
var timerElement = document.querySelectorAll(".timer_start");
console.log(timerElement);
function startGame(){
  preGameBody.style.display = 'none';
  createGameBoard();
}
//BEGIN INTRO
function createGameBoard(){
  function holderDivisions(){
    let holder = `
    <div id="pre_game_body">
      <button id="start_game" onclick="startGame()">START GAME!</button>
    </div>
    `;
   return holder
  }
  let htmlBody = document.querySelector("body");
  let gameBoardBody = holderDivisions();
  htmlBody.innerHTML = gameBoardBody;
  timerBeginCount();
}
//END INTRO
//BEGIN CREATE GAME BOARD
function createGameBoard(){
  function holderDivisions(){
    let holder = `
    <div id="game_body">
      <h1>The Annoying Memory Game</h1>
        <div id="clockdiv"></div>
      <div id="outerbox_div">
        <div id="innerbox_div">
          <div onclick="playercick(this)"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
          <div onclick="playercick()"></div>
        </div>
      </div>
    </div>
    `;
   return holder
  }
  let htmlBody = document.querySelector("body");
  let gameBoardBody = holderDivisions();
  htmlBody.innerHTML = gameBoardBody;
  timerBeginCount();
}
//END CREATE GAME BOARD
//BEGIN CREATE TIMER AND COUNTDOWN
function timerBeginCount(){
let countDownDate = new Date().getTime();
countDownDate = countDownDate + 300000;
  var x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;
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
//END CREATE TIMER AND COUNTDOWN
/*
function blogPost (title, date, content) {
  let post = `
    <article>
      <h2>${title}</h2>
      <span class="date">${date}</span>
      <div class="post">
        ${content}
      </div>
    </article>
  `;
 return post
}
let post1 = blogPost("Intro to Hang Gliding", "April 1st", "Lorem ipsum dolor...");
console.log(post1);
*/

function playercick(divClicked){
  console.log(divClicked);
}



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
