var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    $("#level-title").text("Level " + (++level));

    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    animatePress(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]){
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    else{
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 500);
        }
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

    $("#start").show();
    $("#start").text("Restart");
}

$(document).keydown(function(){
    if (!started){
        $("#start").hide();
        setTimeout(function() {
            started = true;
            nextSequence();
        }, 300);
    }
});

$("#start").click(function() {
    animatePress("start");
    $("#start").hide();
    started = true;
    nextSequence();
})