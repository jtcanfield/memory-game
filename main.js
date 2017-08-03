/*It helped me to build the markup that I wanted using only html and css,
and then program the JS to create an exact replica of my markup.*/
let scriptLoadingText = document.getElementById("script_load_text");
scriptLoadingText.style.display = 'none';
let htmlBody = document.querySelector("body");
let cardsfinished = 0;
let cardsRequested = 50;
let gameCardsObject = {//opens parenting object
  "results":[//opens array
    /*
    {//opens first object (unnamed) in array
      "memePicture":{//opens object within object within array
      "first":"curtis",
      "last":"ryan",
      }//closes object within object within array
    },//closes first object (unnamed) in array
    */

  ]//closes array
};//closes parenting object
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
  // seesaw(document.getElementById("name_entry"), 0.05);
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
        <p>Health</p>
        <div id="health_bar"><span id="health_left"><span id="health_remover"></span></span></div>
      <div id="outerbox_div">
        <div id="innerbox_div">
        </div>
      </div>
    </div>
    `;
  htmlBody.innerHTML = holderLargeDivisions;
  timerBeginCount();
  function createRandomizedBoxDivs(maxCards){
    let imagesNeeded = maxCards/2;
    let amountOfCards = 0;
    let amountOfImagesWhile = 0;
    let parentToAddTo = document.getElementById("innerbox_div");
    let arrayOfNumbersallowed1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    let arrayOfNumbers2 = [];
    while (amountOfImagesWhile < imagesNeeded){
        let randomGenIndexToTakeOutOfArray = Math.floor(Math.random()*arrayOfNumbersallowed1.length);
        let numberPickedInArray = arrayOfNumbersallowed1[randomGenIndexToTakeOutOfArray];
        gameCardsObject.results[amountOfImagesWhile] = new Object();
        gameCardsObject.results[amountOfImagesWhile].memePicture = "img/memepicture"+numberPickedInArray+".jpg";
        let secondImageIndex = amountOfImagesWhile+imagesNeeded;
        gameCardsObject.results[secondImageIndex] = new Object();
        gameCardsObject.results[secondImageIndex].memePicture = "img/memepicture"+numberPickedInArray+".jpg";
        arrayOfNumbersallowed1.splice(randomGenIndexToTakeOutOfArray,1);
        arrayOfNumbers2.push(amountOfImagesWhile, secondImageIndex);
      amountOfImagesWhile++;
    }
    while (amountOfCards < maxCards){
      let randomGenIndexToTakeOutOfArray = Math.floor(Math.random()*arrayOfNumbers2.length);
      let numberPickedInArray = arrayOfNumbers2[randomGenIndexToTakeOutOfArray];
      let newCard = document.createElement("div");
      newCard.setAttribute("onclick", "playerclick(this, "+numberPickedInArray+")");
      parentToAddTo.appendChild(newCard);
      arrayOfNumbers2.splice(randomGenIndexToTakeOutOfArray,1);
      amountOfCards++;
    }
  }
  createRandomizedBoxDivs(cardsRequested);
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
//BEGIN CLICK FUNCTION
let heartRemoved = 0;
let numberOfCardsFlipped = 0;
let cardLastClicked = 99;
let divLastClicked = "";
let lastDivClickedBackground = "";
function playerclick(divClicked, divNumber){
  console.log(divClicked.style.transform);
  if (numberOfCardsFlipped >= 2 || cardLastClicked === divNumber){
    return
  }
  cardLastClicked = divNumber;
  let flipped = document.getElementsByClassName("flipped");
  let lengthOfBoard = document.getElementById("innerbox_div").children.length;
  let imageBackground = gameCardsObject.results[divNumber].memePicture;
  // divClicked.setAttribute("style", "background-image: url("+imageBackground+");");
  divClicked.setAttribute("class", "flipped");
  let emptyString = "";
  divClicked.setAttribute("style", "background-image: url("+emptyString+");");
  let rotatedegre = -180;
  let rotateintervalfunction = setInterval(function(){
    // divClicked.style.transform = "rotateY("+rotatedegre+"deg)";
    if (rotatedegre == -90){
      divClicked.setAttribute("style", "background-image: url("+imageBackground+");");
    }
    if (rotatedegre === 0){
      clearInterval(rotateintervalfunction);
    } else {
      divClicked.style.transform = "rotateY("+rotatedegre+"deg)";
      rotatedegre++;
    }
  }, 2);
  numberOfCardsFlipped += 1;
  if (imageBackground === lastDivClickedBackground){
    correctAnimation(divLastClicked, lastDivClickedBackground, divClicked, imageBackground);
    flipped[0].classList.add("matched");
    flipped[0].setAttribute("onclick", "");
    flipped[0].classList.remove("flipped");
    flipped[0].classList.add("matched");
    flipped[0].setAttribute("onclick", "");
    flipped[0].classList.remove("flipped");
    setTimeout(function() {
      numberOfCardsFlipped = 0;
      cardLastClicked = 99;
      lastDivClickedBackground = "";
      divLastClicked = "";
    }, 1000);
    return
  }
  if (numberOfCardsFlipped >= 2){
    incorrectAnimation(divLastClicked, lastDivClickedBackground, divClicked, imageBackground);
    let healthRemover = document.getElementById("health_remover");
    console.log(healthRemover);
    heartRemoved += 3.125;
    healthRemover.style.width = heartRemoved+"%";
    setTimeout(function() {
      flipped[0].setAttribute("style", "");
      flipped[0].classList.remove("flipped");
      flipped[0].setAttribute("style", "");
      flipped[0].classList.remove("flipped");
      numberOfCardsFlipped = 0;
      cardLastClicked = 99;
      lastDivClickedBackground = "";
      divLastClicked = "";
    }, 2000);
  } else {
    lastDivClickedBackground = imageBackground;
    divLastClicked = divClicked;
  }
}
//END CLICK FUNCTION
//BEGIN MATCHING ANIMATIONS
function incorrectAnimation(item1, item1Background, item2, item2Background){
  item1.setAttribute("style", "background-image: url("+item1Background+"); height: 190px;  width: 190px; border: 5px solid #FF0000; transform: rotateY(0deg);");
  item2.setAttribute("style", "background-image: url("+item2Background+"); height: 190px;  width: 190px; border: 5px solid #FF0000; transform: rotateY(0deg);");
}
function correctAnimation(item1, item1Background, item2, item2Background){
  item1.setAttribute("style", "background-image: url("+item1Background+"); height: 190px;  width: 190px; border: 5px solid #00FF00; transform: rotateY(0deg);");
  item2.setAttribute("style", "background-image: url("+item2Background+"); height: 190px;  width: 190px; border: 5px solid #00FF00; transform: rotateY(0deg);");
  cardsfinished += 2;
  if (cardsfinished === cardsRequested){
    gameWin();
  }
}
//END MATCHING ANIMATIONS
//BEGIN END GAME
function gameWin(){

}
function gameLoss(){

}
//END END GAME
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
//BEGIN BOUNCE FUNCTIONS
/*
function seesaw(element, speed){
  let deg = 0;
  (function fade() {
    if ((element.style.transform = 'rotate('+deg+'deg)') >= 2) {
      deg += speed;
      requestAnimationFrame(fade);
    } else {
      deg += speed;
      requestAnimationFrame(fade);
    }
  })();
}*/
//END BOUNCE FUNCTIONS

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
