/*It helped me to build the markup that I wanted using only html and css,
and then program the JS to create an exact replica of my markup.*/
let scriptLoadingText = document.getElementById("script_load_text");
scriptLoadingText.style.display = 'none';
let htmlBody = document.querySelector("body");
let gameCardsObject = {
  "results":[
    {
      "meme1":{
      "first":"curtis",
      "last":"ryan",
      }
    },
    {
      "meme2":{
      "first":"martin",
      "last":"terry",
      }
    },
    {
      "meme3":{
      "first":"martin",
      "last":"terry",
      }
    },
    {
      "meme4":{
      "first":"martin",
      "last":"terry",
      }
    },
  ]
};
createHeader();
function createHeader(){
  let setHeader = document.querySelector("head");
  let holder = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Roboto|Shrikhand" rel="stylesheet">
  <link href="style.css" type="text/css" rel="stylesheet">
  <title>The Annoying Memory Game</title>
  `;
    setHeader.innerHTML = holder;
}
// askForName();
createGameBoard();
//BEGIN NAME ENTRY
function askForName(){
    let holder = `
    <div id="name_entry" onclick="checkName()">
      <div id="name_entry_inner_box">
        <h2>Whats your name?</h2>
        <br>
        <input id="name_input_box"></input>
        <br><br>
        <p>Click anywhere to begin...</p>
        <br><br>
        <p id="name_plate_announcement"> </p>
      </div>
    </div>
    `;
  htmlBody.innerHTML = holder;
  let textFocus = document.getElementById("name_input_box");
  textFocus.focus();
  textFocus.select();
}
//END NAME ENTRY
//BEGIN NAME CHECKER
let noNameTries = 0;
function checkName(){
  let userName = document.getElementById("name_input_box").value;
  let textFocus = document.getElementById("name_plate_announcement");
  let arrayOfText = ["Oh come on.... at least *try* to put a name in!", "Could ya please put your name in?", "Pretty pleeeeease??", "Okay, Fine!"]
  if (userName === "" && noNameTries <= 3){
    textFocus.innerHTML = arrayOfText[noNameTries];
    noNameTries = noNameTries + 1;
    let reAdd = document.getElementById("name_input_box");
    if (noNameTries <= 3){
      reAdd.focus();
      reAdd.select();
      return
    }
  }
  if (noNameTries >= 1 && noNameTries <= 3){ textFocus.innerHTML = "Thank you....."; }
  if (userName === ""){ userName = "Unnamed Victim";}
  (document.getElementById("name_entry")).setAttribute("onclick", " ");
  fadeOut(document.getElementById("name_entry"), .01);
  setTimeout(function() { createPreGame(userName);}, 2000);
}
//END NAME CHECKER
//BEGIN INTRO
function createPreGame(userName){
    let holder = `
    <div id="pre_game_body">
      <h2>Welcome ${userName}!</h2>
      <p>You have five minutes to match all of the memes. When you are ready, click anywhere to start!</p>
    </div>
    `;
  htmlBody.innerHTML = holder;
  fadeIn(document.getElementById("pre_game_body"), .01);
  setTimeout(function() { (document.getElementById("pre_game_body")).setAttribute("onclick", "startCountDown()");}, 2000);
}
//END INTRO
//BEGIN COUNTDOWN TO START
function startCountDown(){
  fadeOut(document.getElementById("pre_game_body"), .1);
  function countDownText(second){
    let holder = `
    <div id="count_down_timer">
    <h1>${second}</h1>
    </div>
    `;
    htmlBody.innerHTML = holder;
    fadeOut(document.getElementById("count_down_timer"), .05);
   return
  }
  setTimeout(function() { countDownText(4);}, 1000);
  setTimeout(function() { countDownText(3);}, 2000);
  setTimeout(function() { countDownText(2);}, 3000);
  setTimeout(function() { countDownText(1);}, 4000);
  setTimeout(function() { createGameBoard();}, 5000);
}
//END COUNTDOWN TO START
//BEGIN CREATE GAME BOARD
function createGameBoard(){
let holderLargeDivisions = `
    <div id="game_body">
      <h1>The Annoying Memory Game</h1>
        <div id="clockdiv"></div>
      <div id="outerbox_div">
        <div id="innerbox_div">
        </div>
      </div>
    </div>
    `;
  htmlBody.innerHTML = holderLargeDivisions;
  timerBeginCount();
  function createRandomizedBoxDivs(maxCards){
    let amountOfImages = 0;
    let imagesNeeded = maxCards/2;
    let amountOfCards = 0;
    let amountOfImagesWhile = 0;
    let parentToAddTo = document.getElementById("innerbox_div");
    let arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

    while (amountOfImagesWhile < imagesNeeded){
        let randomGenIndex = Math.floor(Math.random()*arrayOfNumbers.length);
        let numberPicked = arrayOfNumbers[randomGenIndex];
        /*gameCardsObject.firstimage = new Object();
        gameCardsObject.firstimage.image = "img/memepicture"+numberPicked+".png";
        gameCardsObject.secondimage = new Object();
        gameCardsObject.secondimage.image = "img/memepicture"+numberPicked+".png";*/
        arrayOfNumbers.splice(randomGenIndex,1);
      amountOfImagesWhile++;
    }
    while (amountOfCards < maxCards){
      let newCard = document.createElement("div");
      newCard.setAttribute("onclick", "playerclick(this, "+amountOfCards+")");
      parentToAddTo.appendChild(newCard);
      amountOfCards++;
    }
    console.log(gameCardsObject);
    console.log(gameCardsObject.results);
    console.log(customers.results);
  }
  createRandomizedBoxDivs(50);
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
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("clockdiv").innerHTML = "EXPIRED";
    }
  }, 1000);
};
//END CREATE TIMER AND COUNTDOWN

let heartvaue = 7;
function playerclick(divClicked, divNumber){
  let lengthOfBoard = document.getElementById("innerbox_div").children.length;
  console.log(gameCardsObject.results[0]/*.meme[divNumber]*/);
  console.log(divClicked);
  console.log(divNumber);

}

//BEGIN STANDALONE FADE FUNCTIONS
function fadeOut(element, speed){
  element.style.opacity = 1;
  (function fade() {
    if ((element.style.opacity -= speed) < 0) {
      element.style.display = "none";
      return "done"
    } else {
      requestAnimationFrame(fade);
    }
  })();
}
function fadeIn(element, speed){
  element.style.opacity = 0;
  (function fade() {
    var val = parseFloat(element.style.opacity);
    if (!((val += speed) > 1)) {
      element.style.opacity = val;
      requestAnimationFrame(fade);
    } else {
      return "done"
    }
  })();
}
//END STANDALONE FADE FUNCTIONS

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
