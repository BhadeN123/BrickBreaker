let TargetScore = parseInt(localStorage.getItem("TargetScore"));
let currentScore = parseInt(localStorage.getItem("currentScore"));
let previousHighScore = parseInt(localStorage.getItem("previousHighScore"));
console.log(TargetScore);
console.log(currentScore);
console.log(previousHighScore);
if (TargetScore == currentScore) {
  ButtonText = "Level 2";

  if (previousHighScore < currentScore) {
    document.getElementById("msg").innerText =
      "Great Progress Higher score than Before.Keep it up!";
  }
  localStorage.setItem("previousHighScore", TargetScore);

  document.getElementById("currentScore").innerText =
    localStorage.getItem("currentScore");

  document.getElementById("restart").innerText = ButtonText;
} else if (TargetScore > currentScore) {
  console.log("hii");
  if (previousHighScore < currentScore) {
    console.log("hello");
    localStorage.setItem("previousHighScore", currentScore);
    document.getElementById("msg").innerText =
      "Well done! Even in defeat, you surpassed your previous score.Keep Pushing";
  }

  ButtonText = "Restart";

  document.getElementById(
    "HighScore"
  ).innerText = `HighScore: ${localStorage.getItem("previousHighScore")}`;

  document.getElementById("restart").innerText = ButtonText;
  document.getElementById(
    "currentScore"
  ).innerText = `Score: ${localStorage.getItem("currentScore")}`;
}

document.getElementById("restart").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5500/Component1/HTML/game.html";
});
