
//Gababa gabdi 

var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Add onClick listener
$(".btn").on("click", function () {
  // Detect button and push it into the user array
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play the button
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // Animate Button
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, press any key to restar.");
    setTimeout(function () { $("body").removeClass("game-over") }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate Button
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function startOver() { 
  level = 0;
  gamePattern = [];
  started = false;
 }

