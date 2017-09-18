/* TODO
ADD ANIMATIONS WITH USER NAME
FIX HEALTH AND TIME TO TOP OF SCREEN
*/
var scriptLoadingText = document.getElementById("script_load_text");
scriptLoadingText.style.display = 'none';
var htmlBody = document.querySelector("body");
var htmlItself = document.querySelector("html");
var cardsfinished = 0;
var cardsRequested = 50; // default 50
var timeSelected = 300000; //default 300000
var healthSelected = 3.125; //default 3.125
var x = 0;
var timeSelectedCaluculated = "5 minutes and 0 seconds ";
var userName = "";
var heartRemoved = 0;
var finalTime = "";
var gameCardsObject = {//opens parenting object
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
//BEGIN POST FETCH
function firefetch(dataobj){
  let string = JSON.stringify(dataobj);
  fetch("https://memorygameapi.herokuapp.com/stats/"+string, {
    method: "POST",
    body: dataobj,
  }).then(response => {
    console.log(response);
  }).catch(err => {
    console.log(err);
  });
}
//END POST FETCH
//BEGIN FETCH STATS
function pullstats(callback){
  fetch('https://memorygameapi.herokuapp.com/stats').then(results => {
      return results.json();
    }).then(data => {
      callback(data);
      return data
    })
}
//END FETCH STATS
createHeader();
function createHeader(){
  var setHeader = document.querySelector("head");
  var holder = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Roboto|Shrikhand" rel="stylesheet">
  <link href="style.css" type="text/css" rel="stylesheet">
  <title>The Annoying Memory Game</title>
  `;
    setHeader.innerHTML = holder;
}
askForName();
//STATS
function showstats(){
  var statsbody = document.querySelector(".statsdiv");
  if (document.querySelector(".statisticsholderactive")){
    var holder = `
    <div class="statsdiv">
      <button onclick="showstats()">Stats</button>
    </div>
    `;
    statsbody.innerHTML = holder;
    return
  } else {
    pullstats(function(x){
      var holder = `
      <div class="statsdiv">
        <button onclick="showstats()">Stats</button>
      </div>
      <div class="statisticsholderactive">
      </div>
      `;
      statsbody.innerHTML = holder;
      var statsholder = document.querySelector(".statisticsholderactive");
      x.map((players)=>{
        var playerdiv = document.createElement('div');
        var holder = `
        <p>Player: ${players.player}</p>
        <p>Cards: ${players.cards}</p>
        <p>Game Status: ${players.status}</p>
        <p>Time: ${players.time}</p>
        <p>Health: ${players.health}</p>
        `;
        playerdiv.innerHTML = holder;
        statsholder.appendChild(playerdiv);
      })
    });
  }
}
//STATS
//BEGIN NAME ENTRY
function askForName(){
    var holder = `
    <div onselectstart="return false" id="name_entry" onclick="checkName()">
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
    <div class="statsdiv">
      <button onclick="showstats()">Stats</button>
    </div>
    `;
  htmlBody.innerHTML = holder;
  var textFocus = document.getElementById("name_input_box");
  textFocus.focus();
  textFocus.select();
}
//END NAME ENTRY
//BEGIN NAME CHECKER
var noNameTries = 0;
function checkName(){
  userName = document.getElementById("name_input_box").value;
  var textFocus = document.getElementById("name_plate_announcement");
  var arrayOfText = ["Oh come on.... at least *try* to put a name in!", "Could ya please put your name in?", "Pretty pleeeeease??", "Okay, Fine!"]
  if (userName === "" && noNameTries <= 3){
    textFocus.innerHTML = arrayOfText[noNameTries];
    noNameTries = noNameTries + 1;
    var reAdd = document.getElementById("name_input_box");
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
    var holder = `
    <div onselectstart="return false" id="pre_game_options_menu">
      <div id="pre_game_inner_options_menu">
        <h2>Select your options, ${userName}.</h2>
        <input type="range" id="cardSelection" step="2" min="40" max="70" value="50" onchange="updateCards(this.value)" oninput="updateCards(this.value)"></input><br>
        <p>Number of Cards: <span id="cardsInput">50</span></p>
        <input type="range" id="healthSelection" step="1" min="10" max="71" value="32" onchange="updateHealth(this.value)" oninput="updateHealth(this.value)"></input><br>
        <p>Health(number of mismatches allowed): <span id="healthInput">32</span></p>
        <input type="range" id="timeSelection" step="15000" min="180000" max="375000" value="300000" onchange="updateTime(this.value)" oninput="updateTime(this.value)"></input><br>
        <p>Time: <span id="timeInput">5 minutes and 0 seconds </span></p>
        <button id="nextFunctionButton" onclick="nextSection()">Begin Game!</button>
      </div>
    </div>
    <div class="statsdiv">
      <button onclick="showstats()">Stats</button>
    </div>
    `;
  htmlBody.innerHTML = holder;
  fadeIn(document.getElementById("pre_game_options_menu"), .01);
}
//BEGIN OPTIONS DETECTION
function updateCards(val) {
  document.getElementById('cardsInput').innerHTML=val;
  cardsRequested = document.getElementById("cardSelection").value;
}
function updateHealth(val) {
  if (val > 70) {
    healthSelected = 0;
    document.getElementById('healthInput').innerHTML="Unlimited";
  } else {
    document.getElementById('healthInput').innerHTML=val;
    healthValuetoNumber = parseInt(val);
    healthSelected = 100/healthValuetoNumber;
  }
}
function updateTime(val) {
  if (val > 360000) {
    timeSelected = 0;
    timeSelectedCaluculated = "Unlimited";
    document.getElementById('timeInput').innerHTML=timeSelectedCaluculated;
  } else {
    timeSelected = parseInt(document.getElementById("timeSelection").value);
    var minutes = Math.floor((timeSelected % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeSelected % (1000 * 60)) / 1000);
    timeSelectedCaluculated = minutes + " minutes and " + seconds + " seconds ";
    document.getElementById('timeInput').innerHTML=timeSelectedCaluculated;
  }
}
//END OPTIONS DETECTION
function nextSection(){
  (document.getElementById("nextFunctionButton")).setAttribute("onclick", " ");
  fadeOut(document.getElementById("pre_game_options_menu"), .01);
  setTimeout(function() { createPreGame(userName, timeSelectedCaluculated);}, 1500);
}
//END OPTIONS MENU
//BEGIN INTRO
function createPreGame(userName, time){
    var holder = `
    <div onselectstart="return false" id="pre_game_body">
      <div id="pre_game_inner_body">
        <h2>Welcome ${userName}!</h2>
        <p>You have ${time} to match all of the memes. When you are ready, click anywhere to start!</p>
      </div>
    </div>
    <div class="statsdiv">
      <button onclick="showstats()">Stats</button>
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
    var holder = `
    <div onselectstart="return false" id="count_down_timer">
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
var holderLargeDivisions = `
    <div onselectstart="return false" id="game_body">
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
    var imagesNeeded = maxCards/2;
    var amountOfCards = 0;
    var amountOfImagesWhile = 0;
    var parentToAddTo = document.getElementById("innerbox_div");
    var arrayOfNumbersallowed1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    var arrayOfNumbers2 = [];
    while (amountOfImagesWhile < imagesNeeded){
        var randomGenIndexToTakeOutOfArray = Math.floor(Math.random()*arrayOfNumbersallowed1.length);
        var numberPickedInArray = arrayOfNumbersallowed1[randomGenIndexToTakeOutOfArray];
        gameCardsObject.results[amountOfImagesWhile] = new Object();
        gameCardsObject.results[amountOfImagesWhile].memePicture = "img/memepicture"+numberPickedInArray+".jpg";
        var secondImageIndex = amountOfImagesWhile+imagesNeeded;
        gameCardsObject.results[secondImageIndex] = new Object();
        gameCardsObject.results[secondImageIndex].memePicture = "img/memepicture"+numberPickedInArray+".jpg";
        arrayOfNumbersallowed1.splice(randomGenIndexToTakeOutOfArray,1);
        arrayOfNumbers2.push(amountOfImagesWhile, secondImageIndex);
      amountOfImagesWhile++;
    }
    while (amountOfCards < maxCards){
      var randomGenIndexToTakeOutOfArray = Math.floor(Math.random()*arrayOfNumbers2.length);
      var numberPickedInArray = arrayOfNumbers2[randomGenIndexToTakeOutOfArray];
      var newCard = document.createElement("div");
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
var timeTaken = 0;
var countDownDate = new Date().getTime();
countDownDate = countDownDate + timeSelected;
  x = setInterval(function() {
    timeTaken += 1000;
    var mins = Math.floor((timeTaken % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((timeTaken % (1000 * 60)) / 1000);
    finalTime = mins + "m " + secs + "s ";
    var now = new Date().getTime();
    var distance = countDownDate - now;
    if (timeSelected > 0){
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("clockdiv").innerHTML = minutes + "m " + seconds + "s ";
    }
    if (distance < 0) {
      gameLoss("You ran out of time!");
      clearInterval(x);
      document.getElementById("clockdiv").innerHTML = "EXPIRED";
    }
  }, 1000);
};
//END CREATE TIMER AND COUNTDOWN
//BEGIN CLICK FUNCTION
//CHANGE NUMBER OF CARDS FLIPPED TO .length of FLIPPED GROUP
var numberOfCardsFlipped = 0;
var cardLastClicked = 99;
var divLastClicked = "";
var lastDivClickedBackground = "";
var flippedGroup = [];
function playerclick(divClicked, divNumber){
  if (numberOfCardsFlipped >= 2 || cardLastClicked === divNumber){
    return
  }
  cardLastClicked = divNumber;
  var lengthOfBoard = document.getElementById("innerbox_div").children.length;
  var imageBackground = gameCardsObject.results[divNumber].memePicture;
  flippedGroup.push(divClicked);
  var emptyString = "";
  divClicked.setAttribute("style", "background-image: url("+emptyString+");");
  var rotatedegre = -180;
  function rotateImage(){
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
    if (imageBackground === lastDivClickedBackground){
      setTimeout(function() {correctAnimation(divLastClicked, lastDivClickedBackground, divClicked, imageBackground);}, 1000);
      flippedGroup[0].setAttribute("onclick", "");
      flippedGroup[1].setAttribute("onclick", "");
      setTimeout(function() {
        numberOfCardsFlipped = 0;
        cardLastClicked = 99;
        lastDivClickedBackground = "";
        divLastClicked = "";
        flippedGroup = [];
      }, 3000);
      return
    }
    if (numberOfCardsFlipped >= 2){
      var healthRemover = document.getElementById("health_remover");
      heartRemoved += healthSelected;
      healthRemover.style.width = heartRemoved+"%";
      if (heartRemoved > 99){
        gameLoss("You ran out of health!");
      } else {
        setTimeout(function() {  incorrectAnimation(divLastClicked, lastDivClickedBackground, divClicked, imageBackground); }, 1000);
        setTimeout(function() {
          flippedGroup[0].setAttribute("style", "");
          flippedGroup[1].setAttribute("style", "");
          numberOfCardsFlipped = 0;
          cardLastClicked = 99;
          lastDivClickedBackground = "";
          divLastClicked = "";
          flippedGroup = [];
        }, 3000);
      }
    } else {
      lastDivClickedBackground = imageBackground;
      divLastClicked = divClicked;
    }
}
//END CLICK FUNCTION
//BEGIN MATCHING ANIMATIONS
function incorrectAnimation(item1, item1Background, item2, item2Background){
  item1.setAttribute("style", "background-image: url("+item1Background+"); height: "+(item1.clientHeight-7)+"px; width: "+(item1.clientWidth-7)+"px; border: 5px solid #FF0000; transform: rotateY(0deg);");
  item2.setAttribute("style", "background-image: url("+item2Background+"); height: "+(item2.clientHeight-7)+"px; width: "+(item2.clientWidth-7)+"px; border: 5px solid #FF0000; transform: rotateY(0deg);");
}
function correctAnimation(item1, item1Background, item2, item2Background){
  item1.setAttribute("style", "background-image: url("+item1Background+"); height: "+(item1.clientHeight-7)+"px; width: "+(item1.clientWidth-7)+"px; border: 5px solid #00FF00; transform: rotateY(0deg);");
  item2.setAttribute("style", "background-image: url("+item2Background+"); height: "+(item2.clientHeight-7)+"px; width: "+(item2.clientWidth-7)+"px; border: 5px solid #00FF00; transform: rotateY(0deg);");
  cardsfinished += 2;
  if (cardsfinished === cardsRequested){
    gameWin();
  }
}
//END MATCHING ANIMATIONS
//BEGIN END GAME
function gameWin(){
  var percentageofhealthleft = Math.round(100 - heartRemoved);
  var nodes = document.getElementById('innerbox_div').childNodes;
  for(var i=1; i<nodes.length; i++) {
    nodes[i].classList.add('winning_div_actions');
  }
  var holder = `
  <div onselectstart="return false" id="victory_page">
    <div id="victory_page_inner_body">
      <h1>Congrats, ${userName}!</h1>
      <h2>You have won the game!<h2>
      <p>You matched all ${cardsRequested} cards in ${finalTime} with ${percentageofhealthleft}% health remaining!<p>
      <a id="name_input_box" href="https://jtcanfield.github.io/memory-game/">Click here to play again!</a>
    </div>
  </div>
  <div class="statsdiv">
    <button onclick="showstats()">Stats</button>
  </div>
  `;
  let jsondata = {
    player: userName,
    cards: cardsRequested,
    time: finalTime,
    health: percentageofhealthleft,
    status: "Win"
  }
  firefetch(jsondata);
  clearInterval(x);
  setTimeout(function() {  htmlItself.setAttribute("id", "party_gif"); htmlBody.innerHTML = holder; }, 5000);
}
function gameLoss(reasonCode){
  var percentageofhealthleft = Math.round(100 - heartRemoved);
  var nodes = document.getElementById('innerbox_div').childNodes;
  for(var k=1; k<nodes.length; k++) {
    nodes[k].classList.add('losing_div_actions');
  }
  var holder = `
  <div onselectstart="return false" id="loss_page">
    <div id="victory_page_inner_body">
      <h1>You lost, ${userName}.</h1>
      <h2>${reasonCode}<h2>
      <p>You matched ${cardsfinished} cards in ${finalTime} with ${percentageofhealthleft}% health remaining.<p>
      <a id="name_input_box" href="https://jtcanfield.github.io/memory-game/">Click here to play again!</a>
    </div>
  </div>
  <div class="statsdiv">
    <button onclick="showstats()">Stats</button>
  </div>
  `;
  let jsondata = {
    player: userName,
    cards: cardsRequested,
    time: finalTime,
    health: percentageofhealthleft,
    status: "Loss"
  }
  firefetch(jsondata);
  clearInterval(x);
  setTimeout(function() {  htmlItself.setAttribute("id", "loss_gif"); htmlBody.innerHTML = holder; }, 5000);
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
