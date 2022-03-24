const rand = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const buttonColors = ['red', 'blue', 'green', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];

const playSound = (name) => {
  let audio = new Audio(`./src/${name}.wav`);
  return audio.play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function () {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
};

const nextSequence = () => {
  let randomChosenColor = buttonColors[rand(0, 3)];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).on('click', () => {
    $(`.${randomChosenColor}`).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    return randomChosenColor;
  });
};

$('.btn').click(function () {
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});
