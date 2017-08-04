/*It helped me to build the markup that I wanted using only html and css,
and then program the JS to create an exact replica of my markup.*/
let scriptLoadingText = document.getElementById("script_load_text");
scriptLoadingText.style.display = 'none';
let htmlBody = document.querySelector("body");
let cardsfinished = 0;
let cardsRequested = 50; // default 50
let timeSelected = 300000; //default 300000
console.log(typeof timeSelected);
let healthSelected = 0; //default 300000
let timeSelectedCaluculated = "5 minutes and 0 seconds ";
let userName = "";
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
  textFocus.focus();
  textFocus.select();
}
//END NAME ENTRY
//BEGIN NAME CHECKER
let noNameTries = 0;
function checkName(){
  userName = document.getElementById("name_input_box").value;
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
  setTimeout(function() { createOptionsMenu(userName);}, 2000);
}

//END NAME CHECKER
//BEGIN OPTIONS MENU
function createOptionsMenu(){
    let holder = `
    <div id="pre_game_options_menu">
      <div id="pre_game_inner_options_menu">
        <h2>Select your options, ${userName}.</h2>
        <input type="range" id="cardSelection" step="2" min="40" max="70" value="50" onchange="updateCards(this.value)" oninput="updateCards(this.value)"></input><br>
        <p>Number of Cards: <span id="cardsInput">50</span></p>
        <input type="range" id="healthSelection" step="2" min="40" max="70" value="50" onchange="updateHealth(this.value)" oninput="updateHealth(this.value)"></input><br>
        <p>Health: <span id="healthInput">50</span></p>
        <input type="range" id="timeSelection" step="15000" min="180000" max="375000" value="300000" onchange="updateTime(this.value)" oninput="updateTime(this.value)"></input><br>
        <p>Time: <span id="timeInput">5 minutes and 0 seconds </span></p>
        <button id="nextFunctionButton" onclick="nextSection()">Select</button>
      </div>
    </div>
    `;
    // if (360000) {}
  htmlBody.innerHTML = holder;
  fadeIn(document.getElementById("pre_game_options_menu"), .01);
  // setTimeout(function() { (document.getElementById("nextFunctionButton")).setAttribute("onclick", "createPreGame()");}, 2000);
}
//BEGIN OPTIONS DETECTION
function updateCards(val) {
  document.getElementById('cardsInput').innerHTML=val;
  cardsRequested = document.getElementById("cardSelection").value;
}
function updateHealth(val) {
  document.getElementById('healthInput').innerHTML=val;
}
function updateTime(val) {
  timeSelected = parseInt(document.getElementById("timeSelection").value);
  console.log(typeof timeSelected);
  let minutes = Math.floor((timeSelected % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeSelected % (1000 * 60)) / 1000);
  timeSelectedCaluculated = minutes + " minutes and " + seconds + " seconds ";
  document.getElementById('timeInput').innerHTML=timeSelectedCaluculated;
}
//END OPTIONS DETECTION
function nextSection(){
  fadeOut(document.getElementById("pre_game_options_menu"), .01);
  setTimeout(function() { createPreGame(userName, timeSelectedCaluculated);}, 1500);
}
//END OPTIONS MENU

//BEGIN INTRO
function createPreGame(userName, time){
    let holder = `
    <div id="pre_game_body">
      <div id="pre_game_inner_body">
        <h2>Welcome ${userName}!</h2>
        <p>You have ${time} to match all of the memes. When you are ready, click anywhere to start!</p>
      </div>
    </div>
    `;
  htmlBody.innerHTML = holder;
  fadeIn(document.getElementById("pre_game_body"), .01);
  setTimeout(function() { (document.getElementById("pre_game_body")).setAttribute("onclick", "startCountDown()");}, 2000);
}
//END INTRO
//BEGIN COUNTDOWN TO START
function startCountDown(){
  console.log(cardsRequested);
  console.log(timeSelected);
  console.log(timeSelectedCaluculated);
  console.log(healthSelected);
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
  // createRandomizedBoxDivs(50);
}
//END CREATE GAME BOARD
//BEGIN CREATE TIMER AND COUNTDOWN
function timerBeginCount(){
let countDownDate = new Date().getTime();
countDownDate = countDownDate + timeSelected;
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
  console.log(divClicked);
  if (numberOfCardsFlipped >= 2 || cardLastClicked === divNumber){
    return
  }
  cardLastClicked = divNumber;
  let flipped = document.getElementsByClassName("flipped");
  let lengthOfBoard = document.getElementById("innerbox_div").children.length;
  let imageBackground = gameCardsObject.results[divNumber].memePicture;
  divClicked.setAttribute("class", "flipped");
  let emptyString = "";
  divClicked.setAttribute("style", "background-image: url("+emptyString+");");
  let rotatedegre = -180;
  function rotateImage(){
    console.log("function is in action");
    if (rotatedegre == -90){
      divClicked.setAttribute("style", "background-image: url("+imageBackground+");");
    } if (rotatedegre === 0){
      clearInterval(refreshId);
    } else {
      divClicked.style.transform = "rotateY("+rotatedegre+"deg)";
      rotatedegre++;
    }
  }
  var refreshId = setInterval(rotateImage, 2);
  numberOfCardsFlipped += 1;
  console.log(flipped[0].classList);
    if (imageBackground === lastDivClickedBackground){
      setTimeout(function() {correctAnimation(divLastClicked, lastDivClickedBackground, divClicked, imageBackground);}, 1000);
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
      }, 3000);
      return
    }
    if (numberOfCardsFlipped >= 2){
      let healthRemover = document.getElementById("health_remover");
      heartRemoved += 3.125;
      healthRemover.style.width = heartRemoved+"%";

      setTimeout(function() {  incorrectAnimation(divLastClicked, lastDivClickedBackground, divClicked, imageBackground); }, 1000);

      setTimeout(function() {
        flipped[0].setAttribute("style", "");
        flipped[0].classList.remove("flipped");
        flipped[0].setAttribute("style", "");
        flipped[0].classList.remove("flipped");
        numberOfCardsFlipped = 0;
        cardLastClicked = 99;
        lastDivClickedBackground = "";
        divLastClicked = "";
      }, 3000);
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
