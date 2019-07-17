var gamePattern = [];
var userClickedPattern = [];
var switch1 = true;
var switch2 = true;
var mainswitch = false;
var lvl = 0;
var clickCount = 0;

function nextSequence(){
  if(switch2 === false){
    for(var i = 0; i<lvl; i++){
      userClickedPattern.pop();
    }
  }
  var randomNumber = Math.floor((Math.random() * 4));
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).animate({opacity: "0.2"}, 100).animate({opacity: "1.0"}, 100);
  playsound(randomChosenColour);
  $("h1").text("Level "+ ++lvl);
  clickCount = 0;

  console.log("gra: "+gamePattern);
}

////////////// pierwszy anykey, dziala raz ////////////////////////////////

  $(document).keypress(function(event){
    if (switch1 === true){
        nextSequence();
        switch1 = false;
      }
  });

// dodatkowa funkcja, klikanie w przycisk jako anykey - dla telefonow //

$(".start").click(function() {
  if (switch1 === true ){
      animatePress("start");
      nextSequence();
      switch1 = false;
    }
});

//////////////////////// wytwarzanie dzwieku /////////////////////////////

  function playsound(name){
    var sounds = new Audio('sounds/front-end6/'+name+'.mp3');
    sounds.play();
  }

// klikanie w przycisk myszka //

  $(".btn").click(function() {
    clickCount++;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playsound(userChosenColour);
        console.log("uzytkownik: "+userClickedPattern);
    checkAnswer(lvl);
  });

//////////////////// animacja wcisniecia przycisku ////////////////////////

  function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
      $("#"+currentColour).removeClass("pressed");
    }, 100);
  }

// glowna funkcja sprawdzajaca - praktycznie gra //

  function checkAnswer(currentlevel){
    for(var i = 0; i < clickCount; i++)
    {
      if(gamePattern[i] === userClickedPattern[i])
      {
        mainswitch = false;
      }
      else
      {
        mainswitch = true;
        break;
      }
    }

    if(mainswitch === false && userClickedPattern.length === currentlevel)
    {
      setTimeout(function(){
          switch2 = false;
          nextSequence();
      }, 1000);
    }
    else if(mainswitch === true)
    {
      gameOver();
    }
  }

// game over i zerowanie //

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);

  if(switch1 === true)
  {
    $("h1").text("First, press any key! Points: "+ lvl);
  }
  else
  {
    $("h1").text("Game over! Points: "+ --lvl);
  }
  gamePattern = [];
  userClickedPattern = [];
  switch1 = true;
  switch2 = true;
  mainswitch = false;
  lvl = 0;
  clickCount = 0;
  playsound("wrong");

}
