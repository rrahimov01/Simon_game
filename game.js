let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
let level = 0;

if (!started) {
  $(document).keydown(function () {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  });
}
//   checkAnswer(level)

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenNumber = buttonColours[randomNumber];
  gamePattern.push(randomChosenNumber);
  $("#" + randomChosenNumber)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenNumber);

  animatePress(randomChosenNumber);
}
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).on("click", function () {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press any key to Restart");
    console.log("wrong");
    startOver()
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
