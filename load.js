const counterEl = document.querySelector(".counter");

const barEl = document.querySelector(".loading-bar-front");

let idx = 0;

updateNum();

function updateNum() {
  counterEl.innerText = idx + "%";
  barEl.style.width = idx + "%";
  idx++;
  if (idx < 101) {
    setTimeout(updateNum, 20);
  }
}





/*const barEl = document.querySelector(".loading-bar-front");

const resetButton = document.querySelector(".reset-button");

let idx = 0;

updateNum();

function updateNum() {
  counterEl.innerText = idx + "%";
  barEl.style.width = idx + "%";
  idx++;
  if (idx < 101) {
    setTimeout(updateNum, 20);
  }
}

resetButton.addEventListener("click", () => {
  idx = 0;
  updateNum();
});*/