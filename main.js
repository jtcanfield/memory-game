/*It helped me to build the markup that I wanted using only html and css,
and then program the JS to create an exact replica of my markup.*/
let scriptLoadingText = document.getElementById("script_load_text");
let htmlBody = document.querySelector("body");
scriptLoadingText.style.display = 'none';
askForName();
//BEGIN NAME ENTRY
function askForName(){
  function nameAsker(){
    let holder = `
    <div id="name_entry">
      <h2>Whats your name?</h2>
      <input id="name_input"></input>
      <br>
      <button onclick="createPreGame()">Submit</button>
    </div>
    `;
   return holder
  }
  let nameVariable = nameAsker();
  htmlBody.innerHTML = nameVariable;
}
//END NAME ENTRY
//BEGIN INTRO
function createPreGame(){
  function preGameGenerator(){
    let userName = document.getElementById("name_input").value;
    if (userName === ""){
    userName = "Unnamed Victim";
    }
    let holder = `
    <div id="pre_game_body">
      <h1>Welcome ${userName}, Click to Start!</h1>
      <button id="start_game" onclick="startCountDown()">START GAME!</button>
    </div>
    `;
   return holder
  }
  let preGameHolder = preGameGenerator();
  htmlBody.innerHTML = preGameHolder;
}
//END INTRO
//BEGIN COUNTDOWN TO START
function startCountDown(){
  createGameBoard();
}
//END COUNTDOWN TO START
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
