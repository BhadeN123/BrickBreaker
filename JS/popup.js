const Looseliveaudio = new Audio("../CSS/audio/wingame.mp3");
function popup(msg) {
  document.getElementById("gameovertext").innerHTML = msg;
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  document.body.style.overflow = "hidden";
  document.getElementById("closePopup").addEventListener("click", () => {
    popup.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling again
    Looseliveaudio.pause();
    window.location.href =
      "Endscreen.html";
  });
}
function Scorepopup(c, text, x, y, flag, b) {
  const canvasRect = c.getBoundingClientRect();

  const gainscore = document.createElement("div");
  gainscore.className = "gainscore";
  if (!flag) gainscore.textContent = `+${text}`;
  else gainscore.textContent = `-${text}`;
  document.body.appendChild(gainscore);
  gainscore.style.top = canvasRect.top + window.innerHeight / 2 + "px";
  gainscore.style.left = canvasRect.left + window.innerWidth / 2 + "px";

  let animation = anime({
    targets: ".gainscore",
    translateY: "-200px",
    opacity: 0,
    duration: 2000,
    easing: "linear",
    complete: function (anim) {
      setTimeout(() => {
        document.querySelector(".gainscore").style.display = "None";
        document.body.removeChild(gainscore);
      }, 1000);
    },
  });
}
export { popup, Scorepopup };
