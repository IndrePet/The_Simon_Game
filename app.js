const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

// VARIABLES

const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// FUNCTIONS

const playSound = (name) => {
  let audio = new Audio(`./src/${name}.wav`);
  audio.play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function () {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
};

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $('#start>p').text(`Level ${level}`);
  let randomChosenColor = buttonColors[rand(0, 3)];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    $('#level-title').text('Game Over!');
    $('#start>p').text('Restart');
    $('.wrapper').addClass('game-over');
    $('#start').css('cursor', 'pointer');
    $('.btn').css('cursor', 'not-allowed');
    playSound('wrong');
    setTimeout(() => {
      $('.wrapper').removeClass('game-over');
    }, 200);
    startOver();
  }
};

const startGame = () => {
  if (!started) {
    $('#level-title').text('Game started!');
    $('#start:hover').css('cursor', 'not-allowed');
    $('.btn').css('cursor', 'pointer');
    $('.btn').removeClass('glitch');
    nextSequence();
    started = true;
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};

// CONTROLS

$('.btn').click(function () {
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$('#start').click(() => startGame());
