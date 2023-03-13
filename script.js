var slider = document.getElementById("myRange");
var secondInput = document.getElementById("numberInput");
var text = document.getElementById("paragraph");
var circle = document.querySelector(".circle");
var button = document.getElementById("button");
var secondButton = document.getElementById("secondButton");
var beat = new Audio('Finish_Sound.wav')
const NUM = 360 / 100;
var rangeEnabled = true;
var interval;


secondInput.oninput = function() {
  if (secondInput.value > 0) {
    secondInput.style.fontSize = '25px'
  } else {
    secondInput.style.fontSize = '10px'
  }
  if (rangeEnabled == true) {
  if (secondInput.value > 0) {
    slider.value = secondInput.value
    let minutes = Math.floor(slider.value / 60);
    let seconds = slider.value % 60;
    let percentage = Math.floor((slider.value / 3600) * 100);
    let degrees = Math.floor(percentage * NUM ) + (Math.floor(percentage * NUM ) / 100);

    circle.style.background = `conic-gradient(rgb(107, 227, 240) ${degrees}deg, white 0deg)`;

    if (seconds < 10) {
      text.innerHTML = `${minutes}:0${seconds}`;
    } else {
      text.innerHTML = `${minutes}:${seconds}`;
    }

  } else {
    slider.value = 0
    let minutes = Math.floor(slider.value / 60);
    let seconds = slider.value % 60;
    let percentage = Math.floor((slider.value / 3600) * 100);
    let degrees = Math.floor(percentage * NUM ) + (Math.floor(percentage * NUM ) / 100);

    circle.style.background = `conic-gradient(rgb(107, 227, 240) ${degrees}deg, white 0deg)`;

    if (seconds < 10) {
      text.innerHTML = `${minutes}:0${seconds}`;
    } else {
      text.innerHTML = `${minutes}:${seconds}`;
    }
  }
  if (secondInput.value > 3600) {
    secondInput.value = 3600
  }
  if (secondInput.value < 0) {
    secondInput.value = 0
  }
} else {
  secondInput.value = ""
}
}

slider.oninput = function () {
  if (rangeEnabled == true) {


      slider.value = Math.round(slider.value * 0.02) * 60
    let minutes = Math.floor(slider.value / 60);
    let seconds = slider.value % 60;
    let percentage = Math.floor((slider.value / 3600) * 100);
    let degrees = Math.floor(percentage * NUM ) + (Math.floor(percentage * NUM ) / 100);
    secondInput.value = slider.value
    if (secondInput.value > 1) {
      secondInput.style.fontSize = '25px'
    } else {
      secondInput.style.fontSize = '10px'
    }

    circle.style.background = `conic-gradient(rgb(107, 227, 240) ${degrees}deg, white 0deg)`;
    console.log(slider.value);
    

    if (seconds < 10) {
      text.innerHTML = `${minutes}:0${seconds}`;
    } else {
      text.innerHTML = `${minutes}:${seconds}`;
    }
  }
};

button.onclick = function () {
  if (slider.value > 0) {
    if (rangeEnabled == true) {
      button.setAttribute("class", "btn_disabled");
      interval = setInterval(timer, 1000);
      this.innerHTML = "stop";
      secondInput.setAttribute('readonly', 'true')
      rangeEnabled = false;
      slider.disabled = true;
    } else if (rangeEnabled == false) {
      button.setAttribute("class", "btn");
      clearInterval(interval);
      this.innerHTML = "start";
      rangeEnabled = true;
      secondInput.value = slider.value
      secondInput.removeAttribute('readonly')
      slider.disabled = false;
      if (secondInput.value > 0) {
        secondInput.style.fontSize = '25px'
      } else {
        secondInput.style.fontSize = '10px'
      }
    }
  } else if (slider.value == 0) {
    if (rangeEnabled == false) {
      if (secondInput.value > 0) {
        secondInput.style.fontSize = '25px'
      } else {
        secondInput.style.fontSize = '10px'
      }
      button.setAttribute("class", "btn");
      clearInterval(interval);
      this.innerHTML = "start";
      rangeEnabled = true;
      secondInput.value = slider.value
      secondInput.removeAttribute('readonly')
      slider.disabled = false;
    }
  }
};

function timer() {
  if (slider.value > 0) {
    slider.value -= 1;

    let minutes = Math.floor(slider.value / 60);
    let seconds = slider.value % 60;
    let percentage = Math.floor((slider.value / 3600) * 100);
    let degrees = Math.floor(percentage * NUM ) + (Math.floor(percentage * NUM ) / 100);

    secondInput.value = slider.value

    circle.style.background = `conic-gradient(rgb(107, 227, 240) ${degrees}deg, white 0deg)`;
    if (seconds < 10) {
      text.innerHTML = `${minutes}:0${seconds}`;
    } else {
      text.innerHTML = `${minutes}:${seconds}`;
    }
  } else if (slider.value == 0) {
    let minutes = Math.floor(slider.value / 60);
  let seconds = slider.value % 60;
  let percentage = Math.floor((slider.value / 3600) * 100);
  let degrees = Math.floor(percentage * NUM);
  beat.play()
  setTimeout(() => {beat.pause(); beat.currentTime = 0;},
  4000)
  rangeEnabled = true;
  slider.disabled = false;
  button.innerHTML = "start";
  button.setAttribute("class", "btn");
  circle.style.background = `conic-gradient(rgb(107, 227, 240) ${degrees}deg, white 0deg)`;
  text.innerHTML = `${minutes}:0${seconds}`;
  clearInterval(interval);
  }
}

secondButton.onclick = function () {
  if (slider.value > 0 && rangeEnabled == false) {
    beat.play()
    setTimeout(() => {beat.pause(); beat.currentTime = 0;},
    4000)
  }
  slider.value = 0;
  secondInput.removeAttribute('readonly')
  let minutes = Math.floor(slider.value / 60);
  let seconds = slider.value % 60;
  secondInput.value = slider.value
  let percentage = Math.floor((slider.value / 3600) * 100);
  let degrees = Math.floor(percentage * NUM);

  rangeEnabled = true;
  slider.disabled = false;
  button.innerHTML = "start";
  button.setAttribute("class", "btn");
  circle.style.background = `conic-gradient(rgb(107, 227, 240) ${degrees}deg, white 0deg)`;
  text.innerHTML = `${minutes}:0${seconds}`;
  clearInterval(interval);
};

